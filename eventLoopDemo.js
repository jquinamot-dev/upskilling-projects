console.log("A"); // Runs immediately (call stack)

// setTimeout is registered in the macrotask queue
setTimeout(() => {
  console.log("B");
}, 0);

// Promise.resolve().then is registered in the microtask queue
Promise.resolve().then(() => {
  console.log("C");
});

console.log("D"); // Runs immediately (call stack) second stack item

// queueMicrotask is registered in the microtask queue
// (This will execute first since it's a scheduled task that will be executed before any regular (macrotask) events and after the synchronous code has finished executing.)
queueMicrotask(() => {
  console.log("E");
});
