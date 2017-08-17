// Named function
function add(x, y) {
  return x + y;
}

// Anonymous function
let myAdd = function(x, y) { return x + y; };

// TS里的每个函数参数都是必须的
// JS里，每个参数都是可选的，可传可不传。没传参的时候，它的值就是undefined

// 可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

// 默认参数
// TS里，也可以为参数提供一个默认值，当未传入这个参数或传入的值是undefined时，采用
function buildNoOne(firstName: string, lastName = 'No One') {
  return firstName + " " + lastName;
}


// 剩余参数
// 剩余参数会被当做个数不限的可选参数
function buildLongName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}


// this和箭头函数
// 学习使用JavaScript里this就好比一场成年礼
// 幸运的是，TypeScript能通知你错误地使用了 this的地方

/* JavaScript里，this的值在函数被调用的时候才会指定
这是个既强大又灵活的特点，但是你需要花点时间弄清楚函数调用的上下文是什么
但众所周知，这不是一件很简单的事，尤其是在返回一个函数或将函数当做参数传递的时候 
*/

/*
我们需要改变函数表达式来使用 ECMAScript 6 箭头语法
箭头函数能保存函数创建时的 this 值，而不是调用时的值
*/