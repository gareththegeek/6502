import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isNegative from '../status/isnegative'
import isZero from '../status/iszero'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const next = (parameter << 1) & 0xff | (state.status.carry ? 1 : 0)
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
