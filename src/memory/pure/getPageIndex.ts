import { TGetPageIndex } from '../typings'

export default (): TGetPageIndex => (address: number): number => address >> 2
