export default interface IInstruction {
    opcode: number
    mnemonic: String
    addressingMode: String
    size: number
    cycles: number
    addPageBoundaryCycle: boolean
    addBranchCycles: boolean
}