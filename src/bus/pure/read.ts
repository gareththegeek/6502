import IPubSub from '../../pubsub/ipubsub'
import IBusReadProps from '../state/ibusreadprops'
import { BUS_READ } from '../messageTypes'
import IBusResult from '../state/ibusresult'

export default (pubsub: IPubSub) => (props: IBusReadProps): number =>
    pubsub.publish<IBusResult>(BUS_READ, props).find(result => result.read === true).value
