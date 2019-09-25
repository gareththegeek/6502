import IPubSub from '../../pubsub/ipubsub'
import IBusRead from '../state/ibusread'
import { BUS_READ } from '../messageTypes'

export default (pubsub: IPubSub): ((data: IBusRead) => number) => (data: IBusRead) => pubsub.publish(BUS_READ, data)
