import txa from '../../../../src/6502/pure/operations/txa'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('txa', () => {
            it('should load x register into accumulator set negative and zero flags', () => {
                const actual = testOperation(txa(), { a: 0x44, x: 0x33 }, { zero: true, negative: true }, 0x00)

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
