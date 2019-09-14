import foo from './another'

function component() {
    const element = document.createElement('div')

    element.innerHTML = foo()
    return element
}

document.body.appendChild(component())
