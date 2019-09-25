import IPubSub from '../../pubsub/ipubsub'
import IBusWrite from '../state/ibuswrite'
import { BUS_WRITE } from '../messageTypes'

export default (pubsub: IPubSub): ((data: IBusWrite) => void) => (data: IBusWrite) => pubsub.publish(BUS_WRITE, data)
