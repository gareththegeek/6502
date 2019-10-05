import IState from '../../state/istate'
import IBus from '../../../bus/ibus'

export default () => (state: IState, bus: IBus, parameter: number): IState => {
    bus.write({
        address: parameter,
        value: state.x
    })
    return { ...state }
}
