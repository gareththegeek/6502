import updateElement from '../../immutability/updateElement'
import IState from '../state/istate'
import { TGetPageIndex, TGetPageAddress } from '../typings'

export default (getPageIndex: TGetPageIndex, getPageAddress: TGetPageAddress) => (
    state: IState,
    address: number,
    data: number
): IState => {
    const pageIndex = getPageIndex(address)
    const pageAddress = getPageAddress(address)

    const newPage = {
        data: updateElement(state.pages[pageIndex].data, pageAddress, data)
    }

    return {
        pages: updateElement(state.pages, pageIndex, newPage)
    }
}
