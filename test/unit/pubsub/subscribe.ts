import { expect } from 'chai'
import subscribe from '../../../src/pubsub/pure/subscribe'
import factory from '../../../src/pubsub/state/factory'

describe('pubsub.subscribe', () => {
    it('should add a subscription for the specified message type', () => {
        const messageType = 'TEST_MESSAGE'
        const state = factory()
        const expected = (): { foo: string } => ({ foo: 'bar' })

        const actual = subscribe()(state, messageType, expected)

        expect(actual.subscriptions).to.not.be.null
        expect(Object.keys(actual.subscriptions).length).to.be.equal(1)
        expect(actual.subscriptions[messageType].length).to.be.equal(1)
        expect(actual.subscriptions[messageType][0]).to.be.equal(expected)
    })

    it('should preserve existing subscriptions for the specified message type', (): void => {
        const messageType = 'TEST_MESSAGE'
        const existing = (): { foo: string } => ({ foo: 'notbar' })
        const state = {
            subscriptions: {
                TEST_MESSAGE: [existing]
            }
        }
        const expected = (): { foo: string } => ({ foo: 'bar' })

        const actual = subscribe()(state, messageType, expected)

        expect(actual.subscriptions).to.not.be.null
        expect(Object.keys(actual.subscriptions).length).to.be.equal(1)
        expect(actual.subscriptions[messageType].length).to.be.equal(2)
        expect(actual.subscriptions[messageType].includes(expected)).to.be.true
        expect(actual.subscriptions[messageType].includes(existing)).to.be.true
    })

    it('should not mutate previous subscription state', () => {
        const messageType = 'TEST_MESSAGE'
        const existing = (): { foo: string } => ({ foo: 'notbar' })
        const state = {
            subscriptions: {
                TEST_MESSAGE: [existing]
            }
        }
        const unexpected = (): { foo: string } => ({ foo: 'bar' })

        subscribe()(state, messageType, unexpected)

        expect(state.subscriptions).to.not.be.null
        expect(Object.keys(state.subscriptions).length).to.be.equal(1)
        expect(state.subscriptions[messageType].length).to.be.equal(1)
        expect(state.subscriptions[messageType].includes(existing)).to.be.true
        expect(state.subscriptions[messageType].includes(unexpected)).to.be.false
    })

    it('should support multiple message type subscriptions', () => {
        const messageType1 = 'TEST_MESSAGE_1'
        const messageType2 = 'TEST_MESSAGE_2'
        const existing = (): { foo: string } => ({ foo: 'notbar' })
        const state = {
            subscriptions: {
                TEST_MESSAGE_1: [existing]
            }
        }
        const expected = (): { foo: string } => ({ foo: 'bar' })

        const actual = subscribe()(state, messageType2, expected)

        expect(actual.subscriptions).to.not.be.null
        expect(Object.keys(actual.subscriptions).length).to.be.equal(2)
        expect(actual.subscriptions[messageType1].length).to.be.equal(1)
        expect(actual.subscriptions[messageType1][0]).to.be.equal(existing)
        expect(actual.subscriptions[messageType2].length).to.be.equal(1)
        expect(actual.subscriptions[messageType2][0]).to.be.equal(expected)
    })
})
