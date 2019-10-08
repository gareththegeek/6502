import toSigned from "../../../src/bitwise/toSigned"
import { expect } from "chai"

describe('Unit', () => {
    describe('bitwise', () => {
        describe('toSigned', () => {
            it('should return positive number if less than 0x80', () => {
                const actual = toSigned(0x79)
                expect(actual).to.be.equal(0x79)
            })

            it('should return negative number if greater than 0x80', () => {
                const actual = toSigned(0x81)
                expect(actual).to.be.equal(-0x7f)
            })

            it('should return negative number if equal to 0x80', () => {
                const actual = toSigned(0x80)
                expect(actual).to.be.equal(-0x80)
            })
        })
    })
})