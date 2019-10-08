import { TStateMachine } from '../typings'
import IState from '../state/istate'

export default (): TStateMachine => (state: IState): IState => ({
    ...state,
    nmi: true
})
