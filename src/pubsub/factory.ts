import IPubSub from './ipubsub'
import subscribe from './pure/subscribe'
import publish from './pure/publish'
import connectPure from '../state/connectPure'

export default (): IPubSub => {
    const store = { state: { subscriptions: {} } }
    return {
        subscribe: connectPure(store, subscribe()),
        publish: (messageType, message) => publish()(store.state, messageType, message)
    } as IPubSub
}
