/*eslint @typescript-eslint/no-explicit-any: "off"*/
import { TBusRead } from '../bus/state/tbusread'
import { TBusWrite } from '../bus/state/tbuswrite'
import { TRangeRead } from '../bus/state/trangeread'
import IRange from './state/irange'
import IState from './state/istate'

export default interface IRangedComponent {
    range: IRange
    component: IRangedComponent
    initialise: (...args: any) => IState
    read: TBusRead
    write: TBusWrite
    readRange: TRangeRead
}
