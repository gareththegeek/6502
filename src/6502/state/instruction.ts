import IInstruction from './iinstruction'

export default class implements IInstruction {
    public opcode: number
    public mnemonic: string
    public addressingMode: string
    public size: number
    public cycles: number
    public addPageBoundaryCycle: boolean

    constructor(
        opcode: number,
        mnemonic: string,
        addressingMode: string,
        size: number,
        cycles: number,
        addPageBoundaryCycle = false
    ) {
        this.opcode = opcode
        this.mnemonic = mnemonic
        this.addressingMode = addressingMode
        this.size = size
        this.cycles = cycles
        this.addPageBoundaryCycle = addPageBoundaryCycle
    }
}
