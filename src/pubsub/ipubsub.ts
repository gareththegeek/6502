/*eslint @typescript-eslint/no-explicit-any: "off"*/
import { TMessageHandler } from './state/tmessagehandler'

export default interface IPubSub {
    subscribe: (messageType: string, handler: TMessageHandler) => void
    publish: <T>(messageType: string, message: any) => Array<T>
}
