import tax from '../../../../src/6502/pure/operations/tax'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('tax', () => {
            it('should load accumulator into x register set negative and zero flags', () => {
                const actual = testOperation(tax(), { a: 0x44, x: 0x33 }, { zero: true, negative: true }, 0x00)

                expect(actual).to.containSubset({
                    x: 0x44,
                    status: {
                        negative: false,
                        zero: false
                    }
                })
            })
        })
    })
})
