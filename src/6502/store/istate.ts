import IStatusRegister from './istatusRegister'

export default interface IState {
    pc: number
    a: number
    x: number
    y: number
    sp: number
    status: IStatusRegister
    initialised: boolean
    cycles: number
}
