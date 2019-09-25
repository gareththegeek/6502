export default interface IPubSub {
    subscribe: (messageType: string, handler: (message: any) => any) => void
    publish: (messageType: string, message: any) => any
}
