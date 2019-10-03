import { expect } from "chai"
import initialise from "../../src/rom/pure/initialise"

describe('rom.initialise', () => {
    it('should return state containing specified data', () => {
        const previous = {
            data: [0, 1, 2],
            value: 0,
            read: true,
            write: true
        }
        const expected = [3, 4, 5]
        const uut = initialise()
        const actual = uut(previous, expected)

        expect(actual.data).to.deep.equal(expected)
        expect(actual.value).to.be.null
        expect(actual.read).to.be.false
        expect(actual.write).to.be.false
    })
})
