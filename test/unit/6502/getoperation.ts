import { expect } from "chai"
import getOperation from "../../../src/6502/pure/getoperation"
import sinon = require("sinon")
import IInstruction from "../../../src/6502/state/iinstruction"

describe('6502.getOperation', () => {
    it('should return the operation with the matching mnemonic', () => {
        const expected = sinon.stub()
        const unexpected = sinon.stub()
        const table = {
            'expected': expected,
            'unexpected': unexpected
        }
        const instruction = {
            mnemonic: 'expected'
        } as IInstruction

        const uut = getOperation(table)
        const actual = uut(instruction)

        expect(actual).to.be.equal(expected)
    })
})