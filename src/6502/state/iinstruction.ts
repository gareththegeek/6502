export default interface IInstruction {
    opcode: number
    mnemonic: string
    addressingMode: string
    size: number
    cycles: number
    addPageBoundaryCycle: boolean
    addBranchCycles: boolean
}
