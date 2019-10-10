import IState from '../state/istate'
import isPageCrossed from '../../bitwise/isPageCrossed'

export default () => (state: IState, parameter: number, branch: boolean): IState => {
    const pageBoundary = isPageCrossed(state.pc, parameter)
    return {
        ...state,
        pc: branch ? state.pc + parameter : state.pc,
        cycles: branch
            ? (pageBoundary ? state.cycles + 2 : state.cycles + 1)
            : state.cycles,
        status: {
            ...state.status
        }
    }
}
