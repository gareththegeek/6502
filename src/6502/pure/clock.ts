import { TInitialise, TFetchInstruction, TStateMachine, TFetchOperand, TGetAddressingMode } from '../typings'
import IBus from '../../bus/ibus'
import IState from '../state/istate'
import IDataRegisters from '../state/idataregisters'

export default (
    initialise: TInitialise,
    fetchInstruction: TFetchInstruction,
    fetchOperand: TFetchOperand,
    getAddressingMode: TGetAddressingMode,
    bus: IBus
): TStateMachine => (state: IState): IState => {
    if (state.cycles !== 0) {
        return { ...state, cycles: state.cycles - 1 }
    }

    if (!state.initialised) {
        return initialise(bus)
    }
    //TODO extra cycles
    const instruction = fetchInstruction(bus, state.pc)
    const operand = fetchOperand(bus, state.pc + 1, instruction.size - 1)
    const dataRegisters = (({ a, x, y }): IDataRegisters => ({ a, x, y }))(state)
    const parameter = getAddressingMode(bus, instruction.addressingMode, operand, dataRegisters)
    const pc = state.pc + instruction.size

    console.log(instruction)
    console.log(operand)
    console.log(parameter)
    console.log(pc)
}
