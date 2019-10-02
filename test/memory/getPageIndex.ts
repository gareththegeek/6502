import getPageIndex from "../../src/memory/pure/getPageIndex"
import { expect } from "chai"

describe('memory.getPageIndex', () => {
    it('should return the highest byte only', () => {
        const uut = getPageIndex()
        expect(uut(0xff)).to.be.equal(0x00)
        expect(uut(0x01)).to.be.equal(0x00)
        expect(uut(0x100)).to.be.equal(0x01)
        expect(uut(0x123456)).to.be.equal(0x1234)
    })
})
