type adjacencyList = {
  [key: string]: Array<string>
};
type visitedMatrixType = {
  [key: string]: boolean
};
type queueElement = {
  state: string,
  depth: number,
}

const getDistance = (map: adjacencyList,start: string, destination: string) => {
  if (start === 'HI' || start === 'AK' || destination == 'HI' || destination == 'AK') return 999;
  if (!(start in map) || !(destination in map)) return -1;

  const visited: visitedMatrixType = {};
  const queue: Array<queueElement> = [];

  queue.push({ state: start, depth: 0 });

  while (queue.length > 0) {
    const current: queueElement | undefined = queue.shift();

    if (!current) continue;
    if (visited[current.state]) continue;

    if (current.state === destination) {
      return current.depth;
    }
    
    visited[current.state] = true;

    for (let state of map[current.state]) {
      queue.push({ state: state, depth: current.depth + 1 });
    }
  }

  return -1;
}

export default getDistance;
export type { adjacencyList, visitedMatrixType, queueElement };
