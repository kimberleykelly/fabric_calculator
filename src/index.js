import './style.scss'
import calculate from './utils/calculator'
import resultText from './resultText'

const renderResult = results => document.getElementById('calc-result').innerHTML = resultText(results)

function calcValue() {
    const inputFields = ['track-or-pole', 'finished-length', 'pattern-repeat', 'heading-tape']
    const [ width, length, pattern, tape ] = inputFields
        .map(id => document.getElementById(id).value)
        .map(val => val.match(/^[0-9]+$/i) ? parseInt(val) : val)
    const unit = document.getElementById('in').checked ? 'inch' : 'cm'

    const result  = calculate(width, length, pattern, tape, unit)
    renderResult(result)
}

window.calcValue = calcValue 