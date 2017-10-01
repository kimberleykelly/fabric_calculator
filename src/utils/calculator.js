const hem = 9
const fabricWidth = 54

const widthOfFabric = unit => unit === 'inch' ? 54 : Math.floor(inchTocm(54))
const inchTocm = inch => inch * 2.54
const cmToinch = cm => cm / 2.54

function getPatternMatch(length, pattern) {
    const trueLength = length + hem
    return (!pattern) ? trueLength : Math.ceil(trueLength / pattern) * pattern
}

const calculate = (width, length, pattern, tape, unit) => {
    const [w, l, p, t] = [width, length, pattern, tape]
        .map(val => unit === 'cm' ? cmToinch(val) : val)
    const widthAmt = Math.ceil(w * 2 / fabricWidth)
    const result = (getPatternMatch(l, p) * widthAmt / 39.3).toFixed(1)
    return result
}

export default calculate