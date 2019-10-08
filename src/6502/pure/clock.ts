import {
    TInitialise,
    TFetchInstruction,
    TStateMachine,
    TFetchOperand,
    TGetAddressingMode,
    TGetOperation,
    TInterrupt
} from '../typings'
import IBus from '../../bus/ibus'
import IState from '../state/istate'
import IDataRegisters from '../state/idataregisters'
import { NMI_VECTOR, IRQ_VECTOR } from '../state/vectors'
import { B_NMI, B_IRQ } from '../state/bflags'

export default (
    initialise: TInitialise,
    interrupt: TInterrupt,
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

    if (state.nmi) {
        return interrupt(state, bus, NMI_VECTOR, B_NMI)
    }

    if (state.irq) {
        return interrupt(state, bus, IRQ_VECTOR, B_IRQ)
    }

    //TODO extra cycles
    //TODO address mirroring
    //TODO check all ops for overflows e.g. 0xff + 1
    //TODO implement h/w bugs
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
