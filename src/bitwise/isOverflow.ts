export default (a: number, b: number, result: number): boolean => {
    return ((a ^ result) & (b ^ result) & 0x80) !== 0x0
}
