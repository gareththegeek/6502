import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'
import littleEndian from '../../../bitwise/littleEndian'

export default (): TAddressingMode => (_: IBus, operand: Array<number>, __: IDataRegisters): number =>
    littleEndian(operand)
