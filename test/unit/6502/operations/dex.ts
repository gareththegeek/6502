import dex from '../../../../src/6502/pure/operations/dex'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('dex', () => {
            it('should decrement value in x register and set negative and zero flags', () => {
                const actual = testOperation(dex(), { x: 0x00 }, { negative: false, zero: true }, 0x00)

                expect(actual).to.containSubset({
                    x: 0xff,
                    status: {
                        negative: true,
                        zero: false
                    }
                })
            })
        })
    })
})
