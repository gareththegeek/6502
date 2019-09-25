import updateElement from '../../immutability/updateElement'
import IState from '../state/istate'
import { TGetPageIndex, TGetPageAddress } from '../typings'
import IRange from '../../range/irange'
import IBusWrite from '../../bus/state/ibuswrite'

export default (range: IRange, getPageIndex: TGetPageIndex, getPageAddress: TGetPageAddress) => (
    state: IState,
    data: IBusWrite
): IState => {
    const pageIndex = getPageIndex(data.address - range.from)
    const pageAddress = getPageAddress(data.address - range.from)

    const newPage = {
        data: updateElement(state.pages[pageIndex].data, pageAddress, data.value)
    }

    return {
        pages: updateElement(state.pages, pageIndex, newPage)
    }
}
