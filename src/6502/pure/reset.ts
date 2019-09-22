import { TStateMachine } from '../typings'
import IState from '../state/istate'

export default (): TStateMachine => (state: IState): IState => {
    return {
        ...state,
        initialised: false,
        cycles: 0
    }
}
