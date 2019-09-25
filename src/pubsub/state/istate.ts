export default interface IState {
    subscriptions: { [messageType: string]: Array<(message: any) => any> }
}
