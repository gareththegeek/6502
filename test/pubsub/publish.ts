import * as sinon from 'sinon'
import publish from '../../src/pubsub/pure/publish'
import { expect } from 'chai'

describe('pubsub.publish', () => {
    it('should call all handlers for the specified message type', () => {
        const stubs = [sinon.stub(), sinon.stub()]
        const state = {
            subscriptions: {
                TEST_MESSAGE: stubs
            }
        }
        const message = { foo: 'bar' }

        publish()(state, 'TEST_MESSAGE', message)

        stubs.forEach(stub => {
            expect(stub.called).to.be.true
            expect(stub.calledWith(message)).to.be.true
        })
    })

    it('should not call handlers for other message types', () => {
        const stub = sinon.stub()
        const state = {
            subscriptions: {
                NOT_TEST_MESSAGE: [stub]
            }
        }
        const message = { foo: 'bar' }

        const actual = publish()(state, 'TEST_MESSAGE', message)

        expect(stub.called).to.be.false
        expect(actual).to.be.undefined
    })

    it('should return result of handler if truthy', () => {
        const expected = 7
        const stubs = [sinon.stub(), sinon.stub().returns(expected), sinon.stub()]
        const state = {
            subscriptions: {
                TEST_MESSAGE: stubs
            }
        }
        const message = { foo: 'bar' }

        const actual = publish()(state, 'TEST_MESSAGE', message)

        expect(actual).to.not.be.undefined
        expect(actual).to.be.equal(expected)
    })
})
