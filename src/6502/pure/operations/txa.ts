import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'

export default () => (state: IState, _: IBus, __: number): IState => ({
    ...state,
    a: state.x,
    status: {
        ...state.status,
        zero: isZero(state.x),
        negative: isNegative(state.x)
    }
})
