import { TOperation } from '../../typings'
import brk from './brk'
import adc from './adc'
import and from './and'
import asl from './asl'
import bcc from './bcc'
import beq from './beq'
import bit from './bit'
import bne from './bne'
import bpl from './bpl'
import bvc from './bvc'
import bvs from './bvs'
import clc from './clc'
import cld from './cld'
import cli from './cli'
import clv from './clv'
import cpx from './cpx'
import cpy from './cpy'
import cmp from './cmp'
import dec from './dec'
import dex from './dex'
import dey from './dey'
import eor from './eor'
import inc from './inc'
import inx from './inx'
import iny from './iny'
import jmp from './jmp'
import jsr from './jsr'
import lda from './lda'
import ldx from './ldx'
import ldy from './ldy'
import lsr from './lsr'
import nop from './nop'
import ora from './ora'
import php from './php'
import rol from './rol'
import ror from './ror'
import rti from './rti'
import rts from './rts'
import sbc from './sbc'
import sec from './sec'
import sed from './sed'
import sei from './sei'
import sta from './sta'
import stx from './stx'
import sty from './sty'
import tax from './tax'
import tay from './tay'
import tsx from './tsx'
import txa from './txa'
import txs from './txs'
import tya from './tya'

export const OPERATION_TABLE: { [mnemonic: string]: TOperation } = {
    adc: adc(),
    and: and(),
    asl: asl(),
    bcc: bcc(),
    beq: beq(),
    bit: bit(),
    bne: bne(),
    bpl: bpl(),
    brk: brk(),
    bvc: bvc(),
    bvs: bvs(),
    clc: clc(),
    cld: cld(),
    cli: cli(),
    clv: clv(),
    cmp: cmp(),
    cpx: cpx(),
    cpy: cpy(),
    dec: dec(),
    dex: dex(),
    dey: dey(),
    eor: eor(),
    inc: inc(),
    inx: inx(),
    iny: iny(),
    jmp: jmp(),
    jsr: jsr(),
    lda: lda(),
    ldx: ldx(),
    ldy: ldy(),
    lsr: lsr(),
    nop: nop(),
    ora: ora(),
    php: php(),
    rol: rol(),
    ror: ror(),
    rti: rti(),
    rts: rts(),
    sbc: sbc(),
    sec: sec(),
    sed: sed(),
    sei: sei(),
    sta: sta(),
    stx: stx(),
    sty: sty(),
    tax: tax(),
    tay: tay(),
    tsx: tsx(),
    txa: txa(),
    txs: txs(),
    tya: tya()
}
export default OPERATION_TABLE
