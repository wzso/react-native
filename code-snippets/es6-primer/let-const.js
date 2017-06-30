// 'use strict';
//////////// let 和 const 命令
/* 
1. let 命令
2. 块级作用域
3. const 命令
4. 顶层对象的属性
5. global 对象
*/

///////////////////////////////////////////
/////////////////////////////// 1. let 命令

{
    let a = 1;
    var b = 2;
}

// console.log(a) // a is not defined
console.log('var b =', b) // 2
/*
上面代码在代码块之中，分别用let和var声明了两个变量。
然后在代码块之外调用这两个变量，结果let声明的变量报错，
var声明的变量返回了正确的值。这表明，let声明的变量只在它所在的代码块有效。

上面代码中，变量b是var命令声明的，在全局范围内都有效，
所以全局只有一个变量b。
*/

// for循环的计数器，就很合适使用let命令。
for (let i = 0; i < 5; i++) {
    console.log('for-let-i =', i)
}

/*
变量i是var命令声明的，在全局范围内都有效，所以全局只有一个变量i。
每一次循环，变量i的值都会发生改变，而循环内被赋给数组a的函数内部的console.log(i)，
里面的i指向的就是全局的i。
也就是说，所有数组a的成员里面的i，指向的都是同一个i，
导致运行时输出的是最后一轮的i的值，也就是10。
*/
var a1 = []
for (var i = 0; i < 10; i++) {
    // let j = i // 加上这一句就能打印出想要的结果j了
    a1[i] = function () {
        console.log('a1[var-i] =', i)
    }
}
a1[6]() // 10

//
var a2 = []
for (let i = 0; i < 10; i++) {
  a2[i] = function () {
    console.log('a2[let-i] =', i)
  }
}
a2[6]() // 6

// 另外，for循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域。
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log('for-let-i =', i)
}
// abc
// abc
// abc



////////// 变量提升
// var命令会发生”变量提升“现象，即变量可以在声明之前使用，值为undefined。
// 这种现象多多少少是有些奇怪的，按照一般的逻辑，变量应该在声明语句之后才可以使用。
// 为了纠正这种现象，let命令改变了语法行为，它所声明的变量一定要在声明后使用，否则报错。

// var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// let 的情况
//console.log(bar); // 报错ReferenceError
let bar = 2;

////////// 暂时性死区
// 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。


///////////////////////////////////////////
/////////////////////////////// 2. 块级作用域
// ES5 只有全局作用域和函数作用域，没有块级作用域




///////////////////////////////////////////
///////////////////////////// 3. const 命令
// const声明一个只读的常量。一旦声明，常量的值就不能改变。一旦声明，必须初始化。

// const的作用域与let命令相同：只在声明所在的块级作用域内有效。

// const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。
if (true) {
//   console.log(MAX); // ReferenceError
  const MAX = 5;
}

/*
const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址不得改动。
对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，
因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，
保存的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据结构是不是可变的，
就完全不能控制了。因此，将一个对象声明为常量必须非常小心。
*/
{
    const foo = {};
    console.log(typeof foo) // object
    // 为 foo 添加一个属性，可以成功
    foo.a = 123
    foo.b = 22
    console.log(foo.a, foo.b) // 123
    // 将 foo 指向另一个对象，就会报错
    // foo = {}; // TypeError: "foo" is read-only
}

{
    const a = []
    a.push('Hello') // 添加元素，可执行
    a.push("World!") 
    console.log(a) // [ 'Hello', 'World!' ]
    a.length = 1    // 截断数组，可执行
    console.log(a) // [ 'Hello' ]
    // a = ['Dave']    // 报错 // 指针变了
}

// 如果真的想将对象冻结，应该使用Object.freeze方法。
{
    const a = {}
    // Prevents the modification of existing property attributes and values, 
    // and prevents the addition of new properties.
    Object.freeze(a) 
    // 常规模式时，下面一行不起作用；
    // 严格模式时，该行会报错。 延伸：'use strict' 要写在文件中所有代码的前面才有作用
    a.prop = 4
    console.log(a) // {} 或者 报错
}

/// 彻底锁死一个对象
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach( (key, i) => {
        if ( typeof obj[key] === 'object' ) {
            constantize( obj[key] );
        }
    });
};


///////////////////////////////////////////
/////////////////////////// 4. 顶层作用的属性



///////////////////////////////////////////
//////////////////////////// 5. global 对象