/*eslint @typescript-eslint/no-explicit-any: "off"*/
import IStore from './istore'
import connectPure from './connectPure'

export default <T>(target: { [key: string]: any }, store: IStore<T>): { [key: string]: any } => {
    const result: { [key: string]: any } = {}
    Object.keys(target).map(
        key => (result[key] = typeof target[key] === 'function' ? connectPure(store, target[key]) : target[key])
    )
    result.store = store
    return result
}
