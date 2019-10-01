import IBusReadProps from './state/ibusreadprops'
import IBusWriteProps from './state/ibuswriteprops'

export default interface IBus {
    write: (props: IBusWriteProps) => boolean
    read: (props: IBusReadProps) => number
}
