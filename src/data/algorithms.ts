export interface AlgoExample {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  description: string;
  icon: string;
  visType: string;
  timeComplexity: string;
  spaceComplexity: string;
  code: { javascript: string; python: string };
  steps: string[];
}

export const ALGORITHMS: AlgoExample[] = [
  {
    id: 'bubble-sort',
    name: 'Bubble Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'Repeatedly steps through the list, compares adjacent elements and swaps them if in wrong order.',
    icon: '🫧',
    visType: 'bars',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    steps: [
      'Start from index 0',
      'Compare arr[i] and arr[i+1]',
      'Swap if arr[i] > arr[i+1]',
      'Move to next pair',
      'Repeat for each pass',
      'Largest element bubbles to end',
      'Repeat n-1 times total',
    ],
    code: {
      javascript: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j] > arr[j + 1]) {
        // Swap them
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

const arr = [64, 34, 25, 12, 22, 11, 90];
console.log(bubbleSort(arr));`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            # Compare adjacent elements
            if arr[j] > arr[j + 1]:
                # Swap them
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

arr = [64, 34, 25, 12, 22, 11, 90]
print(bubble_sort(arr))`,
    },
  },
  {
    id: 'selection-sort',
    name: 'Selection Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'Divides input into sorted and unsorted regions, repeatedly selects minimum from unsorted.',
    icon: '🎯',
    visType: 'bars',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    steps: [
      'Set current position as minimum',
      'Find minimum in unsorted region',
      'Swap minimum to current position',
      'Advance sorted boundary',
      'Repeat until fully sorted',
    ],
    code: {
      javascript: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}

const arr = [29, 10, 14, 37, 13];
console.log(selectionSort(arr));`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

arr = [29, 10, 14, 37, 13]
print(selection_sort(arr))`,
    },
  },
  {
    id: 'insertion-sort',
    name: 'Insertion Sort',
    category: 'Sorting',
    difficulty: 'Easy',
    description: 'Builds sorted array one item at a time by inserting each into its correct position.',
    icon: '📥',
    visType: 'bars',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    steps: [
      'Start with second element',
      'Store current element as key',
      'Compare key with sorted elements',
      'Shift larger elements right',
      'Insert key in correct position',
      'Repeat for all elements',
    ],
    code: {
      javascript: `function insertionSort(arr) {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}

const arr = [12, 11, 13, 5, 6];
console.log(insertionSort(arr));`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

arr = [12, 11, 13, 5, 6]
print(insertion_sort(arr))`,
    },
  },
  {
    id: 'merge-sort',
    name: 'Merge Sort',
    category: 'Sorting',
    difficulty: 'Medium',
    description: 'Divide-and-conquer algorithm that splits, sorts recursively, then merges subarrays.',
    icon: '🔀',
    visType: 'bars',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    steps: [
      'Divide array into two halves',
      'Recursively sort left half',
      'Recursively sort right half',
      'Merge two sorted halves',
      'Compare elements during merge',
      'Build final sorted array',
    ],
    code: {
      javascript: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

console.log(mergeSort([38, 27, 43, 3, 9, 82]));`,
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]

print(merge_sort([38, 27, 43, 3, 9, 82]))`,
    },
  },
  {
    id: 'quick-sort',
    name: 'Quick Sort',
    category: 'Sorting',
    difficulty: 'Hard',
    description: 'Picks a pivot, partitions array around it, then recursively sorts subarrays.',
    icon: '⚡',
    visType: 'bars',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    steps: [
      'Choose last element as pivot',
      'Partition: elements < pivot go left',
      'Elements > pivot go right',
      'Pivot is in final position',
      'Recursively sort left partition',
      'Recursively sort right partition',
    ],
    code: {
      javascript: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

console.log(quickSort([10, 7, 8, 9, 1, 5]));`,
      python: `def quick_sort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)
    return arr

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1

print(quick_sort([10, 7, 8, 9, 1, 5]))`,
    },
  },
  {
    id: 'binary-search',
    name: 'Binary Search',
    category: 'Searching',
    difficulty: 'Easy',
    description: 'Efficiently finds a target in a sorted array by repeatedly halving the search range.',
    icon: '🔍',
    visType: 'array',
    timeComplexity: 'O(log n)',
    spaceComplexity: 'O(1)',
    steps: [
      'Start with full array range',
      'Calculate mid index',
      'Compare target with mid element',
      'If match, return mid',
      'If target < mid, search left half',
      'If target > mid, search right half',
      'Repeat until found or empty',
    ],
    code: {
      javascript: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

const sorted = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
console.log(binarySearch(sorted, 23)); // 5`,
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

sorted_arr = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
print(binary_search(sorted_arr, 23))  # 5`,
    },
  },
  {
    id: 'fibonacci',
    name: 'Fibonacci (DP)',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    description: 'Computes Fibonacci numbers using memoization to avoid redundant calculations.',
    icon: '🌀',
    visType: 'array',
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    steps: [
      'Initialize memo table',
      'Base cases: fib(0)=0, fib(1)=1',
      'For each n, check memo',
      'Compute fib(n-1) + fib(n-2)',
      'Store result in memo',
      'Return memoized value',
    ],
    code: {
      javascript: `function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Generate first 10 Fibonacci numbers
const fibs = Array.from({ length: 10 }, (_, i) => fibonacci(i));
console.log(fibs);
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
      python: `def fibonacci(n, memo={}):
    if n <= 1:
        return n
    if n in memo:
        return memo[n]
    
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]

# Generate first 10 Fibonacci numbers
fibs = [fibonacci(i) for i in range(10)]
print(fibs)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    },
  },
  {
    id: 'bfs',
    name: 'BFS (Graph)',
    category: 'Graph',
    difficulty: 'Medium',
    description: 'Breadth-First Search explores a graph level by level using a queue.',
    icon: '🌊',
    visType: 'graph',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    steps: [
      'Start from source node',
      'Add source to queue & visited',
      'Dequeue front node',
      'Visit all unvisited neighbors',
      'Add neighbors to queue',
      'Repeat until queue empty',
      'All reachable nodes visited',
    ],
    code: {
      javascript: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  const order = [];
  
  visited.add(start);
  
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [], E: [], F: []
};
console.log(bfs(graph, 'A'));`,
      python: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    order = []
    
    visited.add(start)
    
    while queue:
        node = queue.popleft()
        order.append(node)
        
        for neighbor in graph.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

graph = {'A':['B','C'],'B':['D','E'],'C':['F'],'D':[],'E':[],'F':[]}
print(bfs(graph, 'A'))`,
    },
  },
  {
    id: 'dfs',
    name: 'DFS (Graph)',
    category: 'Graph',
    difficulty: 'Medium',
    description: 'Depth-First Search explores as far as possible along each branch before backtracking.',
    icon: '🕳️',
    visType: 'graph',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
    steps: [
      'Start from source node',
      'Mark node as visited',
      'Explore first unvisited neighbor',
      'Recursively go deeper',
      'Backtrack when no neighbors left',
      'Continue until all visited',
    ],
    code: {
      javascript: `function dfs(graph, start, visited = new Set(), order = []) {
  visited.add(start);
  order.push(start);
  
  for (const neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited, order);
    }
  }
  return order;
}

const graph = {
  A: ['B', 'C'],
  B: ['D', 'E'],
  C: ['F'],
  D: [], E: [], F: []
};
console.log(dfs(graph, 'A'));`,
      python: `def dfs(graph, start, visited=None, order=None):
    if visited is None: visited = set()
    if order is None: order = []
    
    visited.add(start)
    order.append(start)
    
    for neighbor in graph.get(start, []):
        if neighbor not in visited:
            dfs(graph, neighbor, visited, order)
    return order

graph = {'A':['B','C'],'B':['D','E'],'C':['F'],'D':[],'E':[],'F':[]}
print(dfs(graph, 'A'))`,
    },
  },
  {
    id: 'stack-impl',
    name: 'Stack',
    category: 'Stack & Queue',
    difficulty: 'Easy',
    description: 'LIFO data structure — last element pushed is first to be popped.',
    icon: '📚',
    visType: 'array',
    timeComplexity: 'O(1) push/pop',
    spaceComplexity: 'O(n)',
    steps: [
      'Initialize empty stack',
      'Push adds to top',
      'Pop removes from top',
      'Peek views top element',
      'isEmpty checks if empty',
      'LIFO: Last In, First Out',
    ],
    code: {
      javascript: `class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return "Underflow";
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return "Empty";
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
}

const stack = new Stack();
stack.push(10); stack.push(20); stack.push(30);
console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.items);  // [10, 20]`,
      python: `class Stack:
    def __init__(self):
        self.items = []
    
    def push(self, element):
        self.items.append(element)
    
    def pop(self):
        if self.is_empty():
            return "Underflow"
        return self.items.pop()
    
    def peek(self):
        if self.is_empty():
            return "Empty"
        return self.items[-1]
    
    def is_empty(self):
        return len(self.items) == 0

stack = Stack()
stack.push(10); stack.push(20); stack.push(30)
print(stack.peek())  # 30
print(stack.pop())   # 30
print(stack.items)   # [10, 20]`,
    },
  },
];
