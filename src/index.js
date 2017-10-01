import './style.scss'
import calculate from './utils/calculator'

const renderResult = result => document.getElementById('calc-result').innerHTML = result

function calcValue() {
    const inputFields = ['track-or-pole', 'finished-length', 'pattern-repeat', 'heading-tape']
    const [ width, length, pattern, tape ] = inputFields
        .map(id => document.getElementById(id).value)
        .map(val => parseInt(val))

    const unit = document.getElementById('in').checked ? 'inch' : 'cm'

    const result  = calculate(width, length, pattern, tape, unit)
    renderResult(result)
}

window.calcValue = calcValue 