import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'

export default () => (state: IState, bus: IBus, parameter: number): IState => {
    const value = bus.read({
        address: parameter
    }) - 1
    bus.write({
        address: parameter,
        value
    })
    return {
        ...state,
        status: {
            ...state.status,
            zero: isZero(value),
            negative: isNegative(value)
        }
    }
}
