import IState from '../state/istate'

export default () => (): IState => ({
    pages: [
        {
            data: [0, 0, 0]
        }
    ]
})
