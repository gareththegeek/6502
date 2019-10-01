import IStore from './istore'
import curry from './curry'

export default <T>(store: IStore<T>, pure: any): ((...args: any) => T) => {
    return (...args: any): T => {
        store.state = curry(pure, store.state)(...args)
        console.log(store.state)
        return store.state
    }
}
