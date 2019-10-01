export default interface IPubSub {
    subscribe: (messageType: string, handler: (message: any) => any) => void
    publish: <T>(messageType: string, message: any) => Array<T>
}
