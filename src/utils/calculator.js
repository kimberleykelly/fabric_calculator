const fabricWidth = 54
const cmToInchConversion = 2.54

const widthOfFabric = unit => unit === 'inch' ? 54 : Math.floor(inchTocm(54))
const inchTocm = inch => inch * cmToInchConversion
const cmToinch = cm => cm / cmToInchConversion

function getPatternMatch(length, pattern, tape) {
    const hem = tape === 'roman' ? 6 : 9    
    const trueLength = length + hem
    return (!pattern) ? trueLength : Math.ceil(trueLength / pattern) * pattern
}
const pencil = val => {
    const half = 1.5 / 2
    const remainder = val % 1.5
    const roundUp = remainder >= half
    const flat = val - remainder
    return roundUp ? flat + 1.5 : flat
}

const tapes = {
    pencil,
    eye: pencil,
    pinch: pencil,
}

export const getFolds = (width) => Math.round(width / 10)

export const roundTape = (val, tape) => (val < 3) ? 3 : tapes[tape](val)

export const romanBlindTape = (width, length) => {
    const folds = getFolds(width)
    return (width + length + length) * folds
}

const tapeMultiplyer = (width, tape) => {
    const m = tape === 'pinch' ? 2.5 : 2
    return width * m
}

const fabricMultiplyer = (width, tape) => (tape === 'roman') ? width + 4 : tapeMultiplyer(width, tape)

const widthMultiplyer = tape => tape === 'pinch' ? 2.5 : 2

const widthAmt = (width) => Math.ceil(width / fabricWidth)

const getTape = (width, length, tape) => {
    if (!tape) return null
    if (tape === 'roman') return Math.ceil((romanBlindTape(width, length) / 39.3) * 10) / 10
    return roundTape((widthAmt(tapeMultiplyer(width, tape)) * fabricWidth) / 39.3, tape)
}

const adjustWidth = (width, tape) => {
    if (tape === 'roman') width + 4 
    return width
}

const calculate = (width, length, pattern, tapeM, unit) => {
    const [w, l, p] = [width, length, pattern]
        .map(val => unit === 'cm' ? cmToinch(val) : val)
    const fabric = (getPatternMatch(l, p, tapeM) * widthAmt(fabricMultiplyer(w, tapeM)) / 39.3).toFixed(1)
    const tape = getTape(w, l, tapeM)
    return {
        fabric,
        lining: fabric,
        tape,
    }
}

export default calculate