import { TMessageHandler } from './tmessagehandler'

export default interface IState {
    subscriptions: { [messageType: string]: Array<TMessageHandler> }
}
