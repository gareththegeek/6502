import ora from "../../../../src/6502/pure/operations/ora"
import { testOperation } from "../../../helpers/6502"
import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('ora', () => {
            it('should bitwise or parameter with accumulator and set negative and zero flags', () => {
                const actual = testOperation(ora(), { a: 0x55 }, {}, 0xaa)

                expect(actual).to.containSubset({
                    a: 0xff,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
