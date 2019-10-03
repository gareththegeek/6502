import * as chai from 'chai'
import read from '../../src/rangedcomponent/pure/read'
import sinon = require('sinon')
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
const expect = chai.expect

describe('rangedComponent.read', () => {
    ;[0x9f, 0x111].forEach(address =>
        it(`should return no read if address is outside wrapped component's address range (${address})`, () => {
            const readStub = sinon.stub()
            const range = { from: 0x100, to: 0x110 }
            const previous = {
                value: 1,
                read: true,
                write: true
            }

            const uut = read(range, readStub)
            const actual = uut(previous, { address })

            expect(actual.value).to.be.null
            expect(actual.read).to.be.false
            expect(actual.write).to.be.false
            expect(readStub).not.to.have.been.called
        })
    )
    ;[0x100, 0x10a, 0x110].forEach(address =>
        it(`should return wrapped component's read result if address inside range (${address})`, () => {
            const readStub = sinon.stub()
            const range = { from: 0x100, to: 0x110 }
            const previous = {
                value: 1,
                read: true,
                write: true
            }
            const expected = {
                value: 23,
                read: true,
                write: false
            }
            readStub.returns(expected)

            const uut = read(range, readStub)
            const actual = uut(previous, { address })

            expect(actual).to.be.deep.equal(expected)
            expect(readStub).to.have.been.calledWith({ address })
        })
    )
})
