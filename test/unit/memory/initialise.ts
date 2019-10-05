import initialise from '../../../src/memory/pure/initialise'
import { expect } from 'chai'

describe('Unit', () => {
    describe('memory', () => {
        describe('initialise', () => {
            describe('should create the specified number of 256byte pages', () => {
                const expected = 3
                const uut = initialise()
                const actual = uut(null, expected)

                expect(actual.pages.length).to.be.equal(expected)
                actual.pages.forEach(page => {
                    expect(page.data.length).to.be.equal(0x100)
                    expect(page.data.every(byte => byte === 0)).to.be.true
                })
            })

            describe('should clear bus result state', () => {
                const uut = initialise()

                const actual = uut(null, 1)

                expect(actual.value).to.be.null
                expect(actual.read).to.be.false
                expect(actual.write).to.be.false
            })
        })
    })
})
