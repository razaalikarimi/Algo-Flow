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
  code: { 
    javascript: string; 
    python: string; 
    python3: string;
    cpp: string; 
    java: string; 
    typescript: string; 
    csharp: string; 
    c: string; 
  };
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
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      typescript: `function bubbleSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      python3: `def bubble_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr`,
      cpp: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
      java: `public class BubbleSort {
    void bubbleSort(int arr[]) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - i - 1; j++)
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
    }
}`,
      csharp: `class BubbleSort {
    static void bubbleSort(int[] arr) {
        int n = arr.Length;
        for (int i = 0; i < n - 1; i++)
            for (int j = 0; j < n - i - 1; j++)
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
    }
}`,
      c: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`
    }
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
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      typescript: `function selectionSort(arr: number[]): number[] {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
      python: `def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      python3: `def selection_sort(arr: list[int]) -> list[int]:
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr`,
      cpp: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
          if (arr[j] < arr[min_idx]) min_idx = j;
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
      java: `void selectionSort(int arr[]) {
    int n = arr.length;
    for (int i = 0; i < n-1; i++) {
        int min_idx = i;
        for (int j = i+1; j < n; j++)
            if (arr[j] < arr[min_idx]) min_idx = j;
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
      csharp: `void selectionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
            if (arr[j] < arr[min_idx]) min_idx = j;
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`,
      c: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int min_idx = i;
        for (int j = i + 1; j < n; j++)
          if (arr[j] < arr[min_idx]) min_idx = j;
        int temp = arr[min_idx];
        arr[min_idx] = arr[i];
        arr[i] = temp;
    }
}`
    }
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
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      typescript: `function insertionSort(arr: number[]): number[] {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      python3: `def insertion_sort(arr: list[int]) -> list[int]:
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and key < arr[j]:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr`,
      cpp: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      java: `void insertionSort(int arr[]) {
    int n = arr.length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      csharp: `void insertionSort(int[] arr) {
    int n = arr.Length;
    for (int i = 1; i < n; ++i) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`,
      c: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
    }
}`
    }
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
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      typescript: `function binarySearch(arr: number[], target: number): number {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1`,
      python3: `def binary_search(arr: list[int], target: int) -> int:
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        if arr[mid] < target: left = mid + 1
        else: right = mid - 1
    return -1`,
      cpp: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      java: `int binarySearch(int arr[], int x) {
    int l = 0, r = arr.length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      csharp: `int binarySearch(int[] arr, int x) {
    int l = 0, r = arr.Length - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,
      c: `int binarySearch(int arr[], int l, int r, int x) {
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (arr[m] == x) return m;
        if (arr[m] < x) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`
    }
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
      javascript: `function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
      typescript: `function fib(n: number, memo: Record<number, number> = {}): number {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
      python: `def fib(n, memo={}):
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]`,
      python3: `def fib(n: int, memo: dict = {}) -> int:
    if n <= 1: return n
    if n in memo: return memo[n]
    memo[n] = fib(n-1, memo) + fib(n-2, memo)
    return memo[n]`,
      cpp: `int fib(int n) {
    int f[n + 2];
    f[0] = 0; f[1] = 1;
    for (int i = 2; i <= n; i++) f[i] = f[i - 1] + f[i - 2];
    return f[n];
}`,
      java: `int fib(int n) {
    int f[] = new int[n + 2];
    f[0] = 0; f[1] = 1;
    for (int i = 2; i <= n; i++) f[i] = f[i - 1] + f[i - 2];
    return f[n];
}`,
      csharp: `int fib(int n) {
    int[] f = new int[n + 2];
    f[0] = 0; f[1] = 1;
    for (int i = 2; i <= n; i++) f[i] = f[i - 1] + f[i - 2];
    return f[n];
}`,
      c: `int fib(int n) {
    int f[n + 2];
    f[0] = 0; f[1] = 1;
    for (int i = 2; i <= n; i++) f[i] = f[i - 1] + f[i - 2];
    return f[n];
}`
    }
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
    ],
    code: {
      javascript: `function bfs(graph, start) {
  let queue = [start], visited = new Set([start]), order = [];
  while (queue.length) {
    let node = queue.shift();
    order.push(node);
    for (let n of graph[node]) {
      if (!visited.has(n)) {
        visited.add(n); queue.push(n);
      }
    }
  }
  return order;
}`,
      typescript: `function bfs(graph: any, start: string): string[] {
  let queue = [start], visited = new Set([start]), order = [];
  while (queue.length) {
    let node = queue.shift();
    order.push(node);
    for (let n of graph[node]) {
      if (!visited.has(n)) {
        visited.add(n); queue.push(n);
      }
    }
  }
  return order;
}`,
      python: `def bfs(graph, start):
    visited, queue = {start}, [start]
    order = []
    while queue:
        vertex = queue.pop(0)
        order.append(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
      python3: `def bfs(graph: dict, start: str) -> list:
    visited, queue = {start}, [start]
    order = []
    while queue:
        vertex = queue.pop(0)
        order.append(vertex)
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order`,
      cpp: `void BFS(int s) {
    vector<bool> visited(V, false);
    list<int> queue;
    visited[s] = true; queue.push_back(s);
    while(!queue.empty()) {
        s = queue.front(); queue.pop_front();
        for (auto adj: adj[s]) {
            if (!visited[adj]) {
                visited[adj] = true; queue.push_back(adj);
            }
        }
    }
}`,
      java: `void BFS(int s) {
    boolean visited[] = new boolean[V];
    LinkedList<Integer> queue = new LinkedList<Integer>();
    visited[s]=true; queue.add(s);
    while (queue.size() != 0) {
        s = queue.poll();
        Iterator<Integer> i = adj[s].listIterator();
        while (i.hasNext()) {
            int n = i.next();
            if (!visited[n]) {
                visited[n] = true; queue.add(n);
            }
        }
    }
}`,
      csharp: `void BFS(int s) {
    bool[] visited = new bool[V];
    List<int> queue = new List<int>();
    visited[s] = true; queue.Add(s);
    while(queue.Any()) {
        s = queue.First(); queue.RemoveAt(0);
        foreach(int next in adj[s]) {
            if(!visited[next]) {
                visited[next] = true; queue.Add(next);
            }
        }
    }
}`,
      c: `void BFS(int s) {
    bool visited[V];
    int queue[V], head = 0, tail = 0;
    visited[s] = true; queue[tail++] = s;
    while(head < tail) {
        s = queue[head++];
        for(int i=0; i<adj_count[s]; i++) {
            int n = adj[s][i];
            if(!visited[n]) {
                visited[n] = true; queue[tail++] = n;
            }
        }
    }
}`
    }
  },
  {
    id: 'stack-impl',
    name: 'Stack',
    category: 'Stack & Queue',
    difficulty: 'Easy',
    description: 'LIFO data structure — last element pushed is first to be popped.',
    icon: '📚',
    visType: 'array',
    timeComplexity: 'O(1)',
    spaceComplexity: 'O(n)',
    steps: [
      'Initialize empty stack',
      'Push adds to top',
      'Pop removes from top',
      'Peek views top element',
      'isEmpty checks if empty',
    ],
    code: {
      javascript: `class Stack {
  constructor() { this.items = []; }
  push(el) { this.items.push(el); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length-1]; }
}`,
      typescript: `class Stack<T> {
  private items: T[] = [];
  push(el: T) { this.items.push(el); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length-1]; }
}`,
      python: `class Stack:
    def __init__(self): self.items = []
    def push(self, el): self.items.append(el)
    def pop(self): return self.items.pop()
    def peek(self): return self.items[-1]`,
      python3: `class Stack:
    def __init__(self): self.items: list = []
    def push(self, el: any): self.items.append(el)
    def pop(self) -> any: return self.items.pop()
    def peek(self) -> any: return self.items[-1]`,
      cpp: `class Stack {
    int top;
public:
    int a[MAX];
    Stack() { top = -1; }
    bool push(int x);
    int pop();
    int peek();
};`,
      java: `class Stack {
    static final int MAX = 1000;
    int top;
    int a[] = new int[MAX];
    Stack() { top = -1; }
    boolean push(int x);
    int pop();
    int peek();
}`,
      csharp: `class Stack {
    int top;
    int[] a = new int[MAX];
    public Stack() { top = -1; }
    public bool push(int x);
    public int pop();
    public int peek();
}`,
      c: `struct Stack {
    int top;
    unsigned capacity;
    int* array;
};`
    }
  }
];
