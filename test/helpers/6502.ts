import { I6502System, build6502system } from "./factories"
import IRangedComponent from "../../src/rangedcomponent/irangedcomponent"
import { expect } from "chai"

export const initialiseSystem = (system: I6502System): void => {
    system.cpu.reset()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
    system.cpu.clock()
}

export const loadRom = (rom: IRangedComponent, program: Array<number>): void => {
    const data = [...program, ...(new Array(0xfc - program.length).fill(0)), 0x00, 0xff]
    rom.initialise(data)
}

export const loadMemory = (memory: IRangedComponent, data: Array<number>): void => {
    data.forEach((byte, index) => memory.write({ address: memory.range.from + index, value: byte }))
}

export interface ITestProgram {
    name: string,
    instructionCount: number,
    program: Array<number>,
    memory?: Array<number>,
    zeroPage?: Array<number>,
    expectation: object
}

export const testProgram = (program: ITestProgram): void => {
    const system = build6502system()
    system.memory.initialise(0x1)
    system.zeroPage.initialise(0x1)
    if (program.memory) {
        loadMemory(system.memory, program.memory)
    }
    if (program.zeroPage) {
        loadMemory(system.zeroPage, program.zeroPage)
    }
    loadRom(system.rom, program.program)
    initialiseSystem(system)

    for (let i = 0; i < program.instructionCount; i++) {
        system.cpu.clock()
        while (system.cpu.store.state.cycles > 0) {
            system.cpu.clock()
        }
    }
    expect(system.cpu.store.state).to.containSubset(program.expectation)
}
