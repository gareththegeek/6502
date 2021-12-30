import IRom from './irom'
import initialise from './pure/initialise'
import read from './pure/read'
import connect from '../state/connect'
import IRange from '../rangedcomponent/state/irange'
import IBusWriteProps from '../bus/state/ibuswriteprops'
import IBusResult from '../bus/state/ibusresult'
import IState from './state/istate'
import readRange from './pure/readRange'

export default (range: IRange): IRom => ({
    ...connect(
        {
            range,
            initialise: initialise(),
            read: read(range),
            write: (state: IState, __: IBusWriteProps): IBusResult => ({ ...state })
        },
        { state: null }
    ),
    readRange: readRange(range)
} as unknown as IRom)
