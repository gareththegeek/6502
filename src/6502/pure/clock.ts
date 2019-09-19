import IState from '../state/istate'
import { TInitialise, TFetchInstruction, TClock } from './typings'
import IBus from '../../ibus'

export default (initialise: TInitialise, fetchInstruction: TFetchInstruction, bus: IBus): TClock => (
    state: IState
): IState => {
    if (state.cycles !== 0) {
        return { ...state, cycles: state.cycles - 1 }
    }

    if (!state.initialised) {
        return initialise()
    }

    const instruction = fetchInstruction(bus, state.pc)
}
