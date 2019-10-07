import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import getStackAddress from '../../../bitwise/getStackAddress'

export default () => (state: IState, bus: IBus, _: number): IState => {
    bus.write({ address: getStackAddress(state.sp), value: state.a })
    return {
        ...state,
        sp: state.sp - 1,
        status: {
            ...state.status
        }
    }
}
