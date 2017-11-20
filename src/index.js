import './style.scss'
import calculate from './utils/calculator'

const renderResult = result => document.getElementById('calc-result').innerHTML = ['fabric', 'lining', 'tape'].map(val => `<p>${val} = ${result[val]}</p>`).join('')

function calcValue() {
    const inputFields = ['track-or-pole', 'finished-length', 'pattern-repeat', 'heading-tape']
    const [ width, length, pattern, tape ] = inputFields
        .map(id => document.getElementById(id).value)
        .map(val => val.match(/^[0-9]+$/i) ? parseInt(val) : val)
console.log(width, length, pattern, tape)
    const unit = document.getElementById('in').checked ? 'inch' : 'cm'

    const result  = calculate(width, length, pattern, tape, unit)
    renderResult(result)
}

window.calcValue = calcValue 