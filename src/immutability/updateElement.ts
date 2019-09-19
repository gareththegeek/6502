export default (array: Array<any>, index: number, value: any) =>
    array.map((item, idx) => {
        if (idx === index) {
            return value
        }
        return item
    })
