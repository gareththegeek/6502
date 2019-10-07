import clv from '../../../../src/6502/pure/operations/clv'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('clv', () => {
            it('should clear overflow flag without affecting other state', () => {
                const actual = testOperation(clv(), {}, { overflow: true }, 0x00)

                expect(actual).to.containSubset({
                    status: {
                        overflow: false
                    }
                })
            })
        })
    })
})
