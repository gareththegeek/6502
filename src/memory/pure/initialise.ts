import IState from '../state/istate'

export default () => (_: IState, pageCount: number): IState => ({
    pages: new Array(pageCount).fill({
        data: new Array(0x100).fill(0)
    }),
    value: null,
    read: false,
    write: false
})
