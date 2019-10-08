import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import getStackAddress from '../../../bitwise/getStackAddress'
import lowByte from '../../../bitwise/lowByte'
import highByte from '../../../bitwise/highByte'

export default () => (state: IState, bus: IBus, parameter: number): IState => {
    const value = state.pc - 1
    bus.write({ address: getStackAddress(state.sp - 0), value: highByte(value) })
    bus.write({ address: getStackAddress(state.sp - 1), value: lowByte(value) })
    return {
        ...state,
        pc: parameter,
        sp: state.sp - 2,
        status: { ...state.status }
    }
}
