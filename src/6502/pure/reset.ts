import { TReset } from '../typings'
import IState from '../store/istate'

export default (): TReset => (state: IState): IState => {
    return {
        ...state,
        initialised: false,
        cycles: 0
    }
}
