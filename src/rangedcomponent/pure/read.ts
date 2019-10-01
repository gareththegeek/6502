import IState from '../state/istate'
import IBusReadProps from '../../bus/state/ibusreadprops'
import IRange from '../state/irange'
import { TBusRead } from '../../bus/state/tbusread'

export default (range: IRange, read: TBusRead) => (_: IState, props: IBusReadProps): IState => {
    if (props.address < range.from || props.address > range.to) {
        return {
            value: null,
            read: false,
            write: false
        }
    }
    return read(props)
}
