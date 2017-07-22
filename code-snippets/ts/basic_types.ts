// TypeScript支持与JavaScript几乎相同的数据类型
// 此外还提供了实用的枚举类型方便我们使用

// 布尔
let isActive: boolean = true;


// 和JavaScript一样，TypeScript里的所有数字都是浮点数
// 这些浮点数的类型是 number
// 除了支持十进制和十六进制字面量
// TypeScript还支持ECMAScript 2015中引入的二进制和八进制字面量。
let num: number = 11;


// 字符串
// 双引号，单引号
// 模板字符串
let tempStr = `Once upon a time, there is this huge monster. 
It's ${num} meters high. `;

// 数组
// 所有元素类型必须相同
let numbers: number[] = [1, 1, 1];
// number | null 为联合类型
let nums: Array<number | null> = [num, num, num];


// 元组
// 可以是不同类型的元素
let tuple: [boolean, string, Array<number>] = [true, 'hello', [22]];
console.log(tuple[2]) // hello
// 当访问一个越界的元素，会使用联合类型替代(类似Swift的optional)


// 枚举
// 默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 
enum Gender { Male, Female }
let man = Gender.Male;
// 枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 
// 例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
let enumName = Gender[1]; // type: string
console.log(enumName); // Female


// any
// 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查
// 那么我们可以使用 any类型来标记这些变量


// void
// 它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function print(s: string): void {
  console.log(s);
}
// 声明一个变量为void没什么大用，变量只能赋值为 undefined 或 null
let voidValue: void = undefined;


// null & undefined
// TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null
// 和 void相似，它们的本身的类型用处不是很大：
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
// 默认情况下null和undefined是所有类型的子类型
// 就是说你可以把 null和undefined赋值给number类型的变量。
// 然而，当你指定了--strictNullChecks标记，null和undefined只能赋值给void
// 和它们各自。 这能避免很多常见的问题。 
// 也许在某处你想传入一个 string或null或undefined，你可以使用
// 联合类型string | null | undefined。 再次说明，稍后我们会介绍联合类型。


// never
// never类型表示的是那些永不存在的值的类型。 
// 例如， never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型
// 变量也可能是 never 类型，当它们被永不为真的类型保护所约束时。

// never类型是任何类型的子类型，也可以赋值给任何类型
// 然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）
// 即使 any也不可以赋值给never
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}


// 类型断言 Type assertions
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构
// 它没有运行时的影响，只是在编译阶段起作用
// 尖括号
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// as
let anotherValue: any = "this is a string";
let stringLength: number = (anotherValue as string).length;