import { TStateMachine } from '../typings'
import IState from '../state/istate'

export default (): TStateMachine => (_: IState): IState => {
    return null
}
