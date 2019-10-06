import ldx from "../../../../src/6502/pure/operations/ldx"
import { testOperation } from "../../../helpers/6502"
import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('ldx', () => {
            it('should load parameter into x register and set negative and zero flags', () => {
                const actual = testOperation(ldx(), {}, {}, 0x80)

                expect(actual).to.containSubset({
                    x: 0x80,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
