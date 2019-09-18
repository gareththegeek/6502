import IInstruction from "../state/iinstruction";
import IBus from "../../ibus";
import IState from "../state/state";

export type TReset = (state: IState) => IState
export type TClock = (state: IState) => IState
export type TIrq = (state: IState) => IState
export type TNmi = (state: IState) => IState

export type TInitialise = () => IState
export type TFetchInstruction = (bus: IBus, address: number) => IInstruction
