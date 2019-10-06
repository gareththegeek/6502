import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isZero from '../status/iszero'
import isBitZeroSet from '../../../bitwise/isBitZeroSet'

export default () => (state: IState, _: IBus, parameter: number): IState => {
    const next = (parameter >> 1) | (state.status.carry ? 0x80 : 0x00)
    return {
        ...state,
        a: next,
        status: {
            ...state.status,
            zero: isZero(next),
            negative: state.status.carry,
            carry: isBitZeroSet(parameter)
        }
    }
}
