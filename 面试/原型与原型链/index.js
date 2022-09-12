/**
 * 掌握名称对应和它们的从属关系
 */
/** 
 * 对应名称
 * prototype:原型
 * __proto__:原型链(链接点)
 * 
 * 从属关系
 * prototype -> 函数的一个属性：对象{}
 * __proto__ -> 对象Object的一个属性：对象{}
 * 
 * 对象的__proto__保存着该对象的构造函数的prototype。
 */

/**
 * 证明从属关系与原型链的基本认识
 */
function Test() {
    this.a = 1;
    this.b = 333;
}
console.log(Test.prototype);

Test.prototype.a = 7;
Test.prototype.b = 2;
Test.prototype.c = 6;


const test = new Test();
console.log(test.__proto__);

console.log(test.__proto__ === Test.prototype);

//Test.prototype => {__proto__}
console.log(Test.prototype.__proto__ === Object.prototype);
console.log(Object.prototype.__proto__); //null

Object.prototype.c = 3;
console.log(test);

/**
 * 深入认识原型链、原型与原型链的继承
 */
/** 外层有，先取外层的，外层无再看里层的
 * __proto__ 像一个链接点。。
 * test {
 *  a:1,
 *  b:333
 * __proto__:Test.prototype = {
 *     a:7
 *     b:2
 *     c:6
 *  __proto__:Object.prototype = {
 *          c:3
 *          x __proto__
 *      }
 *    }
 * }
 */

console.log(test.a); //1
console.log(test.b); //333
console.log(test.c); //6

/**
 * Function与Object的特殊性
 */
//Function Object : 函数 对象
//注意：Object是对象类型{}   object泛指所有引用类型的值
console.log(Test.__proto__ === Function.prototype);

// const Test = new Function()
console.log(Function.__proto__);
console.log(Function.prototype);
console.log(Function.__proto__ === Function.prototype);

// const obj = {};
// const obj = new Object();  //function

console.log(typeof Object);
console.log(Object.__proto__ === Function.prototype);
console.log(Object.__proto__ === Function.__proto__);

/**
 * 判断属性是否存在的方法
 */
console.log('----------------');
//hashOwnProperty:指自己本身具有的属性，不是原生链上的
console.log(test.hasOwnProperty('a'));
console.log(test.hasOwnProperty('b'));
console.log(test.hasOwnProperty('c')); //false

console.log('----------------');
// in 来判断其是否是其原生链上的属性
console.log('a' in test);
console.log('b' in test);
console.log('c' in test);

/**
 * constructor 与实例直接的关系和特性。
 * 可以更改自身的构造函数
 */
//test.constructor -> 实例化test对象的构造函数
console.log(test.constructor === Test);

function Test1() {
    this.a = 111;
}
//更改test的构造函数
test.constructor = Test1;
console.log(test);



