import tay from '../../../../src/6502/pure/operations/tay'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('tay', () => {
            it('should load accumulator into y register set negative and zero flags', () => {
                const actual = testOperation(tay(), { a: 0x44, y: 0x33 }, { zero: true, negative: true }, 0x00)

                expect(actual).to.containSubset({
                    y: 0x44,
                    status: {
                        negative: false,
                        zero: false
                    }
                })
            })
        })
    })
})
