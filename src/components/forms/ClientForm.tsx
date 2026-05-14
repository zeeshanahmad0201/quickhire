import { Controller, FormProvider, useForm } from 'react-hook-form'

import { Button, Error, Input, PersonalInfoFields, Screen, Spacer } from '@/components'
import { ClientProfileForm } from '@/types'
import { spacing } from '@/constants'
import { formRules } from '@/utils'

type ClientFormProps = {
    initialValues: Partial<ClientProfileForm>
    onSubmit: (data: ClientProfileForm) => void
    isLoading?: boolean
}

export const ClientForm = ({ initialValues, onSubmit, isLoading }: ClientFormProps) => {
    const methods = useForm<ClientProfileForm>({ defaultValues: initialValues })
    const {
        formState: { errors, isValid },
        control,
        handleSubmit,
    } = methods

    return (
        <FormProvider {...methods}>
            <Screen main>
                <PersonalInfoFields initialValues={initialValues} />

                <Spacer height={spacing.md} />

                <Controller
                    control={control}
                    name="companyName"
                    rules={formRules.companyName}
                    render={({ field: { onChange, value } }) => (
                        <>
                            <Input
                                preset="companyName"
                                onChangeText={onChange}
                                value={value}
                                returnKeyType="done"
                            />
                            {errors.companyName && <Error title={errors.companyName.message} />}
                        </>
                    )}
                />

                <Spacer height={spacing.md} />

                <Button
                    title="Save"
                    loading={isLoading}
                    disabled={!isValid || isLoading}
                    onPress={handleSubmit(onSubmit)}
                />
            </Screen>
        </FormProvider>
    )
}
