import IInstruction from "./iinstruction";

export default class implements IInstruction {

    public opcode: number
    public mnemonic: String
    public addressingMode: String
    public size: number
    public cycles: number
    public addPageBoundaryCycle: boolean
    public addBranchCycles: boolean

    constructor(
        opcode: number,
        mnemonic: String,
        addressingMode: String,
        size: number,
        cycles: number,
        addPageBoundaryCycle: boolean = false,
        addBranchCycles: boolean = false) {
        this.opcode = opcode
        this.mnemonic = mnemonic
        this.addressingMode = addressingMode
        this.size = size
        this.cycles = cycles
        this.addPageBoundaryCycle = addPageBoundaryCycle
        this.addBranchCycles = addBranchCycles
    }
}