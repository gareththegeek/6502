import IBusWrite from './state/ibuswrite'
import IBusRead from './state/ibusread'

export default interface IBus {
    write: (data: IBusWrite) => void
    read: (data: IBusRead) => number
}
