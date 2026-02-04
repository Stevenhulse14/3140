/* Practice Drills - Test Functions */

// Drill 1: Count Evens
function testDrill1() {
  const resultEl = document.getElementById('drill1-result');
  
  // Student should implement this function
  function countEvens(nums) {
    let count = 0;
    for (const n of nums) {
      if (n % 2 === 0) count++;
    }
    return count;
  }
  
  // Test cases
  const test1 = countEvens([1,2,3,4,5,6]) === 3;
  const test2 = countEvens([2,4,6,8]) === 4;
  const test3 = countEvens([1,3,5]) === 0;
  
  if (test1 && test2 && test3) {
    resultEl.textContent = '✅ All tests passed! Great job!';
    resultEl.className = 'result success';
  } else {
    resultEl.textContent = '❌ Some tests failed. Check your logic!';
    resultEl.className = 'result error';
  }
}

// Drill 2: Find Maximum
function testDrill2() {
  const resultEl = document.getElementById('drill2-result');
  
  function findMax(nums) {
    let max = nums[0];
    for (const n of nums) {
      if (n > max) max = n;
    }
    return max;
  }
  
  const test1 = findMax([3, 7, 2, 9, 1]) === 9;
  const test2 = findMax([-5, -2, -10]) === -2;
  const test3 = findMax([42]) === 42;
  
  if (test1 && test2 && test3) {
    resultEl.textContent = '✅ All tests passed! Great job!';
    resultEl.className = 'result success';
  } else {
    resultEl.textContent = '❌ Some tests failed. Check your logic!';
    resultEl.className = 'result error';
  }
}

// Drill 3: Remove Short Words
function testDrill3() {
  const resultEl = document.getElementById('drill3-result');
  
  function removeShort(words, minLen) {
    return words.filter(word => word.length >= minLen);
  }
  
  const result1 = removeShort(['hi', 'hello', 'world', 'a'], 3);
  const test1 = JSON.stringify(result1) === JSON.stringify(['hello', 'world']);
  const test2 = removeShort(['a', 'ab', 'abc'], 2).length === 2;
  
  if (test1 && test2) {
    resultEl.textContent = '✅ All tests passed! Great job!';
    resultEl.className = 'result success';
  } else {
    resultEl.textContent = '❌ Some tests failed. Check your logic!';
    resultEl.className = 'result error';
  }
}

// Drill 4: Most Common Item
function testDrill4() {
  const resultEl = document.getElementById('drill4-result');
  
  function mostCommon(inv) {
    let bestKey = null;
    let bestVal = -Infinity;
    for (const key in inv) {
      if (inv[key] > bestVal) {
        bestVal = inv[key];
        bestKey = key;
      }
    }
    return bestKey;
  }
  
  const test1 = mostCommon({ apple: 2, banana: 5, pear: 1 }) === 'banana';
  const test2 = mostCommon({ a: 10, b: 5, c: 10 }) === 'a'; // First one wins
  const test3 = mostCommon({ x: 1 }) === 'x';
  
  if (test1 && test2 && test3) {
    resultEl.textContent = '✅ All tests passed! Great job!';
    resultEl.className = 'result success';
  } else {
    resultEl.textContent = '❌ Some tests failed. Check your logic!';
    resultEl.className = 'result error';
  }
}

