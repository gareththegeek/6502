import IRom from './irom'
import initialise from './pure/initialise'
import read from './pure/read'
import connect from '../state/connect'
import IRange from '../rangedcomponent/state/irange'
import IBusWriteProps from '../bus/state/ibuswriteprops'
import IBusResult from '../bus/state/ibusresult'
import IState from './state/istate'
import readRange from './pure/readRange'

export default (range: IRange): IRom => {
    const connected =
        connect(
            {
                range,
                initialise: initialise(),
                read: read(range),
                write: (state: IState, __: IBusWriteProps): IBusResult => ({ ...state })
            },
            { state: null }
        )
    return {
        ...connected,
        readRange: readRange(range, connected.store)
    } as unknown as IRom
} 
