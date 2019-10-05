import { TGetAddressingMode, TAddressingMode } from '../typings'
import IBus from '../../bus/ibus'
import IDataRegisters from '../state/idataregisters'

export default (table: { [addressingMode: string]: TAddressingMode }): TGetAddressingMode =>
    (bus: IBus, addressingMode: string, operand: Array<number>, dataRegisters: IDataRegisters): number =>
        table[addressingMode.toLowerCase()](bus, operand, dataRegisters)
