import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'
import littleEndian from '../../../bitwise/littleEndian'

export default (): TAddressingMode => (bus: IBus, operand: Array<number>, registers: IDataRegisters): number => {
    const indirect = operand[0] + registers.x
    const lo = bus.read({ address: indirect })
    const hi = bus.read({ address: indirect + 1 })
    const direct = littleEndian([lo, hi])
    return bus.read({ address: direct })
}
