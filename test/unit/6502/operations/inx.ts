import inx from '../../../../src/6502/pure/operations/inx'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('inx', () => {
            it('should increment value in x register and set negative and zero flags', () => {
                const actual = testOperation(inx(), { x: 0xfd }, { negative: false, zero: true }, 0x00)

                expect(actual).to.containSubset({
                    x: 0xfe,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
