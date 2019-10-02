import updateElement from '../../immutability/updateElement'
import IState from '../state/istate'
import { TGetPageIndex, TGetPageAddress } from '../typings'
import IBusWriteProps from '../../bus/state/ibuswriteprops'
import IRange from '../../rangedcomponent/state/irange'

export default (range: IRange, getPageIndex: TGetPageIndex, getPageAddress: TGetPageAddress) =>
    (state: IState, data: IBusWriteProps): IState => {
        const pageIndex = getPageIndex(data.address - range.from)
        const pageAddress = getPageAddress(data.address - range.from)

        const newPage = {
            data: updateElement(state.pages[pageIndex].data, pageAddress, data.value)
        }

        return {
            pages: updateElement(state.pages, pageIndex, newPage),
            value: null,
            read: false,
            write: true
        }
    }
