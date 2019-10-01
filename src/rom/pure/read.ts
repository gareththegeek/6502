import IBusReadProps from '../../bus/state/ibusreadprops'
import IState from '../state/istate'
import IRange from '../../rangedcomponent/state/irange'

export default (range: IRange) => (state: IState, props: IBusReadProps): IState => ({
    ...state,
    value: state.data[props.address - range.from],
    read: true,
    write: false
})
