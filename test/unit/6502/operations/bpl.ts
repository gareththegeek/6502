import bpl from '../../../../src/6502/pure/operations/bpl'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('bpl', () => {
            it('should add parameter to program counter if negative status flag is not set', () => {
                const actual = testOperation(bpl(), { pc: 0x1000 }, { negative: false }, 0x06)

                expect(actual).to.containSubset({
                    pc: 0x1006
                })
            })

            it('should not add parameter to program counter if negative status flag is set', () => {
                const actual = testOperation(bpl(), { pc: 0x1000 }, { negative: true }, 0x06)

                expect(actual).to.containSubset({
                    pc: 0x1000
                })
            })
        })
    })
})
