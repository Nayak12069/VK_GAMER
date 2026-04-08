let taskQueue = [];

function addTask(task) {
  taskQueue.push(task);
}

function getNextTask() {
  return taskQueue.shift();
}

function clearTasks() {
  taskQueue = [];
}

module.exports = { addTask, getNextTask, clearTasks };
