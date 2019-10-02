/*eslint @typescript-eslint/no-explicit-any: "off"*/
import IState from '../state/istate'

export default (): (<T>(state: IState, messageType: string, message: any) => Array<T>) => <T>(
    state: IState,
    messageType: string,
    message: any
): Array<T> =>
    state.subscriptions[messageType] && state.subscriptions[messageType].map(subscription => subscription(message))
