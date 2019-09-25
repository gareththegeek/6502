export default (pure: any, ...curryargs: any[]) => (...args: any) => {
    return pure(...curryargs.concat(args))
}
