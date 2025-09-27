/**
 * @param {number[][]} roads
 * @param {number} seats
 * @return {number}
 */
var minimumFuelCost = function (roads, seats) {

  // make adjacent
  const adj = Array.from({ length: roads.length + 1 }, () => []);

  for (let [a, b] of roads) {
    adj[a].push(b);
    adj[b].push(a);
  }

  let fuel = 0;

  function dfs(node, parent) {
    let persons = 1;
    for (const next of adj[node]) {
      if (next === parent) continue;
      // groups of persons that are coming in
      const comingInPersons = dfs(next, node);
      // calculate what it cost to bring them only in the previous edge
      fuel += Math.ceil(comingInPersons / seats);
      // add them to the next coming in group
      persons += comingInPersons;
    }
    return persons;
  }
  dfs(0, -1);

  return fuel;
};


console.log(minimumFuelCost([[3, 1], [3, 2], [1, 0], [0, 4], [0, 5], [4, 6]], 2));
