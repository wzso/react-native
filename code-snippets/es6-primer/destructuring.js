/*
1. 数组的解构赋值
2. 对象的解构赋值
3. 字符串的解构赋值
4. 数值和布尔值的解构赋值
5. 函数参数的解构赋值
6. 圆括号问题
7. 用途
*/

///////////////////////////////////////////
/////////////////////////// 1. 数组的解构赋值
{
    // 普通做法
    let a = 1
    let b = 2
    let c = 3
    // es6 解构
    let [d, e, f] = [1, 2, 3]
    let [head, ...tail] = [2, 4, 5, 6, 7, 9]
    console.log(head, tail) // 2 [ 4, 5, 6, 7, 9 ]
    let [ , , third, ] = [1, 2, 3, 4]
    console.log(third) // 3
    let [x, y, ...z] = ['a'];
    // 如果结构不成功变量的值为 undefined
    console.log(x, y, z) // a, undefined, []
}

// generator
function* fibs() {  
    let a = 0;  
    let b = 1;  
    while (true) {    
        yield a;    
        [a, b] = [b, a + b];  
    }
}

// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
{
    console.log(fibs(), typeof fibs()) // {}, object
    let [a, b, c, d, e, f] = fibs()
    console.log(a, f) // 0, 5
}

// set 也可以解构
{
    let [x, y, z] = new Set(['a', 'b', 'c'])
    console.log(x)
}

// 默认值
{
    let [a = '1aa'] = [aa] // aa 经过变量提升，成了 undefined
    var aa = 10
    console.log(a) // 16

    {
        let [a = 3] = [null]
        console.log(a) // null
    }
}


///////////////////////////////////////////
/////////////////////////// 2. 对象的解构赋值
// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
{
    console.log(Math, typeof Math) // {}, object
    let {sin, cos, log} = Math
    console.log(sin) // [Function: sin]
}


{
    let x
    // 因为 JavaScript 引擎会将{x}理解成一个代码块，从而发生语法错误。
    // 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题
    ({x} = {x: 2})
    console.log(x)
}

/// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
{
    let arr = [1, 3, 5, 9]
    // 0 旁边的方括号可以省略， [arr.length - 1]的方括号必须要
    let {[0]: a, [arr.length - 1]: b} = arr
}

///////////////////////////////////////////
////////////////////////// 3. 字符串的解构赋值
// 字符串是一种数组
{
    const [a, b, c, d, e] = 'hello'
    // 因为字符串还有个length属性，所以也可以当做对象结构赋值
    let {length : len} = 'hello'
    console.log(a, len)
}


///////////////////////////////////////////
//////////////////// 4. 数值和布尔值的解构赋值
// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
// 由于 undefined 和 null 无法转为对象，所以对它们进行解构赋值，都会报错。
{
    let {toString: a} = 123;
    console.log(a) // [Function: toString]
    console.log(a === Number.prototype.toString) // true
    let {toString: b} = true;
    console.log(b === Boolean.prototype.toString) // true
}


///////////////////////////////////////////
//////////////////////// 5. 函数参数的解构赋值
{
    function add([x, y]) {  
        return x + y
    }
    console.log(add([1, 2])) // 3

    let a = [[1, 2], [3, 4]].map(([a, b]) => a + b);
    console.log(a) // [ 3, 7 ]
}


///////////////////////////////////////////
/////////////////////////////// 6. 圆括号问题
// 一句话，结构赋值时，圆括号能免则免



///////////////////////////////////////////
//////////////////////////////////// 7. 用途
// 交换变量值
{
    let x = 1
    let y = 2; // 这个分号不能省
    [x, y] = [y, x]
    console.log(x, y) // 2, 1
}

// 接收函数返回的多个值
{
    function foo() {
        return [1, 2, 'e']
    }
    let [, , z] = foo()
    console.log(z) // e

    // 返回值为对象
    function bar() {
        return {
            hah: 12,
            blub: 'blub'
        }
    }
    let {hah, blub} = bar()
    console.log(hah, blub) // 12, 'blub'
}

// 函数参数的定义
{
    // 参数是一组有次序的值
    function f1([x, y, z]) {
        console.log(x, y, z)
    }
    f1([1, 2, 3]);

    // 参数是一组无次序的值
    function f2({x, y, z}) {
        console.log(x, y, z)
    }
    f2({z: 3, y: 2, x: 1}) 
}

// 提取JSON数据
{
    let jsonData = {
        id: 123,
        name: 'Richard Blackman',
        albums: ['Bloomberg Dream', 'Dutchman coming']
    }
    let {id, name, albums} = jsonData
    console.log(id, name, albums) // 123 'Richard Blackman' [ 'Bloomberg Dream', 'Dutchman coming' ]
}

// 函数默认参数
{
    /*
    jQuery.ajax = function (url, {  
        async = true,  
        beforeSend = function () {},  
        cache = true,  
        complete = function () {},  
        crossDomain = false,  
        global = true,  
        // ... more config
    }) {  
        // ... do stuff
    };
    */
}

// 遍历map结构
{
    var map = new Map()
    map.set(1, 'hi')
    map.set('second', 2)
    console.log(map) // Map { 1 => 'hi', 'second' => 2 }

    for (let [k, v] of map) {
        console.log(k, v)
    }
    // 1 'hi'
    // second 2

    for (let [k] of map) {
        console.log(k)
    }
    // 1
    // second

    for (let [, v] of map) {
        console.log(v)
    }
    // hi
    // 2
}

// 输入模块的指定方法
{
    // const { SourceMapConsumer, SourceNode } = require("source-map");
}