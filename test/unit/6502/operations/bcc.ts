import bcc from "../../../../src/6502/pure/operations/bcc"
import { testOperation } from "../../../helpers/6502"
import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('bcc', () => {
            it('should add parameter to program counter if carry status flag is not set', () => {
                const actual = testOperation(bcc(), { pc: 0x1000 }, { carry: false }, 0x06)
                
                expect(actual).to.containSubset({
                    pc: 0x1006
                })
            })

            it('should not add parameter to program counter if carry status flag is set', () => {
                const actual = testOperation(bcc(), { pc: 0x1000 }, { carry: true }, 0x06)
                
                expect(actual).to.containSubset({
                    pc: 0x1000
                })
            })
        })
    })
})
