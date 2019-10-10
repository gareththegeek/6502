import highByte from "./highByte";

export default (base: number, relative: number) =>
    highByte(base) !== highByte(base + relative)