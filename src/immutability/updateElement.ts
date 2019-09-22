export default <T>(array: Array<T>, index: number, value: T) =>
    array.map((item, idx) => {
        if (idx === index) {
            return value
        }
        return item
    })
