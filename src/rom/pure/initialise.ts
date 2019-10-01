import IState from '../state/istate'
import IStore from '../../state/istore'

export default () => (_: IStore<IState>, data: Array<number>): IState => ({
    data,
    value: null,
    read: false,
    write: false
})
