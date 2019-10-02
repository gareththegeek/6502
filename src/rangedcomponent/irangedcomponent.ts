/*eslint @typescript-eslint/no-explicit-any: "off"*/
import { TBusRead } from '../bus/state/tbusread'
import { TBusWrite } from '../bus/state/tbuswrite'
import IRange from './state/irange'

export default interface IRangedComponent {
    range: IRange
    initialise: (...args: any) => void
    read: TBusRead
    write: TBusWrite
}
