import IState from '../../state/istate'
import IBus from '../../../bus/ibus'

export default () => (state: IState, _: IBus, parameter: number): IState => ({
    ...state,
    pc: state.status.carry ? state.pc : state.pc + parameter,
    status: {
        ...state.status
    }
})
