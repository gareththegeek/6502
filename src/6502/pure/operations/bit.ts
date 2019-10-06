import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import isNegative from '../status/isnegative'

export default () => (state: IState, _: IBus, parameter: number): IState => ({
    ...state,
    status: {
        ...state.status,
        zero: (state.a & parameter) === 0x00,
        overflow: (parameter & 0x40) >> 6 === 0x01,
        negative: isNegative(parameter)
    }
})
