import IInstruction from './state/iinstruction'
import IBus from '../bus/ibus'
import IState from './state/istate'

export type TStateMachine = (state: IState) => IState

export type TInitialise = () => IState
export type TFetchInstruction = (bus: IBus, address: number) => IInstruction
