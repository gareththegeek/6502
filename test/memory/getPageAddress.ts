import getPageAddress from '../../src/memory/pure/getPageAddress'
import { expect } from 'chai'

describe('memory.getPageAddress', () => {
    it('should return the lowest byte only', () => {
        const uut = getPageAddress()
        expect(uut(0xff)).to.be.equal(0xff)
        expect(uut(0x01)).to.be.equal(0x01)
        expect(uut(0x100)).to.be.equal(0x00)
        expect(uut(0x123456)).to.be.equal(0x56)
    })
})
