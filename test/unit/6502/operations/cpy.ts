import cpy from '../../../../src/6502/pure/operations/cpy'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('cpy', () => {
            it('should set the zero and carry flags and clear the negative flag if the y register and parameter are equal', () => {
                const actual = testOperation(cpy(), { y: 0x53 }, { zero: false, carry: false, negative: true }, 0x53)

                expect(actual).to.containSubset({
                    y: 0x53,
                    status: {
                        zero: true,
                        carry: true,
                        negative: false
                    }
                })
            })

            it('should clear the zero flag if the y register and parameter are not equal', () => {
                const actual = testOperation(cpy(), { y: 0x53 }, { zero: true }, 0x52)

                expect(actual).to.containSubset({
                    y: 0x53,
                    status: {
                        zero: false
                    }
                })
            })

            it('should set the carry flag if the y register is greater than the parameter', () => {
                const actual = testOperation(cpy(), { y: 0x53 }, { carry: false }, 0x52)

                expect(actual).to.containSubset({
                    y: 0x53,
                    status: {
                        carry: true
                    }
                })
            })

            it('should clear the carry flag if the y register is less than the parameter', () => {
                const actual = testOperation(cpy(), { y: 0x53 }, { carry: true }, 0x54)

                expect(actual).to.containSubset({
                    y: 0x53,
                    status: {
                        carry: false
                    }
                })
            })

            it('should set the negative flag if the y register is less than the parameter', () => {
                const actual = testOperation(cpy(), { y: 0x53 }, { negative: false }, 0x54)

                expect(actual).to.containSubset({
                    y: 0x53,
                    status: {
                        negative: true
                    }
                })
            })

            it('should clear the negative flag if the y register is greater than the parameter', () => {
                const actual = testOperation(cpy(), { y: 0x55 }, { negative: true }, 0x54)

                expect(actual).to.containSubset({
                    y: 0x55,
                    status: {
                        negative: false
                    }
                })
            })
        })
    })
})
