import IPubSub from './ipubsub'
import IStore from '../state/istore'
import IState from './state/istate'
import factory from './state/factory'
import connect from '../state/connect'
import subscribe from './pure/subscribe'
import publish from './pure/publish'

export default (): IPubSub => {
    const pubsubStore: IStore<IState> = { state: factory() }
    return connect(
        {
            subscribe: subscribe(),
            publish: publish()
        },
        pubsubStore
    ) as IPubSub
}
