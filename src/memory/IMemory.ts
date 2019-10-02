import IState from './state/istate'
import IRangedComponent from '../rangedcomponent/irangedcomponent'

export default interface IMemory extends IRangedComponent {
    initialise: () => IState
}
