const TASK_STATE_PENDING = 1;
const TASK_STATE_IN_PROGRESS = 2;
const TASK_STATE_FINISHED = 3;
const TASK_STATE_CANCELLED = 4;

const taskStates = new Map();
taskStates.set("All", "");
taskStates.set("Pending", TASK_STATE_PENDING);
taskStates.set("In Progress", TASK_STATE_IN_PROGRESS);
taskStates.set("Finished", TASK_STATE_FINISHED);
taskStates.set("Cancelled", TASK_STATE_CANCELLED);

function getTaskStateId(status) {
  return taskStates.has(status) ? taskStates.get(status) : "";
}

function getTaskStatuses() {
  return [...taskStates.keys()];
}

module.exports = {
  getTaskStateId,
  getTaskStatuses
};
