import IState from '../../state/istate'
import IBus from '../../../bus/ibus'

// Not implemented on NES
export default () => (state: IState, _: IBus, __: number): IState => ({ ...state })
