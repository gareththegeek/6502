import eor from '../../../../src/6502/pure/operations/eor'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import { testOperation } from '../../../helpers/6502'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('eor', () => {
            it('should bitwise exclusive or parameter with accumulator and set negative and zero flags', () => {
                const actual = testOperation(eor(), { a: 0xf0 }, {}, 0xaa)

                expect(actual).to.containSubset({
                    a: 0x5a,
                    status: {
                        negative: false,
                        zero: false
                    }
                })
            })
        })
    })
})
