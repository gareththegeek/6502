import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'
import littleEndian from '../../../bitwise/littleEndian'

export default (): TAddressingMode => (bus: IBus, operand: Array<number>, __: IDataRegisters): number =>
    bus.read({ address: littleEndian(operand) })
