import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'
import toByte from '../../../bitwise/toByte'
import boolToByte from '../../../bitwise/boolToByte'
import isOverflow from '../../../bitwise/isOverflow'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const carry = boolToByte(state.status.carry)
    const next16 = state.a + parameter + carry
    const next8 = toByte(next16)
    return {
        ...state,
        a: next8,
        status: {
            ...state.status,
            zero: isZero(next8),
            negative: isNegative(next8),
            overflow: isOverflow(state.a + carry, parameter, next16),
            carry: next16 > 0xff
        }
    }
}
