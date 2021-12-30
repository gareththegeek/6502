import * as chai from 'chai'
import initialise from '../../../src/rangedcomponent/pure/initialise'
import sinon = require('sinon')
import * as sinonChai from 'sinon-chai'
import IRangedComponent from '../../../src/rangedcomponent/irangedcomponent'
chai.use(sinonChai)
const expect = chai.expect

describe('Unit', () => {
    describe('rangedComponent', () => {
        describe('initialise', () => {
            it('should call wrapped component initialise', () => {
                const component = {
                    range: { from: 0x2000, to: 0x2100 },
                    component: {} as IRangedComponent,
                    initialise: sinon.stub(),
                    read: sinon.stub(),
                    readRange: sinon.stub(),
                    write: sinon.stub()
                }
                const previous = {
                    value: null as number,
                    read: false,
                    write: false
                }
                const arg0 = 'hello'
                const arg1 = 7

                const uut = initialise(component)
                uut(previous, arg0, arg1)

                expect(component.initialise).to.have.been.calledWith(arg0, arg1)
            })
        })
    })
})
