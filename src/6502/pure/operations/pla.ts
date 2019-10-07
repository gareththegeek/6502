import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import getStackAddress from '../../../bitwise/getStackAddress'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'

export default () => (state: IState, bus: IBus, _: number): IState => {
    const next = bus.read({ address: getStackAddress(state.sp + 1) })
    return {
        ...state,
        a: next,
        sp: state.sp + 1,
        status: {
            ...state.status,
            zero: isZero(next),
            negative: isNegative(next)
        }
    }
}
