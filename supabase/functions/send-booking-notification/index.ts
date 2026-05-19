import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send'

interface BookingRow {
    id: string
    service_id: string
    client_id: string
    provider_id: string
    status: string
    scheduled_at: string
    notes: string | null
    created_at: string
}

interface WebhookPayload {
    type: 'INSERT' | 'UPDATE' | 'DELETE'
    table: string
    record: BookingRow
    schema: string
    old_record: BookingRow | null
}

interface ExpoTicket {
    status: 'ok' | 'error'
    id?: string
    message?: string
    details?: { error?: string }
}

Deno.serve(async (req) => {
    try {
        const payload: WebhookPayload = await req.json()

        if (payload.type !== 'INSERT' || payload.table !== 'bookings') {
            return new Response('Ignored', { status: 200 })
        }

        const supabase = createClient(
            Deno.env.get('SUPABASE_URL')!,
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
        )

        const booking = payload.record

        const [tokensRes, clientRes, serviceRes] = await Promise.all([
            supabase.from('device_tokens').select('token').eq('user_id', booking.provider_id),
            supabase.from('users').select('name').eq('id', booking.client_id).single(),
            supabase.from('services').select('title').eq('id', booking.service_id).single(),
        ])

        if (tokensRes.error) throw tokensRes.error
        const tokens = tokensRes.data ?? []

        if (tokens.length === 0) {
            return new Response('No device tokens for provider', { status: 200 })
        }

        const clientName = clientRes.data?.name ?? 'A client'
        const serviceTitle = serviceRes.data?.title ?? 'your service'

        const messages = tokens.map(({ token }) => ({
            to: token,
            title: 'New booking',
            body: `${clientName} booked ${serviceTitle}`,
            data: { bookingId: booking.id, type: 'booking_created' },
            sound: 'default',
        }))

        const expoRes = await fetch(EXPO_PUSH_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify(messages),
        })

        const { data: tickets } = (await expoRes.json()) as { data: ExpoTicket[] }

        // Janitor: delete tokens Expo reports as dead
        const staleTokens: string[] = []
        tickets.forEach((ticket, i) => {
            if (ticket.status === 'error' && ticket.details?.error === 'DeviceNotRegistered') {
                staleTokens.push(tokens[i].token)
            }
        })

        if (staleTokens.length > 0) {
            await supabase.from('device_tokens').delete().in('token', staleTokens)
        }

        return new Response(JSON.stringify({ sent: tickets.length, removed: staleTokens.length }), {
            headers: { 'Content-Type': 'application/json' },
        })
    } catch (error) {
        console.error('send-booking-notification error:', error)
        return new Response(String(error), { status: 500 })
    }
})
