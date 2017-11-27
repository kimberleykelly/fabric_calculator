const capitalize = str => str.replace(/^\w/g, i => i.toUpperCase())
export default results => ['fabric', 'lining', 'tape']
    .map(val => `<p>${capitalize(val)} is ${results[val]} meters</p>`).join('')