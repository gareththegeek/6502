import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import { B_BRK } from '../../state/bflags'
import { BRK_VECTOR } from '../../state/vectors'
import { TInterrupt } from '../../typings'

export default (interrupt: TInterrupt) => (state: IState, bus: IBus, _: number): IState =>
    interrupt(state, bus, BRK_VECTOR, B_BRK)
