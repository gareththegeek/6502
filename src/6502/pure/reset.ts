import IState from '../state/istate'
import { TReset } from './typings'

export default (): TReset => (state: IState): IState => {
    return {
        ...state,
        initialised: false,
        cycles: 0
    }
}
