import IMemory from './IMemory'
import read from './pure/read'
import getPageIndex from './pure/getPageIndex'
import getPageAddress from './pure/getPageAddress'
import write from './pure/write'
import initialise from './pure/initialise'
import connect from '../state/connect'
import IRange from '../rangedcomponent/state/irange'
import readRange from './pure/readRange'

export default (range: IRange): IMemory => {
    const connected = connect(
        {
            range,
            initialise: initialise(),
            read: read(range, getPageIndex(), getPageAddress()),
            write: write(range, getPageIndex(), getPageAddress())
        },
        { state: null }
    )
    return {
        ...connected,
        readRange: readRange(range, connected.store)
    } as unknown as IMemory
}
