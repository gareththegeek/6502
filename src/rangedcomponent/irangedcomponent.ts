/*eslint @typescript-eslint/no-explicit-any: "off"*/
import { TBusRead } from '../bus/state/tbusread'
import { TBusWrite } from '../bus/state/tbuswrite'
import { TRangeRead } from '../bus/state/trangeread'
import IRange from './state/irange'

export default interface IRangedComponent {
    range: IRange
    component: IRangedComponent
    initialise: (...args: any) => void
    read: TBusRead
    write: TBusWrite
    readRange: TRangeRead
}
