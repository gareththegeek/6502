import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'
import littleEndian from '../../../bitwise/littleEndian'

export default (): TAddressingMode => (bus: IBus, operand: Array<number>, registers: IDataRegisters): number => {
    const indirect = operand[0]
    const lo = bus.read({ address: indirect })
    const hi = bus.read({ address: indirect + 1 })
    const direct = littleEndian([lo, hi]) + registers.y
    return bus.read({ address: direct })
}
