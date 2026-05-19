jest.mock('react-native-toast-message', () => ({
    __esModule: true,
    default: { show: jest.fn(), hide: jest.fn() },
    show: jest.fn(),
    hide: jest.fn(),
}))

jest.mock('expo-constants', () => ({
    __esModule: true,
    default: { expoConfig: { extra: { eas: { projectId: 'test-project-id' } } } },
    expoConfig: { extra: { eas: { projectId: 'test-project-id' } } },
}))

jest.mock('expo-notifications', () => ({
    setNotificationHandler: jest.fn(),
    addPushTokenListener: jest.fn(() => ({ remove: jest.fn() })),
    addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
    setNotificationChannelAsync: jest.fn(),
    getPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
    requestPermissionsAsync: jest.fn(async () => ({ status: 'granted' })),
    getExpoPushTokenAsync: jest.fn(async () => ({ data: 'ExponentPushToken[test]' })),
    AndroidImportance: { MAX: 5 },
}))
