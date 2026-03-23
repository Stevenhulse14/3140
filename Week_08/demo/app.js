const getItem = 58;
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function findElement(arr, item, callback) {
  return callback(arr, item);
}

findElement(arr, getItem, (a, i) => a[i - 1]);
