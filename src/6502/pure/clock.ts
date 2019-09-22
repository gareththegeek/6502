import { TInitialise, TFetchInstruction, TStateMachine } from '../typings'
import IBus from '../../bus/ibus'
import IState from '../state/istate'

export default (initialise: TInitialise, fetchInstruction: TFetchInstruction, bus: IBus): TStateMachine => (
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
