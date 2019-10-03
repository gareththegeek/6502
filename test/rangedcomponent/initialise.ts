import * as chai from "chai"
import initialise from "../../src/rangedcomponent/pure/initialise"
import sinon = require("sinon")
import * as sinonChai from "sinon-chai"
chai.use(sinonChai);
const expect = chai.expect

describe('rangedComponent.initialise', () => {
    it('should ', () => {
        const component = {
            range: { from: 0x2000, to: 0x2100 },
            initialise: sinon.stub(),
            read: sinon.stub(),
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