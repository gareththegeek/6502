export default (target: { [key: string]: any }, injected: (...args: any) => any): { [key: string]: any } => {
    const result: { [key: string]: any } = {}
    Object.keys(target).map(key => (result[key] = (...args: any): any => injected(target[key], ...args)))
    return result
}
