import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isBitZeroSet from '../../../bitwise/isBitZeroSet'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const next = parameter >> 1
    return {
        ...state,
        a: next,
        status: {
            ...state.status,
            zero: isZero(next),
            negative: false,
            carry: isBitZeroSet(parameter)
        }
    }
}
