import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'
import toByte from '../../../bitwise/toByte'
import boolToByte from '../../../bitwise/boolToByte'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const nextBig = state.a + parameter + boolToByte(state.status.carry)
    const next = toByte(nextBig)
    return {
        ...state,
        a: next,
        status: {
            ...state.status,
            zero: isZero(next),
            negative: isNegative(next),
            overflow: false,//TODO
            carry: nextBig !== next
        }
    }
}
