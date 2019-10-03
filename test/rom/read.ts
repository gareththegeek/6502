import { expect } from "chai"
import read from "../../src/rom/pure/read"

describe('rom.read', () => {
    it('should return data at specified address accounting from addressing range', () => {
        const range = { from: 0x100, to: 0x200 }
        const uut = read(range)
        const expected = 8
        const previous = {
            data: [6, 7, expected, 9],
            value: null as number,
            read: false,
            write: false
        }

        const actual = uut(previous, { address: 0x0102 })

        expect(actual.data).to.deep.equal(previous.data)
        expect(actual.value).to.be.equal(expected)
        expect(actual.read).to.be.true
        expect(actual.write).to.be.false
    })
})