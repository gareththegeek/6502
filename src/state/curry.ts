/*eslint @typescript-eslint/no-explicit-any: "off"*/
export default (pure: any, ...curryargs: any[]) => (...args: any): any => {
    return pure(...curryargs.concat(args))
}
