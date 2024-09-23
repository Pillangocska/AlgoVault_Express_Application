const AlgoModel = require('./models/algo');
const UserModel = require('./models/user');
const bcrypt = require('bcrypt');

const insertDemoData = async () => {
  try {
    const users = [
        {
            username: 'john_doe',
            password: await bcrypt.hash('password123', 10),
            phone: '+1234567890',
            address: '123 Main St, Anytown, USA',
            specialized: 'Machine Learning'
          },
          {
            username: 'jane_smith',
            password: await bcrypt.hash('securePass456', 10),
            phone: '+1987654321',
            address: '456 Oak Ave, Another City, USA',
            specialized: 'Statistics'
          },
          {
            username: 'bob_johnson',
            password: await bcrypt.hash('bobsPassword789', 10),
            phone: '+1122334455',
            address: '789 Pine Rd, Somewhere, USA',
            specialized: 'Data Science'
          }
    ];

    const savedUsers = await UserModel.insertMany(users);
    console.log('Demo users saved successfully');

    const algorithms = [
      {
        name: 'Quicksort',
        category: 'Sorting',
        timeComplexity: 'O(n log n) average, O(n^2) worst case',
        spaceComplexity: 'O(log n)',
        dateAdded: new Date().toISOString(),
        description: 'Quicksort is a divide-and-conquer algorithm. It works by selecting a "pivot" element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot.',
        pseudocode: `
function quicksort(arr, low, high)
  if low < high
    pivot_index = partition(arr, low, high)
    quicksort(arr, low, pivot_index - 1)
    quicksort(arr, pivot_index + 1, high)

function partition(arr, low, high)
  pivot = arr[high]
  i = low - 1
  for j = low to high - 1
    if arr[j] <= pivot
      i = i + 1
      swap arr[i] with arr[j]
  swap arr[i + 1] with arr[high]
  return i + 1
        `,
        _author: savedUsers[0]._id
      },
      {
        name: 'Dijkstra\'s Algorithm',
        category: 'Graph',
        timeComplexity: 'O((V + E) log V) with binary heap',
        spaceComplexity: 'O(V)',
        dateAdded: new Date().toISOString(),
        description: 'Dijkstra\'s algorithm is used to find the shortest path between nodes in a graph, which may represent, for example, road networks.',
        pseudocode: `
function dijkstra(graph, start)
  distances = array filled with infinity, size of graph
  distances[start] = 0
  pq = priority queue containing (start, 0)
  while pq is not empty
    current = pq.pop()
    for each neighbor of current
      if distances[current] + weight(current, neighbor) < distances[neighbor]
        distances[neighbor] = distances[current] + weight(current, neighbor)
        pq.push((neighbor, distances[neighbor]))
  return distances
        `,
        _author: savedUsers[1]._id
      },
      {
        name: 'Binary Search',
        category: 'Searching',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        dateAdded: new Date().toISOString(),
        description: 'Binary search is a search algorithm that finds the position of a target value within a sorted array.',
        pseudocode: `
function binarySearch(arr, target)
  left = 0
  right = length(arr) - 1
  while left <= right
    mid = (left + right) / 2
    if arr[mid] == target
      return mid
    else if arr[mid] < target
      left = mid + 1
    else
      right = mid - 1
  return -1  // Target not found
        `,
        _author: savedUsers[2]._id
      },
      {
        name: 'Depth-First Search',
        category: 'Graph',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        dateAdded: new Date().toISOString(),
        description: 'Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a given node and explores as far as possible along each branch before backtracking.',
        pseudocode: `
function dfs(graph, start)
  visited = set()
  function dfs_recursive(node)
    if node not in visited
      visited.add(node)
      print(node)
      for each neighbor of node
        dfs_recursive(neighbor)
  dfs_recursive(start)
        `,
        _author: savedUsers[0]._id
      }
    ];

    await AlgoModel.insertMany(algorithms);
    console.log('Demo algorithms saved successfully');

  } catch (error) {
    console.error('Error inserting demo data:', error);
  }
};

module.exports = { insertDemoData };
