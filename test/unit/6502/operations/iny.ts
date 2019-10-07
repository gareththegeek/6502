import iny from '../../../../src/6502/pure/operations/iny'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('iny', () => {
            it('should increment value in y register and set negative and zero flags', () => {
                const actual = testOperation(iny(), { y: 0xfd }, { negative: false, zero: true }, 0x00)

                expect(actual).to.containSubset({
                    y: 0xfe,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
