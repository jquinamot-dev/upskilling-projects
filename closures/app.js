// this function creates a large object and sets up an event listener and may cause memory leaks if not handled properly
function createBigObject() {
  const bigData = new Array(1000000).fill("₱");

  document.getElementById("big-data").addEventListener("click", function () {
    console.log("test");
    console.log(bigData.length);
  });
}

createBigObject();

// To prevent potential memory leaks, consider removing the event listener when it's no longer needed
function createBigObjectWithCleanup() {
  const bigData = new Array(1000000).fill("₱");
  const element = document.getElementById("big-data");

  function handleClick() {
    console.log("test");
    console.log(bigData.length);
  }

  element.addEventListener("click", handleClick);

  // Cleanup function to remove the event listener
  return function cleanup() {
    element.removeEventListener("click", handleClick);
  };
}

const cleanupBigObject = createBigObjectWithCleanup();

// Call cleanupBigObject() when you want to remove the event listener and free up memory
