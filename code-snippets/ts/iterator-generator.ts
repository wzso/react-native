// 自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样
let sym2 = Symbol("key"); // 可选的参数，字符串key



//////////// Iterators
// 当一个对象实现了Symbol.iterator属性时，我们认为它是可迭代的。
// for..of vs. for..in 语句
// for..of和for..in均可迭代一个列表；但是用于迭代的值却不同
// for..in迭代的是对象的 键 的列表，而for..of则迭代对象的键对应的值
let list = [4, 5, 6];
for (let i in list) {
    console.log(i); // "0", "1", "2",
}
for (let i of list) {
    console.log(i); // "4", "5", "6"
}
// 另一个区别是for..in可以操作任何对象
// 它提供了查看对象属性的一种方法
// 但是 for..of关注于迭代对象的值
// 内置对象Map和Set已经实现了Symbol.iterator方法
// 让我们可以访问它们保存的值
