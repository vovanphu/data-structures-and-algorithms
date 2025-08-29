# 📚 Data Structures & Algorithms in TypeScript

A comprehensive TypeScript library providing robust and thoroughly tested implementations of core data structures and algorithms. Designed for learning, reference, and easy integration into your projects.

---

## Table of Contents

- [📚 Data Structures \& Algorithms in TypeScript](#-data-structures--algorithms-in-typescript)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
    - [Data Structures](#data-structures)
    - [Algorithms](#algorithms)
  - [Project Goals](#project-goals)
  - [Project Structure](#project-structure)
  - [How to Use](#how-to-use)
  - [License](#license)

---

## Key Features

This library includes a rich collection of data structures and algorithms, implemented in TypeScript with a focus on performance and correctness.

### Data Structures

*   **Graph:**
    *   `Graph`, `DirectedGraph`, `UndirectedGraph`: Classes representing graphs with various storage options.
    *   **Storage Strategies:** Adjacency List, Adjacency Matrix, Edge List.
    *   **Traversal Strategies:** BFS (Breadth-First Search), DFS (Depth-First Search) - both recursive and iterative.
*   **Heap:**
    *   `BinaryHeap`: Standard binary heap.
    *   `D-aryHeap`: Generalized d-ary heap.
*   **Linked List:**
    *   `SingleNode`, `DoubleNode`: Basic nodes for singly and doubly linked lists.
*   **Queue:**
    *   `Queue`: Basic FIFO queue.
    *   `PriorityQueue`: Priority queue.
    *   `IndexedPriorityQueue`: Indexed priority queue.

### Algorithms

*   **Graph Algorithms:**
    *   **Shortest Path:** Dijkstra, Bellman-Ford, Floyd-Warshall, DAG Shortest Path, Grid Shortest Path.
    *   **Maximum Flow:** Ford-Fulkerson (with DFS, Edmonds-Karp, Dinic, Capacity Scaling strategies).
    *   **Minimum Spanning Tree:** Prim.
    *   **Traversal and Analysis:** DFS, BFS, Find Components, Topological Sort (DFS & Kahn's algorithm), Articulation Points, Bridges, Eulerian Path.
    *   **Other Algorithms:** Tarjan (Strongly Connected Components), Held-Karp (Traveling Salesperson Problem).
*   **Array Algorithms:**
    *   `KthLargestElement`: Finds the k-th largest element in an array.

---

## Project Goals

This project serves as a personal learning and reference resource, developed to:

*   Solidify core concepts through a code-first implementation.
*   Ensure correctness by writing comprehensive unit tests with Jest.
*   Provide a platform for exploring more advanced algorithms and data structures in the future.

---

## Project Structure

The project is organized into two main directories:

```
.
├── src/
│   ├── algorithms/         # Contains algorithm implementations
│   │   ├── array/          # Array algorithms
│   │   └── graph/          # Graph algorithms (with subdirectories for each algorithm)
│   └── data-structures/    # Contains data structure implementations
│       ├── graph/          # Graph data structures
│       ├── heap/           # Heap data structures
│       ├── linked-list/    # Linked list data structures
│       └── queue/          # Queue data structures
├── package.json            # Project information and dependencies
├── tsconfig.json           # TypeScript configuration
├── jest.config.js          # Jest configuration
└── README.md               # Project documentation
```

---

## How to Use

To get started with this library, follow these steps:

1.  **Clone repository:**
    ```bash
    git clone https://github.com/vovanphu/data-structures-and-algorithms.git
    cd data-structures-and-algorithms
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run tests:**
    To ensure everything is working correctly, you can run all unit tests:
    ```bash
    npx jest
    ```
4.  **Use in your project:**
    You can import and use the data structures and algorithms in your TypeScript files. For example:

    ```typescript
    // Example using Dijkstra's algorithm
    import { Graph } from './src/data-structures/graph/graph.class';
    import { dijkstra } from './src/algorithms/graph/dijkstra/dijkstra';
    import { reconstructPath } from './src/algorithms/graph/reconstruct-path';

    // Create a graph with an edge list
    const graph = new Graph([
      [0, 1, 1], // Edge from 0 to 1 with weight 1
      [1, 2, 2], // Edge from 1 to 2 with weight 2
      [0, 2, 4], // Edge from 0 to 2 with weight 4
    ]);

    const startIndex = 0;
    const endIndex = 2;

    const [distances, previousVertices] = dijkstra(graph, startIndex);
    console.log('Distances from start:', distances);
    // Expected Output (distances from 0):
    // [0, 1, 3] (distances to 0, 1, 2 respectively)

    const path = reconstructPath(previousVertices, startIndex, endIndex);
    console.log(`Path from ${startIndex} to ${endIndex}:`, path);
    // Expected Output (path from 0 to 2):
    // [0, 1, 2]
    ```

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
