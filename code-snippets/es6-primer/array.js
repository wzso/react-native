// 数组的扩展
/*
1. Array.from()
2. Array.of()
3. 数组实例的copyWithin()
4. 数组实例的find()和findIndex()
5. 数组实例的fill()
6. 数组实例的entries()，keys()和values()
7. 数组实例的 includes()
8. 数组的空位
*/

///////////////////////////////////////////
/////////////////////////// 1. Array.from()
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）
// 和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
{
    let arrayLike = {
        0: 'shh',
        1: 'bluemix',
        2: 'zip',
        3: 23,
        4: 'sleeply head',
        'length': 5 // 必须要有 length 这个key
    }
    let a = Array.from(arrayLike)
    console.log(a) // [ 'shh', 'bluemix', 'zip', 23, 'sleeply head' ]

    let arrayLike2 = {
        '0': 'shh',
        '1': 'bluemix',
        '2': 'zip',
        '3': 23,
        'length': 5 // 元素个数不够，用 undefine 填充；元素个数较多，则丢弃后面多余的
    }
    let a2 = Array.from(arrayLike2)
    console.log(a2) // [ 'shh', 'bluemix', 'zip', 23, undefined ]
}

{
    // ES5的写法
    function f(x, y, z) {  
        // ...
        console.log(x, y, z)
    }
    var args = [0, 1, 2]
    f.apply(null, args) // 0 1 2

    // es6, spread ... 将数组打散成逗号分隔的参数序列
    f(...args) // 0 1 2
}