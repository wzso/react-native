// 传统的JavaScript程序使用函数和基于原型的继承来创建可重用的组件
/*
var SampleClass = (function () {
    function SampleClass() {
    }
    SampleClass.prototype.method = function () {
        // method
    };
    return SampleClass;
}());
*/

class SampleClass {
  constructor(tag: string) {
    this.tag = tag;
  }
  tag: string;
  // private tag: string;
  method() {
    // method
  }
}

let sampleInstance = new SampleClass('sample');

////// private, protected
// TypeScript使用的是结构性类型系统。 
// 当我们比较两种不同的类型时，并不在乎它们从何处而来，
// 如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。
class AnotherSampleClass {
  constructor(tag: string) {
    this.tag = tag;
  }
  tag: string;
  // private tag: string;
  method() {

  }
}
let anotherSampleInstance: AnotherSampleClass = sampleInstance;
// 然而，当我们比较带有private或protected成员的类型的时候，情况就不同了。 
// 如果其中一个类型里包含一个 private成员，那么只有当另外一个类型中也存在这样一个private成员， 
// 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 protected成员也使用这个规则。
/// 在 tag 前面加上 private 试试
///   错误信息：error TS2322: Type 'SampleClass' is not assignable to type 'AnotherSampleClass'.
///   Types have separate declarations of a private property 'tag'.


// protected修饰符与private修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问
// 构造函数也可以被标记成protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。
class Person {
  protected name: string;
  protected constructor(theName: string) { this.name = theName; }
}

// Employee can extend Person
class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
      super(name);
      this.department = department;
  }

  public getElevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

let howard = new Employee("Howard", "Sales");
// let john = new Person("John"); 
// Error: The 'Person' constructor is protected and only accessible within the class declaration


////// readonly 修饰符
// 你可以使用readonly关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。



////// 存取器 getter & setter
// 存取器要求你将编译器设置为输出ECMAScript 5或更高。 不支持降级到ECMAScript 3。 
// 其次，只带有 get不带有set的存取器自动被推断为readonly。 
// 这在从代码生成 .d.ts文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值
let passcode = "secret passcode";
class Student {
  static location = 'haha';
  private _fullName: string;
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (passcode && passcode == "secret passcode") {
      this._fullName = newName;
    } else {
      console.log("Error: Unauthorized update of employee!");
    }
  }
}

let stu = new Student();
stu.fullName = "Bob Smith";
if (stu.fullName) {
  alert(stu.fullName);
}



/////// 静态属性
Student.location = 'bluez';


/////// abstract 
// 抽象类做为其它派生类的基类使用 它们一般不会直接被实例化



/////// 把类当 interface 用
class Point {
  x: number;
  y: number;
}

interface Point3d extends Point {
  z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};