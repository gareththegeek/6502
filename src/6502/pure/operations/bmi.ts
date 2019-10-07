import IState from '../../state/istate'
import IBus from '../../../bus/ibus'

export default () => (state: IState, _: IBus, parameter: number): IState => ({
    ...state,
    pc: state.status.negative ? state.pc + parameter : state.pc,
    status: {
        ...state.status
    }
})