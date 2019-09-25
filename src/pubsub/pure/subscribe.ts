import IState from '../state/istate'
import addElement from '../../immutability/addElement'

export default (): ((state: IState, messageType: string, handler: (message: any) => any) => IState) => (
    state: IState,
    messageType: string,
    handler: (message: any) => any
) => {
    const newSubscriptionList = state.subscriptions[messageType]
        ? addElement(state.subscriptions[messageType], handler)
        : [handler]

    return {
        subscriptions: {
            ...state.subscriptions,
            [messageType]: newSubscriptionList
        }
    }
}
