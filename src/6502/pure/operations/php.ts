import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import getStatusByte from '../getStatusByte'
import { B_PHP } from '../../state/bflags'
import toByte from '../../../bitwise/toByte'
import getStackAddress from '../../../bitwise/getStackAddress'

export default () => (state: IState, bus: IBus, _: number): IState => {
    const value = getStatusByte(state.status) | B_PHP
    bus.write({ address: getStackAddress(state.sp), value })
    return {
        ...state,
        sp: toByte(state.sp - 1),
        status: {
            ...state.status
        }
    }
}
