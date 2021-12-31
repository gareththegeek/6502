import IState from '../state/istate'
import IRangeReadProps from '../../bus/state/irangereadprops'
import IRangeResult from '../../bus/state/irangeresult'
import IRange from '../../rangedcomponent/state/irange'
import IStore from '../../state/istore'

export default (range: IRange, { state }: IStore<IState>) => (props: IRangeReadProps): IRangeResult => ({
    data: state.data.slice(props.range.from - range.from, props.range.to + 1 - range.from)
})
