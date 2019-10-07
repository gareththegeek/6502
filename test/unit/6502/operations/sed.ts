import sed from '../../../../src/6502/pure/operations/sed'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('sed', () => {
            it('should set decimal flag without affecting other state', () => {
                const actual = testOperation(sed(), {}, { decimal: false }, 0x00)

                expect(actual).to.containSubset({
                    status: {
                        decimal: true
                    }
                })
            })
        })
    })
})
