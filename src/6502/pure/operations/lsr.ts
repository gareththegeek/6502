import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const next = parameter >> 1
    return {
        ...state,
        a: next,
        status: {
            ...state.status,
            zero: isZero(next),
            negative: false,
            carry: (parameter & 0x01) === 0x01
        }
    }
}
