import IState from './state/istate'
import IBusRead from '../bus/state/ibusread'
import IBusWrite from '../bus/state/ibuswrite'

export default interface IMemory {
    initialise: () => IState
    read: (data: IBusRead) => number
    write: (data: IBusWrite) => void
}
