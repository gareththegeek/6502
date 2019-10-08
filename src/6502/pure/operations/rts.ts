import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import getStackAddress from '../../../bitwise/getStackAddress'
import littleEndian from '../../../bitwise/littleEndian'

export default () => (state: IState, bus: IBus, _: number): IState => {
    const lo = bus.read({ address: getStackAddress(state.sp + 1) })
    const hi = bus.read({ address: getStackAddress(state.sp + 2) })
    const pc = (littleEndian([lo, hi]) + 1) & 0xffff
    return {
        ...state,
        pc,
        sp: state.sp + 2,
        status: { ...state.status }
    }
}
