import IStore from './istore'

export default <T>(store: IStore<T>, pure: (state: T) => T): (() => void) => () => {
    store.state = pure(store.state)
}
