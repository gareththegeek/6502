import Bus from './bus'
import { factory } from './6502/I6502'
import IState from './6502/state/state'
import Reset from './6502/pure/reset'
import Clock from './6502/pure/clock'
import Irq from './6502/pure/irq'
import Nmi from './6502/pure/nmi'
import Initialise from './6502/pure/initialise'
import FetchInstruction from './6502/pure/fetchInstruction'


function main() {
    // const element = document.createElement('div')

    // element.innerHTML = foo()
    // return element
    const bus = new Bus()
    const fetchInstruction = FetchInstruction()
    const initialise = Initialise()
    const reset = Reset()
    const clock = Clock(initialise, fetchInstruction, bus)
    const irq = Irq()
    const nmi = Nmi()
    
    const cpu = factory(reset, clock, irq, nmi)

    let state: IState = null
    state = cpu.reset(state)
    console.log(state)
    state = cpu.clock(state)
    console.log(state)
    state = cpu.clock(state)
    console.log(state)
}
main()
//document.body.appendChild(component())
