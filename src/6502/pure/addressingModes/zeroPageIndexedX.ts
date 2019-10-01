import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'

export default (): TAddressingMode => (_: IBus, operand: Array<number>, registers: IDataRegisters): number =>
    operand[0] + registers.x
