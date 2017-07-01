/*
1. 字符的 Unicode 表示法
2. codePointAt()
3. String.fromCodePoint()
4. 字符串的遍历器接口
5. at()
6. normalize()
7. includes(), startsWith(), endsWith()
8. repeat()
9. padStart()，padEnd()
10. 模板字符串
11. 实例：模板编译
12. 标签模板
13. String.raw()
14. 模板字符串的限制
*/

///////////////////////////////////////////
////////////////////// 1. 字符的 Unicode 表示
{
    console.log("\u0061") // a
    // 这种表示法只限于码点在\u0000~\uFFFF之间的字符。超出这个范围的字符，必须用两个双字节的形式表示。
    console.log("\uD842\uDFB7", "\u20BB7") // 𠮷 ₻7
    // 上面代码表示，如果直接在\u后面跟上超过0xFFFF的数值（比如\u20BB7），JavaScript会理解成\u20BB+7。\u20BB是一个不可打印字符。

    // ES6 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符
    console.log("\u{20BB7}") // 𠮷
    console.log("\u{41}\u{42}\u{43}") // ABC
    console.log('\u{1F680}', "===", '\uD83D\uDE80') // 🚀 🚀
    console.log('\u{1F680}' === '\uD83D\uDE80') // true
    console.log("\u{1F680}" === "\uD83D\uDE80") // true
    // 六种表示方法
    console.log('\z' === 'z', '\172' === 'z', '\x7A' === 'z', '\u007A' === 'z', '\u{7A}' === 'z') // true 
    
    console.log('\u{FFFF}') // ￿
}


///////////////////////////////////////////
////////////////////////// 2. codePointAt()
// JavaScript内部，字符以 UTF-16 的格式储存，每个字符固定为2个字节。
// 对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），
// JavaScript会认为它们是两个字符。


///////////////////////////////////////////
//////////////////////// 4. 字符串的遍历器接口
// ES6为字符串添加了遍历器接口（详见《Iterator》一章），使得字符串可以被for...of循环遍历
// 这个遍历器最大的优点是可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点
{
    let text = String.fromCodePoint(0x20BB7);
    for (let i = 0; i < text.length; i++) {
        console.log(text[i])
    }
    // �
    // �

    for (let i of text) {
        console.log(i)
    }
    // 𠮷
}

///////////////////////////////////////////
//// 7. includes(), startsWith(), endsWith()
// 传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法:
// includes()
// startsWith()
// endsWith()
{
    var s = 'Hello world!'
    console.log(s.startsWith('Hello')) // true
    console.log(s.endsWith('!')) // true
    console.log(s.includes('o')) // true

    // 还有一个可选参数，表示起始位置(闭区间)
    console.log(s.startsWith('world', 6)) // true, 从左到右数
    console.log(s.includes("e", 1)) // true
    console.log(s.endsWith("Hello", 7)) // true, 同样由零开始，从右到左计数
}

///////////////////////////////////////////
/////////////////////////////// 8. repeat()
{
    console.log(Infinity) // Infinity

    console.log('ab'.repeat(4)) // abababab
    console.log('aa'.repeat(0)) // ''
    // console.log('bb'.repeat(-1)) // RangeError: Invalid count value
    // console.log('cc'.repeat(Infinity)) // RangeError: Invalid count value
    // 小数取整
    console.log('cc'.repeat(2.8)) // cccc
}


///////////////////////////////////////////
////////////////////////////// 10. 模板字符串
{
    // 传统的JavaScript语言，输出模板通常是这样写的
    // $('#result').append(  
    //     'There are <b>' + basket.count + '</b> ' +  'items in your basket, ' + 
    //     '<em>' + basket.onSale +  '</em> are on sale!'
    //     );

    // ES 6 用`标识模板字符串
    // $('#result').append(`  
    //     There are <b>${basket.count}</b> items   in your basket, 
    //     <em>${basket.onSale}</em>  are on sale!`
    // );

    // 模板字符串可以换行
    let a = `你
    是
    i   \`
c`
    console.log(a) // 注意：``之间的所有字符都包含在内，包含的`需要转移符

    // 字符串中嵌入变量
    var name = "Bob", time = "today"
    console.log(`Hello ${name}, how are you ${time}?`)

    let html = `
        <ul>  
            <li>first</li>  
            <li>second</li>
        </ul>
    `
    console.log(html, html.length) // 91
    console.log(html.trim(), html.trim().length) // 77
}