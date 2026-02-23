/**
 * Asynchronicity Demo
 * Demonstrates callbacks, promises, and async/await patterns
 */

console.log('=== Asynchronicity Demo ===\n');

// ============================================
// 1. CALLBACKS
// ============================================
console.log('1. CALLBACKS');
console.log('-------------------');

// Simulate an async operation with callback
function fetchDataWithCallback(callback) {
    setTimeout(() => {
        const data = { id: 1, name: 'John Doe', email: 'john@example.com' };
        callback(null, data);
    }, 1000);
}

fetchDataWithCallback((error, data) => {
    if (error) {
        console.error('Error:', error);
    } else {
        console.log('Callback result:', data);
    }
});

// Callback hell example (nested callbacks)
function step1(callback) {
    setTimeout(() => callback('Step 1 complete'), 500);
}

function step2(callback) {
    setTimeout(() => callback('Step 2 complete'), 500);
}

function step3(callback) {
    setTimeout(() => callback('Step 3 complete'), 500);
}

// Nested callbacks (callback hell)
step1((result1) => {
    console.log(result1);
    step2((result2) => {
        console.log(result2);
        step3((result3) => {
            console.log(result3);
        });
    });
});

console.log('\n');

// ============================================
// 2. PROMISES
// ============================================
console.log('2. PROMISES');
console.log('-------------------');

// Create a promise
function fetchDataWithPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.2; // 80% success rate
            if (success) {
                resolve({ id: 2, name: 'Jane Smith', email: 'jane@example.com' });
            } else {
                reject(new Error('Failed to fetch data'));
            }
        }, 1000);
    });
}

// Using .then() and .catch()
fetchDataWithPromise()
    .then(data => {
        console.log('Promise resolved:', data);
    })
    .catch(error => {
        console.error('Promise rejected:', error.message);
    });

// Chaining promises
function getUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => resolve({ id, name: `User ${id}` }), 300);
    });
}

function getUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{ id: 1, title: 'Post 1' }, { id: 2, title: 'Post 2' }]), 300);
    });
}

getUser(1)
    .then(user => {
        console.log('User:', user);
        return getUserPosts(user.id);
    })
    .then(posts => {
        console.log('Posts:', posts);
    });

// Promise.all() - run promises in parallel
const promise1 = new Promise(resolve => setTimeout(() => resolve('Promise 1'), 500));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Promise 2'), 600));
const promise3 = new Promise(resolve => setTimeout(() => resolve('Promise 3'), 400));

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log('Promise.all results:', results);
    });

console.log('\n');

// ============================================
// 3. ASYNC/AWAIT
// ============================================
console.log('3. ASYNC/AWAIT');
console.log('-------------------');

// Async function
async function fetchDataAsync() {
    try {
        const data = await fetchDataWithPromise();
        console.log('Async/Await result:', data);
        return data;
    } catch (error) {
        console.error('Async error:', error.message);
        throw error;
    }
}

fetchDataAsync();

// Sequential async operations
async function sequentialOperations() {
    const user = await getUser(5);
    console.log('Sequential - User:', user);
    
    const posts = await getUserPosts(user.id);
    console.log('Sequential - Posts:', posts);
    
    return { user, posts };
}

sequentialOperations();

// Parallel async operations
async function parallelOperations() {
    const [user1, user2, user3] = await Promise.all([
        getUser(10),
        getUser(11),
        getUser(12)
    ]);
    
    console.log('Parallel users:', [user1, user2, user3]);
}

parallelOperations();

// ============================================
// 4. ERROR HANDLING COMPARISON
// ============================================
console.log('\n4. ERROR HANDLING');
console.log('-------------------');

// Callback error handling
function mightFailCallback(success, callback) {
    setTimeout(() => {
        if (success) {
            callback(null, 'Success!');
        } else {
            callback(new Error('Callback error'), null);
        }
    }, 200);
}

mightFailCallback(true, (err, result) => {
    if (err) {
        console.error('Callback error:', err.message);
    } else {
        console.log('Callback success:', result);
    }
});

// Promise error handling
function mightFailPromise(success) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            success ? resolve('Success!') : reject(new Error('Promise error'));
        }, 200);
    });
}

mightFailPromise(true)
    .then(result => console.log('Promise success:', result))
    .catch(err => console.error('Promise error:', err.message));

// Async/Await error handling
async function mightFailAsync(success) {
    try {
        const result = await mightFailPromise(success);
        console.log('Async success:', result);
    } catch (err) {
        console.error('Async error:', err.message);
    }
}

mightFailAsync(true);

// ============================================
// 5. REAL-WORLD EXAMPLE: API SIMULATION
// ============================================
console.log('\n5. REAL-WORLD EXAMPLE');
console.log('-------------------');

// Simulate API calls
function apiCall(endpoint) {
    return new Promise((resolve) => {
        const delay = Math.random() * 1000 + 500;
        setTimeout(() => {
            resolve({ endpoint, data: `Data from ${endpoint}`, timestamp: Date.now() });
        }, delay);
    });
}

async function fetchUserDashboard(userId) {
    console.log(`Fetching dashboard for user ${userId}...`);
    
    try {
        const [profile, settings, notifications] = await Promise.all([
            apiCall(`/users/${userId}/profile`),
            apiCall(`/users/${userId}/settings`),
            apiCall(`/users/${userId}/notifications`)
        ]);
        
        console.log('Dashboard loaded:', {
            profile: profile.data,
            settings: settings.data,
            notifications: notifications.data
        });
        
        return { profile, settings, notifications };
    } catch (error) {
        console.error('Failed to load dashboard:', error);
        throw error;
    }
}

// Wait a bit before running the dashboard example
setTimeout(() => {
    fetchUserDashboard(123);
}, 2000);

console.log('\n=== Demo Complete ===');
console.log('Note: Some operations are asynchronous and will complete after this message.');
