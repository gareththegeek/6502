import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'
import littleEndian from '../../../bitwise/littleEndian'

export default (): TAddressingMode => (bus: IBus, operand: Array<number>, registers: IDataRegisters): number => {
    const address = littleEndian(operand)
    const lo = bus.read({ address })
    const hi = bus.read({ address: address + 1 })
    return littleEndian([lo, hi]) + registers.y
}
