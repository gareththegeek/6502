import IState from '../state/istate'

export default () => (_: IState, pageCount: number): IState => ({
    pages: new Array(pageCount).fill({
        data: new Array(0xff).fill(0)
    }),
    value: null,
    read: false,
    write: false
})
