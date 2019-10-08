import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import getStackAddress from '../../../bitwise/getStackAddress'
import getByteStatus from '../getByteStatus'
import littleEndian from '../../../bitwise/littleEndian'

export default () => (state: IState, bus: IBus, _: number): IState => {
    const byte = bus.read({ address: getStackAddress(state.sp + 1) })
    const status = getByteStatus(byte)
    const hi = bus.read({ address: getStackAddress(state.sp + 2) })
    const lo = bus.read({ address: getStackAddress(state.sp + 3) })
    const pc = littleEndian([lo, hi])
    return {
        ...state,
        pc,
        sp: state.sp + 3,
        status
    }
}
