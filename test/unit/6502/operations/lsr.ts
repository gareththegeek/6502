import lsr from "../../../../src/6502/pure/operations/lsr"
import { testOperation } from "../../../helpers/6502"
import * as chai from "chai"
import * as chaiSubset from 'chai-subset'
chai.use(chaiSubset)
const expect = chai.expect

describe('Unit', () => {
    describe('6502', () => {
        describe('lsr', () => {
            it('should shift data right one bit with lost bit going into carry flag', () => {
                const actual = testOperation(lsr(), {}, {}, 0x55)
                
                expect(actual).to.containSubset({
                    a: 0x2a,
                    status: {
                        negative: false,
                        zero: false,
                        carry: true
                    }
                })
            })
        })
    })
})
