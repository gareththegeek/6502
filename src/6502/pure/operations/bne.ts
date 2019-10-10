import IState from '../../state/istate'
import IBus from '../../../bus/ibus'
import { TBranchOperation } from '../../typings'

export default (branch: TBranchOperation) => (state: IState, _: IBus, parameter: number): IState =>
    branch(state, parameter, !state.status.zero)
