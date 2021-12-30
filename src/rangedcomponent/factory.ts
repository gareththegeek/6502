import IRangedComponent from './irangedcomponent'
import connect from '../state/connect'
import read from './pure/read'
import write from './pure/write'
import IPubSub from '../pubsub/ipubsub'
import { BUS_READ, BUS_WRITE } from '../bus/messageTypes'
import initialise from './pure/initialise'

export default (pubsub: IPubSub, component: IRangedComponent): IRangedComponent => {
    const result = connect(
        {
            range: component.range,
            component,
            initialise: initialise(component),
            read: read(component.range, component.read),
            write: write(component.range, component.write)
        },
        { state: null }
    ) as IRangedComponent

    pubsub.subscribe(BUS_READ, result.read)
    pubsub.subscribe(BUS_WRITE, result.write)

    return { ...component, ...result }
}
