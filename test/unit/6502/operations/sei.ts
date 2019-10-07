import sei from '../../../../src/6502/pure/operations/sei'
import { testOperation } from '../../../helpers/6502'
import * as chai from 'chai'
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('sei', () => {
            it('should set interrupt disable flag without affecting other state', () => {
                const actual = testOperation(sei(), {}, { irqDisable: false }, 0x00)

                expect(actual).to.containSubset({
                    status: {
                        irqDisable: true
                    }
                })
            })
        })
    })
})
