import {
    TInitialise,
    TFetchInstruction,
    TStateMachine,
    TFetchOperand,
    TGetAddressingMode,
    TGetOperation
} from '../typings'
import IBus from '../../bus/ibus'
import IState from '../state/istate'
import IDataRegisters from '../state/idataregisters'

export default (
    initialise: TInitialise,
    fetchInstruction: TFetchInstruction,
    fetchOperand: TFetchOperand,
    getAddressingMode: TGetAddressingMode,
    getOperation: TGetOperation,
    bus: IBus
): TStateMachine => (state: IState): IState => {
    if (state.cycles !== 0) {
        return { ...state, cycles: state.cycles - 1 }
    }

    if (!state.initialised) {
        return initialise()
    }
    //TODO extra cycles
    const instruction = fetchInstruction(bus, state.pc)
    const operand = fetchOperand(bus, state.pc + 1, instruction.size - 1)
    const dataRegisters = (({ a, x, y }): IDataRegisters => ({ a, x, y }))(state)
    const parameter = getAddressingMode(bus, instruction.addressingMode, operand, dataRegisters)

    const preExecuteState = {
        ...state,
        pc: state.pc + instruction.size,
        cycles: instruction.cycles
    }

    const operation = getOperation(instruction)
    return operation(preExecuteState, bus, parameter)
}
