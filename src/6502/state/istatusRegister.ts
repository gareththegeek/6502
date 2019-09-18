export default interface IStatusRegister {
    negative: boolean
    overflow: boolean
    break: boolean
    decimal: boolean
    irqDisable: boolean
    zero: boolean
    carry: boolean
}