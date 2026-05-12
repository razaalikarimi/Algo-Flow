/**
 * Generates step-by-step animation frames for sorting/searching algorithms
 */

export interface VisFrame {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  label: string;
  activeLine: number;
  variables: Record<string, string | number>;
}

export function generateBubbleSortFrames(arr: number[]): VisFrame[] {
  const frames: VisFrame[] = [];
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];

  frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: 'Starting Bubble Sort', activeLine: 1, variables: { n } });

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      frames.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted], label: `Comparing arr[${j}]=${a[j]} and arr[${j+1}]=${a[j+1]}`, activeLine: 4, variables: { i, j, 'arr[j]': a[j], 'arr[j+1]': a[j+1] } });
      if (a[j] > a[j + 1]) {
        frames.push({ array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted], label: `Swapping ${a[j]} and ${a[j+1]}`, activeLine: 6, variables: { i, j, swapped: `${a[j]} ↔ ${a[j+1]}` } });
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: 'Swap complete', activeLine: 6, variables: { i, j, 'arr[j]': a[j], 'arr[j+1]': a[j+1] } });
      }
    }
    sorted.unshift(n - 1 - i);
    frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: `Pass ${i+1} complete — ${a[n-1-i]} is in place`, activeLine: 3, variables: { i, pass: i + 1 } });
  }
  sorted.unshift(0);
  frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: '✅ Array fully sorted!', activeLine: 9, variables: {} });
  return frames;
}

export function generateSelectionSortFrames(arr: number[]): VisFrame[] {
  const frames: VisFrame[] = [];
  const a = [...arr];
  const n = a.length;
  const sorted: number[] = [];

  frames.push({ array: [...a], comparing: [], swapping: [], sorted: [], label: 'Starting Selection Sort', activeLine: 1, variables: { n } });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    frames.push({ array: [...a], comparing: [i], swapping: [], sorted: [...sorted], label: `Finding minimum from index ${i}`, activeLine: 3, variables: { i, minIdx } });
    for (let j = i + 1; j < n; j++) {
      frames.push({ array: [...a], comparing: [minIdx, j], swapping: [], sorted: [...sorted], label: `Comparing arr[${j}]=${a[j]} with min=${a[minIdx]}`, activeLine: 5, variables: { j, 'arr[j]': a[j], min: a[minIdx] } });
      if (a[j] < a[minIdx]) {
        minIdx = j;
        frames.push({ array: [...a], comparing: [minIdx], swapping: [], sorted: [...sorted], label: `New minimum found: ${a[minIdx]} at index ${minIdx}`, activeLine: 6, variables: { minIdx, min: a[minIdx] } });
      }
    }
    if (minIdx !== i) {
      frames.push({ array: [...a], comparing: [], swapping: [i, minIdx], sorted: [...sorted], label: `Swapping arr[${i}]=${a[i]} with arr[${minIdx}]=${a[minIdx]}`, activeLine: 9, variables: { i, minIdx } });
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
    }
    sorted.push(i);
    frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: `Position ${i} sorted — value: ${a[i]}`, activeLine: 2, variables: { i } });
  }
  sorted.push(n - 1);
  frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: '✅ Array fully sorted!', activeLine: 11, variables: {} });
  return frames;
}

export function generateInsertionSortFrames(arr: number[]): VisFrame[] {
  const frames: VisFrame[] = [];
  const a = [...arr];
  const sorted = [0];
  frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: 'Starting Insertion Sort', activeLine: 1, variables: {} });

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    frames.push({ array: [...a], comparing: [i], swapping: [], sorted: [...sorted], label: `Key = ${key} at index ${i}`, activeLine: 3, variables: { i, key } });
    while (j >= 0 && a[j] > key) {
      frames.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted], label: `arr[${j}]=${a[j]} > key=${key}, shifting right`, activeLine: 5, variables: { j, key } });
      a[j + 1] = a[j];
      j--;
      frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: 'Shifted element right', activeLine: 6, variables: { j: j + 1 } });
    }
    a[j + 1] = key;
    sorted.push(i);
    frames.push({ array: [...a], comparing: [], swapping: [], sorted: [...sorted], label: `Inserted ${key} at position ${j+1}`, activeLine: 8, variables: { key, pos: j + 1 } });
  }
  frames.push({ array: [...a], comparing: [], swapping: [], sorted: a.map((_, i) => i), label: '✅ Array fully sorted!', activeLine: 1, variables: {} });
  return frames;
}

export function generateMergeSortFrames(arr: number[]): VisFrame[] {
  const frames: VisFrame[] = [];
  const a = [...arr];
  frames.push({ array: [...a], comparing: [], swapping: [], sorted: [], label: 'Starting Merge Sort', activeLine: 1, variables: {} });

  function mergeSort(arr: number[], start: number) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    frames.push({ array: [...a], comparing: [], swapping: Array.from({ length: arr.length }, (_, i) => i + start), sorted: [], label: `Dividing: [${arr.join(',')}]`, activeLine: 2, variables: { mid: start + mid } });
    const left = mergeSort(arr.slice(0, mid), start);
    const right = mergeSort(arr.slice(mid), start + mid);
    const merged = merge(left, right, start);
    merged.forEach((v, i) => { a[start + i] = v; });
    frames.push({ array: [...a], comparing: [], swapping: [], sorted: merged.map((_, i) => i + start), label: `Merged: [${merged.join(',')}]`, activeLine: 8, variables: {} });
    return merged;
  }

  function merge(left: number[], right: number[], start: number): number[] {
    const result: number[] = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      frames.push({ array: [...a], comparing: [start + i, start + left.length + j], swapping: [], sorted: [], label: `Comparing ${left[i]} and ${right[j]}`, activeLine: 12, variables: { left: left[i], right: right[j] } });
      if (left[i] <= right[j]) result.push(left[i++]);
      else result.push(right[j++]);
    }
    return [...result, ...left.slice(i), ...right.slice(j)];
  }

  mergeSort(a, 0);
  frames.push({ array: [...a], comparing: [], swapping: [], sorted: a.map((_, i) => i), label: '✅ Array fully sorted!', activeLine: 1, variables: {} });
  return frames;
}

export function generateBinarySearchFrames(arr: number[], target: number): VisFrame[] {
  const sorted = [...arr].sort((a, b) => a - b);
  const frames: VisFrame[] = [];
  let left = 0, right = sorted.length - 1;

  frames.push({ array: sorted, comparing: [], swapping: [], sorted: [], label: `Searching for ${target} in sorted array`, activeLine: 1, variables: { target, left, right } });

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    frames.push({ array: sorted, comparing: [left, mid, right], swapping: [], sorted: [], label: `mid=${mid}, arr[mid]=${sorted[mid]}`, activeLine: 4, variables: { left, mid, right, 'arr[mid]': sorted[mid] } });

    if (sorted[mid] === target) {
      frames.push({ array: sorted, comparing: [], swapping: [], sorted: [mid], label: `✅ Found ${target} at index ${mid}!`, activeLine: 6, variables: { result: mid } });
      return frames;
    } else if (sorted[mid] < target) {
      left = mid + 1;
      frames.push({ array: sorted, comparing: [], swapping: [], sorted: [], label: `${sorted[mid]} < ${target}, search right half`, activeLine: 8, variables: { left, right } });
    } else {
      right = mid - 1;
      frames.push({ array: sorted, comparing: [], swapping: [], sorted: [], label: `${sorted[mid]} > ${target}, search left half`, activeLine: 10, variables: { left, right } });
    }
  }
  frames.push({ array: sorted, comparing: [], swapping: [], sorted: [], label: `❌ ${target} not found`, activeLine: 12, variables: { result: -1 } });
  return frames;
}

export function generateFibonacciFrames(n: number): VisFrame[] {
  const frames: VisFrame[] = [];
  const memo: number[] = new Array(n + 1).fill(0);
  frames.push({ array: [...memo], comparing: [], swapping: [], sorted: [], label: `Starting Fibonacci for n=${n}`, activeLine: 1, variables: { n } });

  memo[0] = 0;
  frames.push({ array: [...memo], comparing: [0], swapping: [], sorted: [0], label: 'Base case: fib(0) = 0', activeLine: 2, variables: { 'memo[0]': 0 } });
  
  if (n > 0) {
    memo[1] = 1;
    frames.push({ array: [...memo], comparing: [1], swapping: [], sorted: [0, 1], label: 'Base case: fib(1) = 1', activeLine: 2, variables: { 'memo[1]': 1 } });
  }

  for (let i = 2; i <= n; i++) {
    frames.push({ array: [...memo], comparing: [i-1, i-2], swapping: [], sorted: Array.from({length: i}, (_, idx) => idx), label: `Calculating fib(${i}) = fib(${i-1}) + fib(${i-2})`, activeLine: 4, variables: { i, 'fib(i-1)': memo[i-1], 'fib(i-2)': memo[i-2] } });
    memo[i] = memo[i - 1] + memo[i - 2];
    frames.push({ array: [...memo], comparing: [], swapping: [i], sorted: Array.from({length: i + 1}, (_, idx) => idx), label: `fib(${i}) = ${memo[i]} stored in memo`, activeLine: 5, variables: { i, result: memo[i] } });
  }

  frames.push({ array: [...memo], comparing: [], swapping: [], sorted: memo.map((_, i) => i), label: `✅ Fibonacci sequence up to ${n} complete!`, activeLine: 6, variables: { result: memo[n] } });
  return frames;
}

export function generateStackFrames(): VisFrame[] {
  const frames: VisFrame[] = [];
  const items: number[] = [];
  
  frames.push({ array: [], comparing: [], swapping: [], sorted: [], label: 'Stack initialized', activeLine: 2, variables: { size: 0 } });

  const vals = [10, 20, 30];
  for (let v of vals) {
    frames.push({ array: [...items], comparing: [], swapping: [], sorted: [], label: `Pushing ${v} to stack`, activeLine: 6, variables: { push: v } });
    items.push(v);
    frames.push({ array: [...items], comparing: [], swapping: [items.length - 1], sorted: [], label: `${v} added to top`, activeLine: 7, variables: { top: v, size: items.length } });
  }

  frames.push({ array: [...items], comparing: [], swapping: [items.length - 1], sorted: [], label: 'Peeking top element', activeLine: 14, variables: { peek: items[items.length - 1] } });

  const popped = items.pop();
  frames.push({ array: [...items, popped!], comparing: [items.length], swapping: [], sorted: [], label: `Popping top element: ${popped}`, activeLine: 10, variables: { popped: popped ?? 0, size: items.length } });
  frames.push({ array: [...items], comparing: [], swapping: [], sorted: [], label: `Element removed. New top: ${items[items.length - 1]}`, activeLine: 11, variables: { size: items.length } });

  return frames;
}

export function generateBFSFrames(): VisFrame[] {
  const frames: VisFrame[] = [];
  const graph: Record<string, string[]> = {
    A: ['B', 'C'], B: ['D', 'E'], C: ['F'], D: [], E: [], F: []
  };
  const nodes = Object.keys(graph);
  const nodeToIndex = Object.fromEntries(nodes.map((n, i) => [n, i]));
  const visited = new Set<string>();
  const queue: string[] = ['A'];
  const order: string[] = [];
  
  frames.push({ array: new Array(nodes.length).fill(0).map((_, i) => i), comparing: [], swapping: [], sorted: [], label: 'Starting BFS from node A', activeLine: 1, variables: { queue: '["A"]', visited: '[]' } });

  visited.add('A');
  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);
    const nodeIdx = nodeToIndex[node];
    
    frames.push({ array: nodes.map((_, i) => i), comparing: [nodeIdx], swapping: [], sorted: order.map(n => nodeToIndex[n]), label: `Dequeued ${node}, visiting unvisited neighbors`, activeLine: 8, variables: { node, queue: JSON.stringify(queue), visited: Array.from(visited).join(', ') } });

    for (const neighbor of graph[node]) {
      const neighborIdx = nodeToIndex[neighbor];
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        frames.push({ array: nodes.map((_, i) => i), comparing: [neighborIdx], swapping: [], sorted: order.map(n => nodeToIndex[n]), label: `Discovered unvisited neighbor ${neighbor}, adding to queue`, activeLine: 13, variables: { neighbor, queue: JSON.stringify(queue), visited: Array.from(visited).join(', ') } });
      }
    }
  }

  frames.push({ array: nodes.map((_, i) => i), comparing: [], swapping: [], sorted: nodes.map((_, i) => i), label: '✅ BFS traversal complete!', activeLine: 17, variables: { order: order.join(' → ') } });
  return frames;
}

export function generateDFSFrames(): VisFrame[] {
  const frames: VisFrame[] = [];
  const graph: Record<string, string[]> = {
    A: ['B', 'C'], B: ['D', 'E'], C: ['F'], D: [], E: [], F: []
  };
  const nodes = Object.keys(graph);
  const nodeToIndex = Object.fromEntries(nodes.map((n, i) => [n, i]));
  const visited = new Set<string>();
  const order: string[] = [];

  frames.push({ array: nodes.map((_, i) => i), comparing: [], swapping: [], sorted: [], label: 'Starting DFS from node A', activeLine: 1, variables: { visited: '[]' } });

  function dfsRecursive(node: string) {
    visited.add(node);
    order.push(node);
    const nodeIdx = nodeToIndex[node];
    
    frames.push({ array: nodes.map((_, i) => i), comparing: [nodeIdx], swapping: [], sorted: order.map(n => nodeToIndex[n]), label: `Visiting node ${node}`, activeLine: 2, variables: { node, visited: Array.from(visited).join(', ') } });

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        frames.push({ array: nodes.map((_, i) => i), comparing: [nodeToIndex[neighbor]], swapping: [], sorted: order.map(n => nodeToIndex[n]), label: `Exploring neighbor ${neighbor} of ${node}`, activeLine: 5, variables: { neighbor, parent: node } });
        dfsRecursive(neighbor);
      }
    }
  }

  dfsRecursive('A');
  frames.push({ array: nodes.map((_, i) => i), comparing: [], swapping: [], sorted: nodes.map((_, i) => i), label: '✅ DFS traversal complete!', activeLine: 9, variables: { order: order.join(' → ') } });
  return frames;
}

export function generateFrames(algoId: string, arr: number[]): VisFrame[] {
  switch (algoId) {
    case 'bubble-sort': return generateBubbleSortFrames(arr);
    case 'selection-sort': return generateSelectionSortFrames(arr);
    case 'insertion-sort': return generateInsertionSortFrames(arr);
    case 'merge-sort': return generateMergeSortFrames(arr);
    case 'binary-search': return generateBinarySearchFrames(arr, arr[Math.floor(arr.length / 2)]);
    case 'fibonacci': return generateFibonacciFrames(8);
    case 'stack-impl': return generateStackFrames();
    case 'bfs': return generateBFSFrames();
    case 'dfs': return generateDFSFrames();
    default: return generateBubbleSortFrames(arr);
  }
}

