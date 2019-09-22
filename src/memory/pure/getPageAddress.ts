import { TGetPageAddress } from '../typings'

export default (): TGetPageAddress => (address: number): number => address & 0xff
