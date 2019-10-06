export default (unsigned: number): number =>{
    return (unsigned >= 0x80) ? unsigned - 0x100 : unsigned
}