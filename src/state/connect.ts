import IStore from './istore'
import connectPure from './connectPure'

export default <T>(target: { [key: string]: any }, store: IStore<T>): { [key: string]: any } => {
    const result: { [key: string]: any } = {}
    Object.keys(target).map(key => (result[key] = connectPure(store, target[key])))
    return result
}
