import IState from '../state/istate'
import IBusWriteProps from '../../bus/state/ibuswriteprops'
import IBusResult from '../../bus/state/ibusresult'
import IRange from '../state/irange'
import { TBusWrite } from '../../bus/state/tbuswrite'

export default (range: IRange, write: TBusWrite) => (_: IState, props: IBusWriteProps): IBusResult => {
    if (props.address < range.from || props.address > range.to) {
        return {
            value: null,
            read: false,
            write: false
        }
    }
    return write(props)
}
