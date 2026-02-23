/**
 * Async Micro Project: Task Queue Manager
 * Demonstrates practical asynchronicity patterns
 */

// Simulate a task that takes time to complete
function createTask(name, duration, priority = 1) {
    return {
        name,
        duration,
        priority,
        execute: () => {
            return new Promise((resolve, reject) => {
                const shouldFail = Math.random() < 0.1; // 10% failure rate
                
                setTimeout(() => {
                    if (shouldFail) {
                        reject(new Error(`Task "${name}" failed`));
                    } else {
                        resolve({
                            task: name,
                            duration,
                            completedAt: new Date().toISOString()
                        });
                    }
                }, duration);
            });
        }
    };
}

// Task Queue Manager
class TaskQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }

    add(task) {
        this.queue.push(task);
        // Sort by priority (higher priority first)
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    async executeSequential() {
        this.running = true;
        const results = [];
        const errors = [];

        console.log('\n=== Sequential Execution ===');
        console.log(`Processing ${this.queue.length} tasks sequentially...\n`);

        for (const task of this.queue) {
            try {
                console.log(`Starting: ${task.name} (Priority: ${task.priority})`);
                const result = await task.execute();
                results.push(result);
                console.log(`✓ Completed: ${task.name} in ${task.duration}ms\n`);
            } catch (error) {
                errors.push({ task: task.name, error: error.message });
                console.log(`✗ Failed: ${task.name} - ${error.message}\n`);
            }
        }

        this.running = false;
        return { results, errors };
    }

    async executeParallel() {
        this.running = true;
        console.log('\n=== Parallel Execution ===');
        console.log(`Processing ${this.queue.length} tasks in parallel...\n`);

        const startTime = Date.now();
        const promises = this.queue.map(async (task) => {
            try {
                console.log(`Starting: ${task.name} (Priority: ${task.priority})`);
                const result = await task.execute();
                console.log(`✓ Completed: ${task.name} in ${task.duration}ms`);
                return { success: true, result };
            } catch (error) {
                console.log(`✗ Failed: ${task.name} - ${error.message}`);
                return { success: false, error: error.message, task: task.name };
            }
        });

        const outcomes = await Promise.allSettled(promises);
        const totalTime = Date.now() - startTime;

        const results = outcomes
            .filter(o => o.status === 'fulfilled' && o.value.success)
            .map(o => o.value.result);
        
        const errors = outcomes
            .filter(o => o.status === 'fulfilled' && !o.value.success)
            .map(o => ({ task: o.value.task, error: o.value.error }));

        this.running = false;
        console.log(`\nTotal time: ${totalTime}ms\n`);

        return { results, errors, totalTime };
    }

    clear() {
        this.queue = [];
    }
}

// Main execution
async function main() {
    const queue = new TaskQueue();

    // Create various tasks
    queue.add(createTask('Database Backup', 800, 3));
    queue.add(createTask('Send Email', 300, 2));
    queue.add(createTask('Process Payment', 600, 5));
    queue.add(createTask('Generate Report', 1000, 1));
    queue.add(createTask('Update Cache', 200, 4));
    queue.add(createTask('Validate Data', 400, 3));

    // Execute sequentially
    const sequentialResults = await queue.executeSequential();
    console.log('Sequential Results Summary:');
    console.log(`  Successful: ${sequentialResults.results.length}`);
    console.log(`  Failed: ${sequentialResults.errors.length}`);
    console.log(`  Total time: ~${queue.queue.reduce((sum, t) => sum + t.duration, 0)}ms\n`);

    // Clear and recreate tasks for parallel execution
    queue.clear();
    queue.add(createTask('Database Backup', 800, 3));
    queue.add(createTask('Send Email', 300, 2));
    queue.add(createTask('Process Payment', 600, 5));
    queue.add(createTask('Generate Report', 1000, 1));
    queue.add(createTask('Update Cache', 200, 4));
    queue.add(createTask('Validate Data', 400, 3));

    // Execute in parallel
    const parallelResults = await queue.executeParallel();
    console.log('Parallel Results Summary:');
    console.log(`  Successful: ${parallelResults.results.length}`);
    console.log(`  Failed: ${parallelResults.errors.length}`);
    console.log(`  Total time: ${parallelResults.totalTime}ms`);
    console.log(`  Time saved: ~${queue.queue.reduce((sum, t) => sum + t.duration, 0) - parallelResults.totalTime}ms\n`);

    // Demonstrate Promise.all vs Promise.allSettled
    console.log('=== Promise.all vs Promise.allSettled ===\n');
    
    const tasks = [
        createTask('Task A', 300),
        createTask('Task B', 200),
        createTask('Task C (will fail)', 100)
    ];
    
    // Make Task C fail
    tasks[2].execute = () => Promise.reject(new Error('Task C failed'));

    console.log('Using Promise.all (stops on first error):');
    try {
        await Promise.all(tasks.map(t => t.execute()));
    } catch (error) {
        console.log(`  Error caught: ${error.message}`);
    }

    console.log('\nUsing Promise.allSettled (waits for all):');
    const settled = await Promise.allSettled(tasks.map(t => t.execute()));
    settled.forEach((result, i) => {
        if (result.status === 'fulfilled') {
            console.log(`  Task ${i + 1}: Success`);
        } else {
            console.log(`  Task ${i + 1}: Failed - ${result.reason.message}`);
        }
    });
}

// Run the demo
main().catch(console.error);
