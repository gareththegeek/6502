import { TStateMachine } from '../typings'
import IState from '../state/istate'
import IBus from '../../bus/ibus'
import { B_NMI } from '../state/bflags'
import interrupt from './interrupt'
import { NMI_VECTOR } from '../state/vectors'

export default (bus: IBus): TStateMachine => (state: IState): IState =>
    interrupt(state, bus, NMI_VECTOR, B_NMI)
