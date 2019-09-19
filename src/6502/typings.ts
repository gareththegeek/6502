import IInstruction from './store/iinstruction'
import IBus from '../bus/ibus'
import IState from './store/istate'

export type TReset = (state: IState) => IState
export type TClock = (state: IState) => IState
export type TIrq = (state: IState) => IState
export type TNmi = (state: IState) => IState

export type TInitialise = () => IState
export type TFetchInstruction = (bus: IBus, address: number) => IInstruction
