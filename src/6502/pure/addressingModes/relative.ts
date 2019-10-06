import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'
import toSigned from '../../../bitwise/toSigned'

export default (): TAddressingMode => (_: IBus, operand: Array<number>, __: IDataRegisters): number => toSigned(operand[0])
