import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isNegative from '../status/isnegative'
import toByte from '../../../bitwise/toByte'

export default () => (state: IState, bus: IBus, parameter: number): IState => {
    const read = bus.read({ address: parameter })
    const value = toByte(read + 1)
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
