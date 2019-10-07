import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isNegative from '../status/isnegative'

export default () => (state: IState, _: IBus, parameter: number): IState => ({
    ...state,
    status: {
        ...state.status,
        zero: state.a === parameter,
        carry: state.a >= parameter,
        negative: isNegative(state.a - parameter)
    }
})
