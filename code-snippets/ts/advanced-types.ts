////// 交叉类型 Intersection Types
// 交叉类型是将多个类型合并为一个类型
// 我们大多是在混入（mixins）或其它不适合典型面向对象模型的地方看到交叉类型的使用
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) {
      (<any>result)[id] = (<any>first)[id];
  }
  for (let id in second) {
      if (!result.hasOwnProperty(id)) {
          (<any>result)[id] = (<any>second)[id];
      }
  }
  return result;
}

class Person {
  constructor(public name: string) { }
}
interface Loggable {
  log(): void;
}
class ConsoleLogger implements Loggable {
  log() {
      // ...
  }
}
var jim = extend(new Person("Jim"), new ConsoleLogger());
var n = jim.name;
jim.log();




/////// 联合类型 Union Types
let union: string | number | boolean;
// 如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员
interface Bird {
  fly();
  layEggs();
}

interface Fish {
  swim();
  layEggs();
}

function getSmallPet(): Fish | Bird {
  // ...
  return
}

let pet = getSmallPet();
pet.layEggs(); // okay
// pet.swim();    // errors




// 类型保护与区分类型（Type Guards and Differentiating Types）
if ((<Fish>pet).swim) {
  (<Fish>pet).swim();
}
else {
  (<Bird>pet).fly();
}

// 用户自定义的类型保护
// 这里可以注意到我们不得不多次使用类型断言
// 假若我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet的类型的话就好了
/**
 * TypeScript里的类型保护机制让它成为了现实
 * 类型保护就是一些表达式，它们会在运行时检查以确保在某个作用域里的类型
 * 要定义一个类型保护，我们只要简单地定义一个函数，它的返回值是一个 类型谓词：
 */ 
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
// 在这个例子里，pet is Fish就是类型谓词
// 谓词为 parameterName is Type这种形式，parameterName必须是来自于当前函数签名里的一个参数名

// 'swim' 和 'fly' 调用都没有问题了
if (isFish(pet)) {
  pet.swim();
}
else {
  pet.fly();
}
// 注意TypeScript不仅知道在if分支里pet是Fish类型; 它还清楚在 else分支里，一定不是Fish类型，一定是Bird类型



// typeof类型保护
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
      return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
      return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}


/////// instanceof类型保护
// instanceof类型保护是通过构造函数来细化类型的一种方式
// 类型为SpaceRepeatingPadder | StringPadder
interface Padder {
  getPaddingString(): string
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) { }
  getPaddingString() {
      return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) { }
  getPaddingString() {
      return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5 ?
      new SpaceRepeatingPadder(4) :
      new StringPadder("  ");
}

let padder: Padder = getRandomPadder();

if (pet instanceof SpaceRepeatingPadder) {
    padder; // 类型细化为'SpaceRepeatingPadder'
}
if (padder instanceof StringPadder) {
    padder; // 类型细化为'StringPadder'
}




////////// 字符串字面量类型
// 通过结合使用这些特性，你可以实现类似枚举类型的字符串
type Easing = "ease-in" | "ease-out" | "ease-in-out";
class UIElement {
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            // ...
        }
        else if (easing === "ease-out") {
        }
        else if (easing === "ease-in-out") {
        }
        else {
            // error! should not pass null or undefined.
        }
    }
}
