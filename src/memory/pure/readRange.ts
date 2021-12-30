import IState from '../state/istate'
import IRangeReadProps from '../../bus/state/irangereadprops'
import IRangeResult from '../../bus/state/irangeresult'
import IRange from '../../rangedcomponent/state/irange'

export default (range: IRange) => (state: IState, props: IRangeReadProps): IRangeResult => ({
    //TODO tidy this up
    data: Object.values(state.pages)
        .flatMap(x => x.data)
        .slice(props.range.from - range.from, props.range.to + 1 - range.from)
})
