import IState from './state/istate'

export default interface IMemory {
    initialise: () => IState
    read: (address: number) => number
    write: (address: number, data: number) => void
}
