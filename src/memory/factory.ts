import IMemory from './IMemory'
import read from './pure/read'
import getPageIndex from './pure/getPageIndex'
import getPageAddress from './pure/getPageAddress'
import write from './pure/write'
import initialise from './pure/initialise'
import connect from '../state/connect'
import IRange from '../rangedcomponent/state/irange'

export default (range: IRange): IMemory =>
    connect(
        {
            range,
            initialise: initialise(),
            read: read(range, getPageIndex(), getPageAddress()),
            write: write(range, getPageIndex(), getPageAddress())
        },
        { state: null }
    ) as IMemory
