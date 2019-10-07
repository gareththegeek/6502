import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import toByte from '../../../bitwise/toByte'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'

export default () => (state: IState, _: IBus, __: number): IState => {
    const next = toByte(state.x + 1)
    return {
        ...state,
        x: next,
        status: {
            ...state.status,
            zero: isZero(next),
            negative: isNegative(next)
        }
    }
}
