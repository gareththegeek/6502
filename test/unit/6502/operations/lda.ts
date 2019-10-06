import lda from '../../../../src/6502/pure/operations/lda'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('lda', () => {
            it('should load parameter into accumulator and set negative and zero flags', () => {
                const actual = testOperation(lda(), {}, {}, 0x80)

                expect(actual).to.containSubset({
                    a: 0x80,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
