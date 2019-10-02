import IState from '../state/istate'
import { TGetPageIndex, TGetPageAddress } from '../typings'
import IBusReadProps from '../../bus/state/ibusreadprops'
import IRange from '../../rangedcomponent/state/irange'

export default (range: IRange, getPageIndex: TGetPageIndex, getPageAddress: TGetPageAddress) =>
    (state: IState, props: IBusReadProps): IState => ({
        ...state,
        value: state.pages[getPageIndex(props.address - range.from)].data[getPageAddress(props.address - range.from)],
        read: true,
        write: false
    })
