import IState from '../state/istate'

export default (pageCount: number) => (): IState => ({
    pages: new Array(pageCount).fill({
        data: new Array(0xff).fill(0)
    })
})
