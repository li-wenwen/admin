let sum = require('./sum');
let sub = require('./sub');
let mul = require('./mul');
let div = require('./div');

console.log(operator(1, 2, '+'));
console.log(operator(1, 2, '-'));
console.log(operator(1, 2, '*'));
console.log(operator(1, 2, '/'));

function operator(num1,num2,ysf) {
    let result = 0
    switch (ysf) {
        case '+':
            result = sum.a(num1,num2);
            break;
        case '-':
            result = sub.b(num1,num2);
            break;
        case '*':
            result = mul.c(num1,num2);
            break;
        case '/':
            result = div.d(num1,num2);
            break;
        default:
            console.log('您的输入有误');
            break;
    }
    return result;
}