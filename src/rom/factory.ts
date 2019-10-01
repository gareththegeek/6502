import IRom from './irom'
import initialise from './pure/initialise'
import read from './pure/read'
import connect from '../state/connect'
import IRange from '../rangedcomponent/state/irange'

export default (range: IRange): IRom =>
    connect(
        {
            initialise: initialise(),
            read: read(range)
        },
        { state: null }
    ) as IRom
