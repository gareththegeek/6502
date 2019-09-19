import IStore from '../6502/store/istore'
import IState from '../6502/store/istate'

export default (store: IStore, pure: (state: IState) => IState): (() => void) => () => {
    store.state = pure(store.state)
}
