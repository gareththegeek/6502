import IState from "../state/istate";
import IBus from "../../bus/ibus";
import lowByte from "../../bitwise/lowByte";
import highByte from "../../bitwise/highByte";
import getStatusByte from "./getStatusByte";
import littleEndian from "../../bitwise/littleEndian";
import getStackAddress from "../../bitwise/getStackAddress";

export default (state: IState, bus: IBus, vector: number, bflag: number): IState => {
    bus.write({ address: getStackAddress(state.sp - 0), value: lowByte(state.pc) })
    bus.write({ address: getStackAddress(state.sp - 1), value: highByte(state.pc) })
    bus.write({ address: getStackAddress(state.sp - 2), value: getStatusByte(state.status) | bflag })
    const lo = bus.read({ address: vector + 0 })
    const hi = bus.read({ address: vector + 1 })
    const pc = littleEndian([lo, hi])
    return {
        ...state,
        pc,
        sp: state.sp - 3,
        status: {
            ...state.status,
            irqDisable: true
        }
    }
}
