import IState from '../state/istate'
import { TGetPageIndex, TGetPageAddress } from '../typings'
import IRange from '../../range/irange'
import IBusRead from '../../bus/state/ibusread'

export default (range: IRange, getPageIndex: TGetPageIndex, getPageAddress: TGetPageAddress) => (
    state: IState,
    data: IBusRead
): number => state.pages[getPageIndex(data.address - range.from)].data[getPageAddress(data.address - range.from)]
