import IState from '../state/istate'

export default (): ((state: IState, messageType: string, message: any) => any) => (
    state: IState,
    messageType: string,
    message: any
): any => {
    return (
        state.subscriptions[messageType] &&
        state.subscriptions[messageType]
            .map(subscription => subscription(message))
            .reduce((previous, current) => previous || current)
    )
}
