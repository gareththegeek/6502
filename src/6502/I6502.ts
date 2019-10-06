import IState from './state/istate'
import IStore from '../state/istore'

export default interface I6502 {
    store: IStore<IState>
    reset: () => void
    clock: () => void
    irq: () => void
    nmi: () => void
}
