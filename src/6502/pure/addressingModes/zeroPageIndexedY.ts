import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'

export default (): TAddressingMode => (bus: IBus, operand: Array<number>, registers: IDataRegisters): number =>
    bus.read({ address: operand[0] + registers.y })
