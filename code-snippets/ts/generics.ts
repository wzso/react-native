/////// 泛型函数
// T 帮助我们捕获用户传入的类型
function foo<T>(arg: T): T {
  return arg;
}
// <> 可省
let output = foo<string>("myString"); // string
// 类型推论帮助我们保持代码精简和高可读性。如果编译器不能够自动地推断出类型的话，
// 只能像上面那样明确的传入T的类型，在一些复杂的情况下，这是可能出现的
let output2 = foo(3); // number

// 匿名的泛型函数
// 注意 函数签名的写法
let myIdentity: {<T>(arg: T): T} = foo;

interface IdentityInterface {
  <T>(arg: T): T; /////////-------> a ..... 注意与 b 的区别
}

/////// 泛型接口
interface GenericIdentityFn<T> {
  (arg: T): T;
}


/////// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T; /////////-------> b ..... 注意与 a 的区别
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };


let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function(x, y) { return x + y; };



//////// 泛型约束
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);  // Now we know it has a .length property, so no more error
  return arg;
}

loggingIdentity({length: 10, value: 3});



//////// 在泛型中使用类类型
// 在TypeScript使用泛型创建工厂函数时，需要引用构造函数的类类型
function create<T>(c: {new(): T; }): T {
  return new c();
}

// 一个更高级的例子，使用原型属性推断并约束构造函数与类实例的关系
class BeeKeeper {
    hasMask: boolean;
}

class ZooKeeper {
    nametag: string;
}

class Animal {
    numLegs: number;
}

class Bee extends Animal {
    keeper: BeeKeeper;
}

class Lion extends Animal {
    keeper: ZooKeeper;
}

function createInstance<A extends Animal>(c: new () => A): A {
    return new c();
}

createInstance(Lion).keeper.nametag;  // typechecks!
createInstance(Bee).keeper.hasMask;   // typechecks!