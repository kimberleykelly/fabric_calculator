const hem = 9
const fabricWidth = 54
const cmToInchConversion = 2.54

const widthOfFabric = unit => unit === 'inch' ? 54 : Math.floor(inchTocm(54))
const inchTocm = inch => inch * cmToInchConversion
const cmToinch = cm => cm / cmToInchConversion

function getPatternMatch(length, pattern) {
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

export const roundTape = (val, tape) => (val < 3) ? 3 : tapes[tape](val)

const calculate = (width, length, pattern, tapeM, unit) => {
    console.log(width, length, pattern, tapeM, unit)
    const [w, l, p, t] = [width, length, pattern, tapeM]
        .map(val => unit === 'cm' ? cmToinch(val) : val)
    const widthMultiplyer = tapeM === 'pinch' ? 2.5 : 2;
    const widthAmt = Math.ceil(w * widthMultiplyer / fabricWidth)
    const fabric = (getPatternMatch(l, p) * widthAmt / 39.3).toFixed(1)
    const tape = tapeM ? roundTape((widthAmt * fabricWidth) / 39.3, tapeM) : null
    return {
        fabric,
        lining: fabric,
        tape,
    }

}

export default calculate