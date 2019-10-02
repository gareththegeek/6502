import IState from '../state/istate'
import addElement from '../../immutability/addElement'
import { TMessageHandler } from '../state/tmessagehandler'

export default (): ((state: IState, messageType: string, handler: TMessageHandler) => IState) => (
    state: IState,
    messageType: string,
    handler: TMessageHandler
): IState => {
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
