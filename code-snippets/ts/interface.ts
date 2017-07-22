// TypeScript的核心原则之一是对值所具有的结构进行类型检查
// 它有时被称做“鸭式辨型法”或“结构性子类型化”
// 在TypeScript里
// 接口的作用就是为这些类型命名和为你的代码或第三方代码定义契约

// https://en.wikipedia.org/wiki/Duck_typing
// Duck typing is concerned with establishing the suitability of an object for some purpose. 
// With normal typing, suitability is assumed to be determined by an object's type only. 
// In duck typing, an object's suitability is determined by the presence of certain methods 
// and properties (with appropriate meaning), rather than the actual type of the object.

interface FunnyInterface {
  des: string;
  movable?: boolean; // 可选
  readonly readonlyProperty: number; // 只读属性
  readOnlyArray: ReadonlyArray<any>;
  readOnlyMap: ReadonlyMap<string, any>;
  readOnlySet: ReadonlySet<Array<string>>;
}

// 额外的类型检查
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
    return null;
}


// let mySquare = createSquare({ colour: "red", width: 100 }); 
// file: 'file:///Users/Vincent/Github/React-Native-Notes/code-snippets/ts/interface.ts'
// severity: 'Error'
// message: 'Argument of type '{ colour: string; width: number; }' is not assignable to parameter of type 'SquareConfig'.
//   Object literal may only specify known properties, and 'colour' does not exist in type 'SquareConfig'.'
// at: '33,31'
// source: 'ts'

// TypeScript会认为这段代码可能存在bug
// 对象字面量会被特殊对待而且会经过 额外属性检查，当将它们赋值给变量或作为参数传递的时
// 如果一个对象字面量存在任何“目标类型”不包含的属性时，你会得到一个错误。

//// 可以类型断言绕开检查
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
//// 或者，最佳的方式是，能够添加一个字符串索引签名
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any; // 索引字符串
}

// 函数类型
interface SortFunc {
  (lhs: string, rhs: string): boolean;
}
let sort: SortFunc;
sort = function(obj1, obj2): boolean {
  return obj1.length > obj2.length;
}

// 可索引类型
// 共有支持两种索引签名：字符串和数字
interface NumberDictionary {
  readonly [index: string]: number;
  length: number;    // 可以，length是number类型
  // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
}


// 类类型
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date);
}
// impl
class Clock implements ClockInterface {
    currentTime: Date;
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}


// 接口继承
interface Shape {
    color: string;
}
interface Square extends Shape {
    sideLength: number;
}
let square = <Square>{};
square.color = "blue";
square.sideLength = 10;

// 可以继承多个接口
// 一个接口可以继承多个接口，创建出多个接口的合成接口
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

let squ = <Square>{};
square.color = "blue";
square.sideLength = 10;
square.penWidth = 5.0;


// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;


// 接口继承类
// 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
// 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 
// 接口同样会继承到类的private和protected成员。 
// 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，
// 这个接口类型只能被这个类或其子类所实现（implement）
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control {
    select() { }
}

class TextBox extends Control {
    select() { }
}

class Image {
    select() { }
}

class Location {
    select() { }
}
// 在上面的例子里，SelectableControl包含了Control的所有成员，
// 包括私有成员state。 因为 state是私有成员，
// 所以只能够是Control的子类们才能实现SelectableControl接口。 
// 因为只有 Control的子类才能够拥有一个声明于Control的私有成员state，
// 这对私有成员的兼容性是必需的。