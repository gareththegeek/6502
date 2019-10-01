import { TAddressingMode } from '../../typings'
import implied from './implied'
import accumulator from './accumulator'
import immediate from './immediate'
import absolute from './absolute'
import zeroPage from './zeroPage'
import indirect from './indirect'
import absoluteIndexedX from './absoluteIndexedX'
import absoluteIndexedY from './absoluteIndexedY'
import zeroPageIndexedX from './zeroPageIndexedX'
import zeroPageIndexedY from './zeroPageIndexedY'
import indexedIndirect from './indexedIndirect'
import indirectIndexed from './indirectIndexed'
import relative from './relative'

export const ADDRESSING_MODE_TABLE: { [addressingMode: string]: TAddressingMode } = {
    accum: accumulator(),
    imm: immediate(),
    implied: implied(),
    relative: relative(),
    abs: absolute(),
    zp: zeroPage(),
    indirect: indirect(),
    'abs,x': absoluteIndexedX(),
    'abs,y': absoluteIndexedY(),
    'zp,x': zeroPageIndexedX(),
    'zp,y': zeroPageIndexedY(),
    '(ind,x)': indexedIndirect(),
    '(ind),y': indirectIndexed()
}
export default ADDRESSING_MODE_TABLE
