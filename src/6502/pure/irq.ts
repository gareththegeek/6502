import { TStateMachine } from '../typings'
import IState from '../state/istate'
import interrupt from './interrupt'
import { B_IRQ } from '../state/bflags'
import IBus from '../../bus/ibus'
import { IRQ_VECTOR } from '../state/vectors'

export default (bus: IBus): TStateMachine => (state: IState): IState =>
    state.status.irqDisable ? { ...state } : interrupt(state, bus, IRQ_VECTOR, B_IRQ)
