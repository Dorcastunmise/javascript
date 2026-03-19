import  { formatCurrency } from '../utils/currency.js'

// Basic test cases: to test if the code is working (e.g 2095)
// Edge Cases: testing with tricky values and on the edge of what the code can handle (e.g 0, 2000.5 in this example)

//2095 test case
if (formatCurrency(2095) === '20.95') console.log('2095: passed');
else console.log('2095: failed');

//0 test case
if(formatCurrency(0) === '0.00') console.log('0: passed');
else console.log('0: failed');

//2000.5 test case
if(formatCurrency(2000.5) === '20.01') console.log('2000.5: passed');
else console.log('2000.5: failed');

//2000.4 test case
if(formatCurrency(2000.4) === '20.00') console.log('2000.4: passed');
else console.log('2000.4: failed');


