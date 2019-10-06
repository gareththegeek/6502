import ldy from '../../../../src/6502/pure/operations/ldy'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('ldy', () => {
            it('should load parameter into y register and set negative and zero flags', () => {
                const actual = testOperation(ldy(), {}, {}, 0x80)

                expect(actual).to.containSubset({
                    y: 0x80,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
