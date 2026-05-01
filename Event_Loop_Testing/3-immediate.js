const TIMEOUT_MS = 0;

console.log('Root Code - START');

setTimeout(() => {
  console.log('--Timeout 1');
}, TIMEOUT_MS);

setImmediate(() => {
  console.log('--Immediate 1');
});

setTimeout(() => {
  setTimeout(() => {
    console.log('--Timeout 3');
  }, TIMEOUT_MS);

  setImmediate(() => {
    console.log('--Immediate 2');
  });

  console.log('--Timeout 2');
}, TIMEOUT_MS);

console.log('Root Code - END - Event Loop Takes Over');


// Since the setTimeout is zero it will be random always 

/* 

Root Code - START
Root Code - END - Event Loop Takes Over
--Timeout 1
--Timeout 2
--Immediate 1
--Immediate 2
--Timeout 3

Root Code - START
Root Code - END - Event Loop Takes Over
--Immediate 1
--Timeout 1
--Timeout 2
--Immediate 2
--Timeout 3

Root Code - START
Root Code - END - Event Loop Takes Over
--Timeout 1
--Timeout 2
--Immediate 1
--Immediate 2
--Timeout 3

It’s not truly random—it’s non-deterministic because of how Node.js schedules different queues.

Let’s break your case clearly 👇

🧠 Key Idea

👉 setTimeout(fn, 0) → goes to Timers phase
👉 setImmediate(fn) → goes to Check phase

The order depends on which phase the event loop reaches first after your main code finishes.

*/


