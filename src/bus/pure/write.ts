import IPubSub from '../../pubsub/ipubsub'
import IBusWriteProps from '../state/ibuswriteprops'
import { BUS_WRITE } from '../messageTypes'
import IBusResult from '../state/ibusresult'

export default (pubsub: IPubSub) => (props: IBusWriteProps): boolean =>
    pubsub.publish<IBusResult>(BUS_WRITE, props).some(result => result.write === true)
