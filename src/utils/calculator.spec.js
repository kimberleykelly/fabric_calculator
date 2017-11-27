const expect = require('chai').expect
import calculate, { roundTape, getFolds, romanBlindTape } from './calculator'

const objToVals = obj => Object.keys(obj).map(key => obj[key])

describe('roundTape', () => {
    describe('pencil', () => {
        it('values lower than 3 will return 3', () => {
            expect(roundTape(1.2, 'pencil')).to.be.equal(3)
            expect(roundTape(2.2, 'pencil')).to.be.equal(3)
        })
        it('values round up to 1.5 multiples starting from 3', () => {
            expect(roundTape(5.1, 'pencil')).to.be.equal(4.5)
            expect(roundTape(5.7, 'pencil')).to.be.equal(6)
            expect(roundTape(12.4, 'pencil')).to.be.equal(12)
        })
    })
})

describe('calculator', () => {
    it('will calculate amount needed in inches', () => {
        const vals = {
            width: 90, 
            length: 90, 
            pattern: 25, 
            tape: null,
            unit: 'inch',
        }
        const res = calculate(...objToVals(vals))
        expect(res).to.be.eql({
            fabric: '10.2',
            lining: '10.2',
            tape: null
        })
    })
    it('will do convert cm units to inches', () => {
        const vals = {
            width: 228, 
            length: 228, 
            pattern: 63.5, 
            tape: null,
            unit: 'cm',
        }
        const res = calculate(...objToVals(vals))
        expect(res).to.be.eql({
            fabric: '10.2',
            lining: '10.2',
            tape: null
        })
    })
    describe('with tapes', () => {
        it('pencil', () => {
            const vals = {
                width: 90, 
                length: 90, 
                pattern: 25, 
                tape: 'pencil',
                unit: 'inch',
            }
            const res = calculate(...objToVals(vals))
            expect(res).to.be.eql({
                fabric: '10.2',
                lining: '10.2',
                tape: 6
            })
        })
        it('pinch', () => {
            const vals = {
                width: 90, 
                length: 90, 
                pattern: 25, 
                tape: 'pinch',
                unit: 'inch',
            }
            const res = calculate(...objToVals(vals))
            expect(res).to.be.eql({
                fabric: '12.7',
                lining: '12.7',
                tape: 7.5
            })
        })
        it('roman blinds', () => {
            const vals = {
                width: 54, 
                length: 60, 
                pattern: 7, 
                tape: 'roman',
                unit: 'inch',
            }
            const res = calculate(...objToVals(vals))
            expect(res).to.be.eql({
                fabric: '3.6',
                lining: '3.6',
                tape: 22.2,
            })
        })
    })
    describe('getFolds()', () => {
        it('Should round to the nearst decimal once divided by 10', () => {
            expect(getFolds(54)).to.equal(5)
            expect(getFolds(56)).to.equal(6)
            expect(getFolds(16)).to.equal(2)
            expect(getFolds(15)).to.equal(2)
            expect(getFolds(14)).to.equal(1)
        })
    })
    describe('romanBlindTape', () => {
        it('Should give blind tape in meters', () => {
            expect(romanBlindTape(54, 60)).to.equal(870)
        })
    })
})