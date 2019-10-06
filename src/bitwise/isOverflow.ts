import boolToByte from "./boolToByte";

export default (a: number, b: number, result: number): boolean => {
    return ((a ^ result) & (b ^ result) & 0x80) !== 0x0
}
//(~(a ^ b) & (a ^ result)) & 0x80