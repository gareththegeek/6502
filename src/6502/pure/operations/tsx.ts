import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'

export default () => (state: IState, _: IBus, __: number): IState => ({
    ...state,
    x: state.sp,
    status: {
        ...state.status,
        zero: isZero(state.sp),
        negative: isNegative(state.sp)
    }
})
