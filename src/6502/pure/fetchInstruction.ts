import IBus from '../../bus/ibus'
import { TFetchInstruction } from '../typings'
import IInstruction from '../state/iinstruction'

export default (INSTRUCTION_TABLE: { [opcode: number]: IInstruction }): TFetchInstruction =>
    (bus: IBus, address: number): IInstruction => {
        const opcode = bus.read({ address })

        if (!(opcode in INSTRUCTION_TABLE)) {
            return INSTRUCTION_TABLE[0x00]
        }

        return INSTRUCTION_TABLE[opcode]
    }
