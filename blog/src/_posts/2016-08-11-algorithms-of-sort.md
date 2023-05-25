---
title: 聊一聊排序算法
description: 两月前花了些时间，将大学里学过的排序算法都复习了一遍，代码放在 github 上。没有整理，今天翻了翻代码，重新 review 了一遍，也顺便做了点记录。
warning: true
categories:
  - 算法
tags:
  - 排序算法
date: 2016-08-11 20:24:40
---


两月前花了些时间，将大学里学过的排序算法都复习了一遍，代码放在 github 上，没有整理。今天翻了翻代码，重新 review 了一遍，也顺便做了点记录。

![//graduatedegrees.online.njit.edu/wp-content/uploads/2015/08/Algorithms-In-Computer-Science.jpg](/blogimgs/2016/08/11/6c0378f8gw1f6q2zz5oj1j20p00dwtam.jpg)<!--<source src="http://ww3.sinaimg.cn/large/6c0378f8gw1f6q2zz5oj1j20p00dwtam.jpg">-->

下面花了不少篇幅，将基础排序、希尔、归并、快排、堆排序等都介绍了一通，懒得思考的同学可以略过代码直接看文字，文章对排序的基本思路都做了介绍。

<!--more-->

### 三种基本排序

插入排序和选择排序是两种最基本的排序算法，思路完全不一样，但是细思一番，还是挺有意思的：

`insertion sort`，[插入排序](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.1-elementary-sorts/insertion.js)，思路简单来说就是把自己插入到已排好序的列表中去，交换也是颇为频繁的。

```javascript
function insertion(input) {
  for(var i = 1, len = input.length; i < len; i++) {
    for(var j = i; j > 0; j--) {
      if(input[j] < input[j - 1]) {
        input[j] = [input[j - 1], input[j - 1] = input[j]][0];
      }
    }
  }
  return input;
}
```

`selection sort`，[选择排序](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.1-elementary-sorts/selection.js)，选择排序只对最后一个被选中的元素排序。它会往后找到包括自己在内最小的一个元素，替换自己。简单来说就是把第 i 小的元素放到第 i 个序位上。

```javascript
function selection(input) {
  for(var i = 0, len = input.length; i < len - 1; i++) {
    var min = i;
    for(var j = i + 1; j < len; j++) {
      if(input[j] < input[min]) {
        min = j;
      }
    }
    input[i] = [input[min], input[min] = input[i]][0];
  }
  return input;
}
```

而[冒泡排序](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.1-elementary-sorts/bubble.js)，就更简单了，从第一个元素开始，往后比较，遇到比自己小的元素就交换位置，交换的次数最多，自然也是性能最差的。

```javascript
function bubble(input) {
  for(var i = 0, len = input.length; i < len - 1; i++) {
    for(var j = i + 1; j < len; j++) {
      if(input[j] < input[i]) {
        input[j] = [input[i], input[i] = input[j]][0];
      }
    }
  }
  return input;
}
```

针对随机性排列不同（比如完全随机，顺序，倒序，半顺序等状态）的数据，三种效果也是不一样的，可以思考下。


### 希尔排序

上面提到了三种最基本的排序算法，这里要提到的希尔排序，有点不好理解。

代码：[/chapters/chapter-2-sorting/2.1-elementary-sorts/shell.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.1-elementary-sorts/shell.js)

```javascript
function shell(input) {
  var h = 1;
  var len = input.length;
  while(h < Math.floor(len / 3)) {
    h = h * 3 + 1;
  }
  while(h >= 1) {
    for(var i = h; i < len; i++)  {
      for(var j = i; j >= h; j -= h) {
        if(input[j] < input[j - h]) {
          input[j] = [input[j - h], input[j - h] = input[j]][0];
        }
      }
    }
    h = Math.floor(h / 3);
  }
  return input;
}
```

算法复杂不代表需要很多的代码去实现，因为代码表达的是过程，通过循环等方式可以很迅速实现一个过程，而算法是处理问题的方法，把它表达清楚可能就得费不少唇舌，甚至还得配上一些图辅助阅读。

希尔排序，大概的思路就是不断地从整体上调整数据的顺序，将比较大的数据尽量往后挪，比较小的数据尽量往前挪。数据的搬移也不是一步完成，每一次搬移都会将数据分块，分块的目的是尽可能的搬移距离比较远的数据，从而减少比较操作和交换操作。

### 归并排序

基本排序和希尔排序是都是从头到尾去遍历数据，不可避免的带来很多交换操作。归并排序是一种用空间换时间的排序算法，一个数组截断成两个子数组，子数据排好序后合并到一起。

代码：[/chapters/chapter-2-sorting/2.2-mergesort/merge.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.2-mergesort/merge.js)

```javascript
function merge(input1, input2) {
  var i = 0, j = 0;
  var output = [];
  while(i < input1.length || j < input2.length) {
    if(i == input1.length) {
      output.push(input2[j++]);
      continue;
    }
    if(j == input2.length) {
      output.push(input1[i++]);
      continue;
    }
    if(input1[i] < input2[j]) {
      output.push(input1[i++]);
    } else {
      output.push(input2[j++]);
    }
  }
  return output;
}
```

上面是一个简单的合并算法，将两个有序数据合并为一个。有人应该会想到，既然一个数组可以打散成两个进行排序，那被打算的子数组是不是也可以继续被打散呢？

答案是肯定的。这是一种典型的**分治思想**，递归归并。

代码：[/chapters/chapter-2-sorting/2.2-mergesort/mergeRecursiveTop2Bottom.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.2-mergesort/mergeRecursiveTop2Bottom.js)

```javascript
function mergeRecursiveTop2Bottom(input) {

  return sort(input, 0, input.length - 1);

  function sort(arr, start, end) {
    if(start >= end) {
      return;
    }
    var mid = ((end - start) >> 1) + start;
    sort(arr, start, mid);
    sort(arr, mid + 1, end);
    return merge(arr, start, mid, end);
  }

  function merge(arr, start, mid, end) {
    var i = start, j = mid + 1, tmp = [];
    for(var k = start; k <= end; k++) {
      tmp[k] = arr[k];
    }
    for(k = start; k <= end; k++) {
      if(i > mid) {
        arr[k] = tmp[j++];
        continue;
      }
      if(j > end) {
        arr[k] = tmp[i++];
        continue;
      }
      if(tmp[i] < tmp[j]) {
        arr[k] = tmp[i++];
      } else {
        arr[k] = tmp[j++];
      }
    }
    return arr;
  }
}
```

上面的算法是自顶向下的递归归并，简单来说就是解决很多小问题，那么大问题也就自然而然的解决了；还有一种自底向上的归并，这种归并简单来说，就是把一个大问题分解为多个小问题，多个小问题的答案就能得出大问题的答案。从解决问题的方式来看，两种处理方式是互逆的。

代码：[/chapters/chapter-2-sorting/2.2-mergesort/mergeRecursiveTop2Bottom.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.2-mergesort/mergeRecursiveTop2Bottom.js)

```javascript
function sort(arr) {
  for(var sz = 1, len = arr.length; sz < len; sz = sz * 2) {
    for(var start = 0; start < len - sz; start += sz * 2) {
      arr = merge(arr, start, start + sz - 1, Math.min(start + sz * 2 - 1, len - 1));
    }
  }
  return arr;
}
// merge 函数同上
```

不过自底向上的归并，在代码上稍微难理解一些，脑海重要有清晰的画卷，知道程序跑到哪一步了，尤其还需要处理边界问题。

## 快排

上面讨论了归并排序，将一个数组拆分成两个，然后合并处理，进而有了递归归并的思考。

而本节提出了一种更加高效的排序方法，这种算法跟归并排序是互补的，归并排序大致思路是`分-排序合`，而本节提出的快排采用的思路是`排序分-合`，把排序这种损耗比较大的操作前置了，所以效率更高。

代码：[/chapters/chapter-2-sorting/2.3-quicksort/quicksort.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.3-quicksort/quicksort.js)

```javascript
function quicksort(input) {
  sort(0, input.length - 1);
  return input;

  function sort(start, end) {
    if(start >= end) {
      return;
    }
    var mid = partition(start, end);
    sort(start, mid - 1);
    sort(mid + 1, end);
  }

  function partition(start, end) {
    var i = start, j = end + 1, k = input[start];
    while(true) {
      while(input[++i] < k) if( i === end) break;
      while(input[--j] > k) if( j === start) break;
      if(i >= j) break;
      input[i] = [input[j], input[j] = input[i]][0];
    }
    input[j] = [input[start], input[start] = input[j]][0];
    return j;
  }
}
```

这个算法写起来，感觉相当酸爽，因为这个排序思路太棒，情不自禁地热血沸腾。事实上，这个算法也是存在几个疑点的：

- 代码中的 `mid` 这个「哨兵」为啥要取第一个呢？
- `partition` 函数当 `end - start` 很小的时候效率还高么？

于是有了两个想法：

- 使用 `input` 的中位数作为「哨兵」
- 当 `end - start` 比较小的时候，大约为 5~15，改为其他比较高效的算法

今天只对第二个想法做了实践，基本改造如下：

代码：[chapters/chapter-2-sorting/2.3-quicksort/quicksortImprove.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.3-quicksort/quicksortImprove.js)

```javascript
var delta = 5;
function quicksortImprove(input) {
  sort(0, input.length - 1);
  return input;

  // sort 和 partition 函数同上

  function insertion(start, end) {
    for(var i = start + 1, len = end - start; i < end; i++) {
      for(var j = i; j > start; j--) {
        if(input[j] < input[j - 1]) {
          input[j] = [input[j - 1], input[j - 1] = input[j]][0];
        }
      }
    }
  }
}
```


### 优化后的快排

上面提到了快排和快排的改进算法。当待排序的数据中存在大量重复元素时，快排的效率会不太高，当遇到重复元素的时候，比较和交换都是赘余的，重复元素越多，性能越差，为了解决这个问题，我们引入了第三个变量，来标识重复元素区间，如下图所示：


```
+---------------------------------+
|  <v  |  =v  |=========|   > v   |
+---------------------------------+
       ↑      ↑         ↑
      lt      i         gt
```

大致的原理是：每次排序分组的时候，就会过滤掉重复元素，这样，进入递归的元素就少了很多，因此而提高效率。

代码：[/chapters/chapter-2-sorting/2.3-quicksort/quick3way.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.3-quicksort/quick3way.js)

```javascript
function quick3way(input) {
  sort(0, input.length - 1);
  return input;

  function sort(start, end) {
    if(start >= end) return;

    var lt = start, gt = end, i = start + 1, v = input[start];
    while(i <= gt) {
      if(input[i] < v) {
        input[lt] = [input[i], input[i] = input[lt]][0];
        lt++; i++;
      } else if(input[i] > v) {
        input[gt] = [input[i], input[i] = input[gt]][0];
        gt--;
      } else {
        i++;
      }
    }
    sort(start, lt - 1);
    sort(gt + 1, end);
  }
}
```


### 优先队列，堆排序

从最开始基本的冒泡、插入、选择和希尔排序，到分治思想的延伸——归并排序（自顶向下和自底向上），再到归并排序的互补算法——快排，然后学习了新的数据结构——二叉堆，于是有了堆排序。

二叉堆是一种数据结构，他的每一个二叉树点元素数值都会比下面两个节点元素的数值要大，因为这种数据接口包含的信息量很大，而得到这种数据结构的成本是很低的，构建一个二叉堆的算法并不复杂：

代码：[/chapters/chapter-2-sorting/2.4-priority-queues/priorityQueueAdd.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.4-priority-queues/priorityQueueAdd.js)

```javascript
function priorityQueueAdd(input) {
  var output = [];

  output[1] = input[0];
  for(var i = 1, len = input.length; i < len; i++) {
    output = swim(output, input[i]);
  }

  return output;

  function swim(arr, val) {
    arr.push(val);
    var k = arr.length - 1;
    while(k > 1 && arr[k >> 1] < arr[k]) {
      var p = k >> 1;
      arr[p] = [arr[k], arr[k] = arr[p]][0];
      k = p;
    }
    return arr;
  }
}
```

通过上浮的方式，不断插入新元素，既可形成一个二叉堆。这种优先队列最大的特点是，能够拿到很快拿到最大元素（顶部），当这个最大元素被删除（优先级最高的事务被处理完成）时，还能快速高效地将剩下的元素重整为一个二叉堆：

代码：[/chapters/chapter-2-sorting/2.4-priority-queues/priorityQueueDelete.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.4-priority-queues/priorityQueueDelete.js)

```javascript
function priorityQueueDelete(input) {
  var output = [];

  input.splice(1, 1);
  output = sink(input);

  return output;

  function sink(arr) {
    arr.splice(1, 0, arr.pop());
    var k = 1, N = arr.length - 1;
    while(2 * k <= N) {
      var j = 2 * k;
      if(j < N && arr[j] < arr[j + 1]) j++;
      if(arr[k] >= arr[j]) break;
      arr[k] = [arr[j], arr[j] = arr[k]][0];
      k = j;
    }
    return arr;
  }
}
```

一个二叉堆能够快速拿到最大元素，并且能够立即重新调整为二叉堆，基于这个特性，就有了**堆排序**：

代码：[/chapters/chapter-2-sorting/2.4-priority-queues/heapSort.js](https://github.com/barretlee/algorithms/blob/master/chapters/chapter-2-sorting/2.4-priority-queues/heapSort.js)

```javascript
function heapSort(input) {
  return sort(input);

  function sort (arr){
    var N = arr.length - 1;
    for(var k = N >> 2; k >= 1; k--) {
      arr = sink(arr, k, N);
    }
    while(N > 1) {
      arr[1] = [arr[N], arr[N] = arr[1]][0];
      N--;
      arr = sink(arr, 1, N);
    }
    return arr;
  }
  function sink(arr, k, N) {
    while(2 * k <= N) {
      var j = 2 * k;
      if(j < N && arr[j] < arr[j + 1]) j++;
      if(arr[k] >= arr[j]) break;
      arr[k] = [arr[j], arr[j] = arr[k]][0];
      k = j;
    }
    return arr;
  }
}
```

光看代码还是挺难理解的，脑海中必须有一个数组储存的堆模型。for 循环构造了堆（从 N/2 开始，跳过了所有大小为 1 的堆），注意，这里构造的并不是二叉堆，然后 while 循环将最大的元素 a[1] 和 a[n] 交换位置并修复堆，如此循环直到堆为空。

上面的排序用到的是 sink 方法，而 swim 方法也是可以用于排序算法之中的，这就是对应的**下沉排序**，感觉有点难理解。

### 小结

能够从上往下看到这里的，需要给你点个赞。算法的学习刚开始有点枯燥，也有点艰难，学着学着，慢慢的就能够领悟其中的趣味。

后续我也会投入一部分精力深入研究算法，希望可以通过一定量的算法实践大幅度提升自己的思维能力和动手能力。