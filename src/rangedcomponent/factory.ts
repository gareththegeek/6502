import IRange from './state/irange'
import { TBusRead } from '../bus/state/tbusread'
import { TBusWrite } from '../bus/state/tbuswrite'
import IRangedComponent from './state/irangedcomponent'
import connect from '../state/connect'
import read from './pure/read'
import write from './pure/write'

export default (range: IRange, readimpl: TBusRead, writeimpl: TBusWrite): IRangedComponent =>
    connect(
        {
            read: read(range, readimpl),
            write: write(range, writeimpl)
        },
        { state: null }
    ) as IRangedComponent
