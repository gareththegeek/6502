import IMemory from './IMemory'
import connect from '../state/connect'
import read from './pure/read'
import IRange from '../range/irange'
import getPageIndex from './pure/getPageIndex'
import getPageAddress from './pure/getPageAddress'
import write from './pure/write'
import initialise from './pure/initialise'
import IBusRead from '../bus/state/ibusread'
import connectPure from '../state/connectPure'
import IState from './state/istate'
import IStore from '../state/istore'

const rangeCheckCurry = (range: IRange): ((orignal: (data: IBusRead) => number, data: IBusRead) => any) => {
    return (original: (data: IBusRead) => number, data: IBusRead): any => {
        if (data.address < range.from || data.address > range.to) {
            return undefined
        }
        return original(data)
    }
}

export default (range: IRange, pageCount: number): IMemory => {
    const store: IStore<IState> = { state: null }
    const rangeCheck = rangeCheckCurry(range)

    return {
        initialise: connectPure(store, initialise(pageCount)),
        read: data => rangeCheck(connectPure(store, read(range, getPageIndex(), getPageAddress())), data),
        write: data => rangeCheck(connectPure(store, write(range, getPageIndex(), getPageAddress())), data)
    } as IMemory
}
