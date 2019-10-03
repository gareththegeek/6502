import IInstruction from '../state/iinstruction'
import { TOperation } from '../typings'

export default (instructionTable: { [mnemonic: string]: TOperation }) => (instruction: IInstruction): TOperation =>
    instructionTable[instruction.mnemonic.toLowerCase()]
