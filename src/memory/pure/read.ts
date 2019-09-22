import IState from '../state/istate'
import { TGetPageIndex, TGetPageAddress } from '../typings'

export default (base: number, getPageIndex: TGetPageIndex, getPageAddress: TGetPageAddress) => (
    state: IState,
    address: number
): number => state.pages[getPageIndex(address - base)].data[getPageAddress(address - base)]
