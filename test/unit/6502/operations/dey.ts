import dey from '../../../../src/6502/pure/operations/dey'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('dey', () => {
            it('should decrement value in y register and set negative and zero flags', () => {
                const actual = testOperation(dey(), { y: 0x00 }, { negative: false, zero: true }, 0x00)

                expect(actual).to.containSubset({
                    y: 0xff,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
