import IState from '../../state/istate'
import IBus from '../../../bus/ibus'

export default () => (state: IState, _: IBus, __: number): IState => ({
    ...state, 
    status: {
        ...state.status,
        decimal: true
    }
})
