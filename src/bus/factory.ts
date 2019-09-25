import IBus from './ibus'
import IPubSub from '../pubsub/ipubsub'
import read from './pure/read'
import write from './pure/write'

export default (pubsub: IPubSub): IBus => ({
    read: read(pubsub),
    write: write(pubsub)
})
