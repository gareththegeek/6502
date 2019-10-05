import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isNegative from '../status/isnegative'
import isZero from '../status/iszero'

export default () => (state: IState, _: IBus, parameter: number): IState => ({
    ...state,
    x: parameter,
    status: {
        ...state.status,
        negative: isNegative(parameter),
        zero: isZero(parameter)
    }
})
