import ror from "../../../../src/6502/pure/operations/ror"
import { testOperation } from "../../../helpers/6502"
import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('ror', () => {
            it('should shift data right one bit with carry flag going into high bit and lost bit going into carry flag', () => {
                const actual = testOperation(ror(), {}, { carry: true }, 0x55)

                expect(actual).to.containSubset({
                    a: 0xaa,
                    status: {
                        negative: true,
                        zero: false,
                        carry: true
                    }
                })
            })
        })
    })
})
