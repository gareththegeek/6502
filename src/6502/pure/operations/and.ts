import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isNegative from '../status/isnegative'
import isZero from '../status/iszero'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const a = state.a & parameter
    return {
        ...state,
        a,
        status: {
            ...state.status,
            negative: isNegative(a),
            zero: isZero(a)
        }
    }
}
