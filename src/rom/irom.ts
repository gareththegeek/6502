import IState from './state/istate'
import IRangedComponent from '../rangedcomponent/irangedcomponent'
import IStore from '../state/istore'

export default interface IRom extends IRangedComponent {
    store: IStore<IState>
    initialise: (data: Array<number>) => IState
}
