import IState from './state/istate'
import IRangedComponent from '../rangedcomponent/irangedcomponent'

export default interface IRom extends IRangedComponent {
    initialise: (data: Array<number>) => IState
}
