import * as chai from 'chai'
import write from '../../../src/rangedcomponent/pure/write'
import sinon = require('sinon')
import * as sinonChai from 'sinon-chai'
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('rangedComponent', () => {
        describe('write', () => {
            ;[0x9f, 0x111].forEach(address =>
                it(`should not write if address is outside wrapped component's address range (${address})`, () => {
                    const writeStub = sinon.stub()
                    const range = { from: 0x100, to: 0x110 }
                    const previous = {
                        value: 1,
                        read: true,
                        write: true
                    }
                    const props = { address, value: 7 }

                    const uut = write(range, writeStub)
                    const actual = uut(previous, props)

                    expect(actual.value).to.be.null
                    expect(actual.read).to.be.false
                    expect(actual.write).to.be.false
                    expect(writeStub).not.to.have.been.called
                })
            )
                ;[0x100, 0x10a, 0x110].forEach(address =>
                    it(`should return wrapped component's write result if address inside range (${address})`, () => {
                        const writeStub = sinon.stub()
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
                        writeStub.returns(expected)
                        const props = { address, value: 23 }

                        const uut = write(range, writeStub)
                        const actual = uut(previous, props)

                        expect(actual).to.be.deep.equal(expected)
                        expect(writeStub).to.have.been.calledWith(props)
                    })
                )
        })
    })
})
