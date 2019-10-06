import and from '../../../../src/6502/pure/operations/and'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
import { testOperation } from '../../../helpers/6502'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('and', () => {
            it('should bitwise and parameter with accumulator and set negative and zero flags', () => {
                const actual = testOperation(and(), { a: 0xf0 }, {}, 0x3c)

                expect(actual).to.containSubset({
                    a: 0x30,
                    status: {
                        negative: false,
                        zero: false
                    }
                })
            })
        })
    })
})
