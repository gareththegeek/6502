import IStore from './istore'
import curry from './curry'

export default <T>(store: IStore<T>, pure: any): any => {
    return (...args: any[]) => {
        store.state = curry(pure, store.state)(args)
    }
}
