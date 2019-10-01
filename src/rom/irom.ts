import IState from './state/istate'
import { TBusRead } from '../bus/state/tbusread'

export default interface IRom {
    initialise: (data: Array<number>) => IState
    read: TBusRead
}
