import tya from '../../../../src/6502/pure/operations/tya'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('tya', () => {
            it('should load y register into accumulator set negative and zero flags', () => {
                const actual = testOperation(tya(), { a: 0x44, y: 0x33 }, { zero: true, negative: true }, 0x00)

                expect(actual).to.containSubset({
                    a: 0x33,
                    status: {
                        negative: false,
                        zero: false
                    }
                })
            })
        })
    })
})
