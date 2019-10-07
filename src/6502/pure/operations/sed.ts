import IState from '../../state/istate'
import IBus from '../../../bus/ibus'

// SED not implemented on NES
export default () => (state: IState, bus: IBus, parameter: number): IState => ({ ...state })
