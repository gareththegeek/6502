import IInstruction from './state/iinstruction'
import IBus from '../bus/ibus'
import IState from './state/istate'
import IDataRegisters from './state/idataregisters'

export type TStateMachine = (state: IState) => IState

export type TInitialise = () => IState
export type TFetchInstruction = (bus: IBus, address: number) => IInstruction
export type TFetchOperand = (bus: IBus, address: number, size: number) => Array<number>
export type TAddressingMode = (bus: IBus, operand: Array<number>, registers: IDataRegisters) => number
export type TGetAddressingMode = (
    bus: IBus,
    addressingMode: string,
    operand: Array<number>,
    registers: IDataRegisters
) => number
export type TGetOperation = (instruction: IInstruction) => TOperation
export type TOperation = (state: IState, bus: IBus, parameter: number) => IState
