import IRange from './irange'

export default (range: IRange): ((value: number) => boolean) => (value: number): boolean =>
    value >= range.from && value <= range.to
