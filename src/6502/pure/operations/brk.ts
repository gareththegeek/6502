import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import interrupt from '../interrupt'
import { B_BRK } from '../../state/bflags'
import { BRK_VECTOR } from '../../state/vectors'

export default () => (state: IState, bus: IBus, _: number): IState => interrupt(state, bus, BRK_VECTOR, B_BRK)
