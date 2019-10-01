import IState from './state/istate'
import { TBusRead } from '../bus/state/tbusread'
import { TBusWrite } from '../bus/state/tbuswrite'

export default interface IMemory {
    initialise: () => IState
    read: TBusRead
    write: TBusWrite
}
