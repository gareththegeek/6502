import IRom from './irom'
import initialise from './pure/initialise'
import read from './pure/read'
import connect from '../state/connect'
import IRange from '../rangedcomponent/state/irange'
import IBusWriteProps from '../bus/state/ibuswriteprops'
import IBusResult from '../bus/state/ibusresult'

export default (range: IRange): IRom =>
    connect(
        {
            range,
            initialise: initialise(),
            read: read(range),
            write: (_: IBusWriteProps): IBusResult => ({ value: null, read: false, write: false })
        },
        { state: null }
    ) as IRom
