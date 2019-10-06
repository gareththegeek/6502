import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isNegative from '../status/isnegative'
import isZero from '../status/iszero'
import toByte from '../../../bitwise/toByte'
import boolToByte from '../../../bitwise/boolToByte'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const next = toByte(parameter << 1) | boolToByte(state.status.carry)
    return {
        ...state,
        a: next,
        status: {
            ...state.status,
            negative: isNegative(next),
            zero: isZero(next),
            carry: isNegative(parameter)
        }
    }
}
