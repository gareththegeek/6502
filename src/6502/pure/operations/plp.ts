import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import getStackAddress from '../../../bitwise/getStackAddress'
import getByteStatus from '../getByteStatus'

export default () => (state: IState, bus: IBus, _: number): IState => {
    const next = bus.read({ address: getStackAddress(state.sp + 1) })
    return {
        ...state,
        sp: state.sp + 1,
        status: getByteStatus(next)
    }
}
