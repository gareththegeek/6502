import IState from '../state/istate'

export default () => (_: IState, data: Array<number>): IState => ({
    data,
    value: null,
    read: false,
    write: false
})
