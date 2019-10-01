import IBus from '../../bus/ibus'
import { TFetchInstruction } from '../typings'
import IInstruction from '../state/iinstruction'
import Instruction from '../state/instruction'

const INSTRUCTION_TABLE: { [opcode: number]: IInstruction } = {
    0x00: new Instruction(0x00, 'BRK', 'Implied', 1, 7),
    0x01: new Instruction(0x01, 'ORA', '(IND,X)', 2, 6),
    0x05: new Instruction(0x05, 'ORA', 'ZP', 2, 3),
    0x06: new Instruction(0x06, 'ASL', 'ZP', 2, 5),
    0x08: new Instruction(0x08, 'PHP', 'Implied', 1, 3),
    0x09: new Instruction(0x09, 'ORA', 'IMM', 2, 2),
    0x0a: new Instruction(0x0a, 'ASL', 'Accum', 1, 2),
    0x0d: new Instruction(0x0d, 'ORA', 'ABS', 3, 4),
    0x0e: new Instruction(0x0e, 'ASL', 'ABS', 3, 6),
    0x10: new Instruction(0x10, 'BPL', 'Relative', 2, 2, false, true),
    0x11: new Instruction(0x11, 'ORA', '(IND),Y', 2, 5, true),
    0x15: new Instruction(0x15, 'ORA', 'ZP,X', 2, 4),
    0x16: new Instruction(0x16, 'ASL', 'ZP,X', 2, 6),
    0x18: new Instruction(0x18, 'CLC', 'Implied', 1, 2),
    0x19: new Instruction(0x19, 'ORA', 'ABS,Y', 3, 4, true),
    0x1d: new Instruction(0x1d, 'ORA', 'ABS,X', 3, 4, true),
    0x1e: new Instruction(0x1e, 'ASL', 'ABS,X', 3, 7),
    0x20: new Instruction(0x20, 'JSR', 'Absolute', 3, 6),
    0x21: new Instruction(0x21, 'AND', '(IND,X)', 2, 6),
    0x24: new Instruction(0x24, 'BIT', 'ZP', 2, 3),
    0x25: new Instruction(0x25, 'AND', 'ZP', 2, 3),
    0x26: new Instruction(0x26, 'ROL', 'ZP', 2, 5),
    0x28: new Instruction(0x28, 'PLP', 'Implied', 1, 4),
    0x29: new Instruction(0x29, 'AND', 'IMM', 2, 2),
    0x2a: new Instruction(0x2a, 'ROL', 'Accum', 1, 2),
    0x2c: new Instruction(0x2c, 'BIT', 'ABS', 3, 4),
    0x2d: new Instruction(0x2d, 'AND', 'ABS', 3, 4),
    0x2e: new Instruction(0x2e, 'ROL', 'ABS', 3, 6),
    0x30: new Instruction(0x30, 'BMI', 'Relative', 2, 2, false, true),
    0x31: new Instruction(0x31, 'AND', '(IND),Y', 2, 5, true),
    0x35: new Instruction(0x35, 'AND', 'ZP,X', 2, 4),
    0x36: new Instruction(0x36, 'ROL', 'ZP,X', 2, 6),
    0x38: new Instruction(0x38, 'SEC', 'Implied', 1, 2),
    0x39: new Instruction(0x39, 'AND', 'ABS,Y', 3, 4, true),
    0x3d: new Instruction(0x3d, 'AND', 'ABS,X', 3, 4, true),
    0x3e: new Instruction(0x3e, 'ROL', 'ABS,X', 3, 7),
    0x40: new Instruction(0x40, 'RTI', 'Implied', 1, 6),
    0x41: new Instruction(0x41, 'EOR', '(IND,X)', 2, 6),
    0x45: new Instruction(0x45, 'EOR', 'ZP', 2, 3),
    0x46: new Instruction(0x46, 'LSR', 'ZP', 2, 5),
    0x48: new Instruction(0x48, 'PHA', 'Implied', 1, 3),
    0x49: new Instruction(0x49, 'EOR', 'IMM', 2, 2),
    0x4a: new Instruction(0x4a, 'LSR', 'Accum', 1, 2),
    0x4c: new Instruction(0x4c, 'JMP', 'ABS', 3, 3),
    0x4d: new Instruction(0x4d, 'EOR', 'ABS', 3, 4),
    0x4e: new Instruction(0x4e, 'LSR', 'ABS', 3, 6),
    0x50: new Instruction(0x50, 'BVC', 'Relative', 2, 2, false, true),
    0x51: new Instruction(0x51, 'EOR', '(IND),Y', 2, 5, true),
    0x55: new Instruction(0x55, 'EOR', 'ZP,X', 2, 4),
    0x56: new Instruction(0x56, 'LSR', 'ZP,X', 2, 6),
    0x58: new Instruction(0x58, 'CLI', 'Implied', 1, 2),
    0x59: new Instruction(0x59, 'EOR', 'ABS,Y', 3, 4, true),
    0x5d: new Instruction(0x5d, 'EOR', 'ABS,X', 3, 4, true),
    0x5e: new Instruction(0x5e, 'LSR', 'ABS,X', 3, 7),
    0x60: new Instruction(0x60, 'RTS', 'Implied', 1, 6),
    0x61: new Instruction(0x61, 'ADC', '(IND,X)', 2, 6),
    0x65: new Instruction(0x65, 'ADC', 'ZP', 2, 3),
    0x66: new Instruction(0x66, 'ROR', 'ZP', 2, 5),
    0x68: new Instruction(0x68, 'PLA', 'Implied', 1, 4),
    0x69: new Instruction(0x69, 'ADC', 'IMM', 2, 2),
    0x6a: new Instruction(0x6a, 'ROR', 'Accum', 1, 2),
    0x6c: new Instruction(0x6c, 'JMP', 'Indirect', 3, 5),
    0x6d: new Instruction(0x6d, 'ADC', 'ABS', 3, 4),
    0x6e: new Instruction(0x6e, 'ROR', 'ABS', 3, 6),
    0x70: new Instruction(0x70, 'BVS', 'Relative', 2, 2, false, true),
    0x71: new Instruction(0x71, 'ADC', '(IND),Y', 2, 5, true),
    0x75: new Instruction(0x75, 'ADC', 'ZP,X', 2, 4),
    0x76: new Instruction(0x76, 'ROR', 'ZP,X', 2, 6),
    0x78: new Instruction(0x78, 'SEI', 'Implied', 1, 2),
    0x79: new Instruction(0x79, 'ADC', 'ABS,Y', 3, 4, true),
    0x7d: new Instruction(0x7d, 'ADC', 'ABS,X', 3, 4, true),
    0x7e: new Instruction(0x7e, 'ROR', 'ABS,X', 3, 7),
    0x81: new Instruction(0x81, 'STA', '(IND,X)', 2, 6),
    0x84: new Instruction(0x84, 'STY', 'ZP', 2, 3),
    0x85: new Instruction(0x85, 'STA', 'ZP', 2, 3),
    0x86: new Instruction(0x86, 'STX', 'ZP', 2, 3),
    0x88: new Instruction(0x88, 'DEY', 'Implied', 1, 2),
    0x8a: new Instruction(0x8a, 'TXA', 'Implied', 1, 2),
    0x8c: new Instruction(0x8c, 'STY', 'ABS', 3, 4),
    0x8d: new Instruction(0x8d, 'STA', 'ABS', 3, 4),
    0x8e: new Instruction(0x8e, 'STX', 'ABS', 3, 4),
    0x90: new Instruction(0x90, 'BCC', 'Relative', 2, 2, false, true),
    0x91: new Instruction(0x91, 'STA', '(IND),Y', 2, 6),
    0x94: new Instruction(0x94, 'STY', 'ZP,X', 2, 4),
    0x95: new Instruction(0x95, 'STA', 'ZP,X', 2, 4),
    0x96: new Instruction(0x96, 'STX', 'ZP,Y', 2, 4),
    0x98: new Instruction(0x98, 'TYA', 'Implied', 1, 2),
    0x99: new Instruction(0x99, 'STA', 'ABS,Y', 3, 5),
    0x9a: new Instruction(0x9a, 'TXS', 'Implied', 1, 2),
    0x9d: new Instruction(0x9d, 'STA', 'ABS,X', 3, 5),
    0xa0: new Instruction(0xa0, 'LDY', 'IMM', 2, 2),
    0xa1: new Instruction(0xa1, 'LDA', '(IND,X)', 2, 6),
    0xa2: new Instruction(0xa2, 'LDX', 'IMM', 2, 2),
    0xa4: new Instruction(0xa4, 'LDY', 'ZP', 2, 3),
    0xa5: new Instruction(0xa5, 'LDA', 'ZP', 2, 3),
    0xa6: new Instruction(0xa6, 'LDX', 'ZP', 2, 3),
    0xa8: new Instruction(0xa8, 'TAY', 'Implied', 1, 2),
    0xa9: new Instruction(0xa9, 'LDA', 'IMM', 2, 2),
    0xaa: new Instruction(0xaa, 'TAX', 'Implied', 1, 2),
    0xac: new Instruction(0xac, 'LDY', 'ABS', 3, 4),
    0xad: new Instruction(0xad, 'LDA', 'ABS', 3, 4),
    0xae: new Instruction(0xae, 'LDX', 'ABS', 3, 4),
    0xb0: new Instruction(0xb0, 'BCS', 'Relative', 2, 2, false, true),
    0xb1: new Instruction(0xb1, 'LDA', '(IND),Y', 2, 5, true),
    0xb4: new Instruction(0xb4, 'LDY', 'ZP,X', 2, 4),
    0xb5: new Instruction(0xb5, 'LDA', 'ZP,X', 2, 4),
    0xb6: new Instruction(0xb6, 'LDX', 'ZP,Y', 2, 4),
    0xb8: new Instruction(0xb8, 'CLV', 'Implied', 1, 2),
    0xb9: new Instruction(0xb9, 'LDA', 'ABS,Y', 3, 4, true),
    0xba: new Instruction(0xba, 'TSX', 'Implied', 1, 2),
    0xbc: new Instruction(0xbc, 'LDY', 'ABS,X', 3, 4, true),
    0xbd: new Instruction(0xbd, 'LDA', 'ABS,X', 3, 4, true),
    0xbe: new Instruction(0xbd, 'LDX', 'ABS,Y', 3, 4, true),
    0xc0: new Instruction(0xc0, 'CPY', 'IMM', 2, 2),
    0xc1: new Instruction(0xc1, 'CMP', '(IND,X)', 2, 6),
    0xc4: new Instruction(0xc4, 'CPY', 'ZP', 2, 3),
    0xc5: new Instruction(0xc5, 'CMP', 'ZP', 2, 3),
    0xc6: new Instruction(0xc6, 'DEC', 'ZP', 2, 5),
    0xc8: new Instruction(0xc8, 'INY', 'Implied', 1, 2),
    0xc9: new Instruction(0xc9, 'CMP', 'IMM', 2, 2),
    0xca: new Instruction(0xca, 'DEX', 'Implied', 1, 2),
    0xcc: new Instruction(0xcc, 'CPY', 'ABS', 3, 4),
    0xcd: new Instruction(0xcd, 'CMP', 'ABS', 3, 4),
    0xce: new Instruction(0xce, 'DEC', 'ABS', 3, 6),
    0xd0: new Instruction(0xd0, 'BNE', 'Relative', 2, 2, false, true),
    0xd1: new Instruction(0xd1, 'CMP', '(IND),Y', 2, 5, true),
    0xd5: new Instruction(0xd5, 'CMP', 'ZP,X', 2, 4),
    0xd6: new Instruction(0xd6, 'DEC', 'ZP,X', 2, 6),
    0xd8: new Instruction(0xd8, 'CLD', 'Implied', 1, 2),
    0xd9: new Instruction(0xd9, 'CMP', 'ABS,Y', 3, 4, true),
    0xdd: new Instruction(0xdd, 'CMP', 'ABS,X', 3, 4, true),
    0xde: new Instruction(0xde, 'DEC', 'ABS,X', 3, 7),
    0xe0: new Instruction(0xe0, 'CPX', 'IMM', 2, 2),
    0xe1: new Instruction(0xe1, 'SBC', '(IND,X)', 2, 6),
    0xe4: new Instruction(0xe4, 'CPX', 'ZP', 2, 3),
    0xe5: new Instruction(0xe5, 'SBC', 'ZP', 2, 3),
    0xe6: new Instruction(0xe6, 'INC', 'ZP', 2, 5),
    0xe8: new Instruction(0xe8, 'INX', 'Implied', 1, 2),
    0xe9: new Instruction(0xe9, 'SBC', 'IMM', 2, 2),
    0xea: new Instruction(0xea, 'NOP', 'Implied', 1, 2),
    0xec: new Instruction(0xec, 'CPX', 'ABS', 3, 4),
    0xed: new Instruction(0xed, 'SBC', 'ABS', 3, 4),
    0xee: new Instruction(0xee, 'INC', 'ABS', 3, 6),
    0xf0: new Instruction(0xf0, 'BEQ', 'Relative', 2, 2, false, true),
    0xf1: new Instruction(0xf1, 'SBC', '(IND),Y', 2, 5, true),
    0xf5: new Instruction(0xf5, 'SBC', 'ZP,X', 2, 4),
    0xf6: new Instruction(0xf6, 'INC', 'ZP,X', 2, 6),
    0xf8: new Instruction(0xf8, 'SED', 'Implied', 1, 2),
    0xf9: new Instruction(0xf9, 'SBC', 'ABS,Y', 3, 4, true),
    0xfd: new Instruction(0xfd, 'SBC', 'ABS,X', 3, 4, true),
    0xfe: new Instruction(0xfe, 'INC', 'ABS,X', 3, 7)
}

export default (): TFetchInstruction => (bus: IBus, address: number): IInstruction => {
    const opcode = bus.read({ address })

    if (!(opcode in INSTRUCTION_TABLE)) {
        return INSTRUCTION_TABLE[0x00]
    }

    return INSTRUCTION_TABLE[opcode]
}
