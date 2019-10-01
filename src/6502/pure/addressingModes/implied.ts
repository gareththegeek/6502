import { TAddressingMode } from '../../typings'
import IBus from '../../../bus/ibus'
import IDataRegisters from '../../state/idataregisters'

export default (): TAddressingMode => (_: IBus, __: Array<number>, ___: IDataRegisters): number => 0
