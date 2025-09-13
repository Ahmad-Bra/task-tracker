const fs = require("fs");
const path = require("path");
const taskFilePath = path.join(__dirname, "tasks.json");

const args = process.argv.slice(2);

// read all tasks from tasks.json
function readTasks() {
  if (fs.existsSync(taskFilePath)) {
    const data = fs.readFileSync(taskFilePath, "utf-8");
    try {
      return JSON.parse(data);
    } catch (err) {
      console.error(
        "Error: tasks.json is invalid or corrupted. Returning an empty task list."
      );
      return [];
    }
  }
  return [];
}

// add, update, delete tasks in tasks.json
function writeTasks(tasks) {
  const data = JSON.stringify(tasks, null, 2);
  fs.writeFileSync(taskFilePath, data, "utf-8");
}

const command = args[0];

if (command === "list") {
  const tasks = readTasks();
  console.log("Tasks:");
  tasks.forEach((task) => {
    if (args[1] === "done") {
      if (task.status === "done") {
        console.log(
          `- ID: ${task.id}
      - title: ${task.title}
      - status: ${task.status}
      - description: ${task.description || "No description"}
      - Created At: ${task.createdAt}
      - Updated At: ${task.updatedAt}`
        );
      }
    } else if (args[1] === "in-progress") {
      if (task.status === "in-progress") {
        console.log(
          `- ID: ${task.id}
      - title: ${task.title}
      - status: ${task.status}
      - description: ${task.description || "No description"}
      - Created At: ${task.createdAt}
      - Updated At: ${task.updatedAt}`
        );
      }
    } else if (args[1] === "todo") {
      if (task.status === "todo") {
        console.log(
          `- ID: ${task.id}
      - title: ${task.title}
      - status: ${task.status}
      - description: ${task.description || "No description"}
      - Created At: ${task.createdAt}
      - Updated At: ${task.updatedAt}`
        );
      }
    } else if (!args[1]) {
      console.log(
        `- ID: ${task.id}
      - title: ${task.title}
      - status: ${task.status}
      - description: ${task.description || "No description"}
      - Created At: ${task.createdAt}
      - Updated At: ${task.updatedAt}`
      );
    }
  });
} else if (command === "add") {
  const title = args[1];
  const description = args.slice(2).join(" ") || "";
  const tasks = readTasks();
  tasks.push({
    id: tasks.length + 1,
    title,
    status: "todo",
    description,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  writeTasks(tasks);
  console.log(`Task added: ${title}`);
} else if (command === "delete") {
  const index = parseInt(args[1], 10);
  const tasks = readTasks();
  if (!isNaN(index) && index > 0 && index <= tasks.length) {
    const deletedTask = tasks.splice(index - 1, 1);
    writeTasks(tasks);
    console.log(`Task deleted: ${deletedTask[0].title}`);
  } else {
    console.error("Invalid task index.");
  }
} else if (command === "update") {
  const index = parseInt(args[1], 10);
  const newTitle = args[2];
  const newDescription = args.slice(3).join(" ") || "";
  const tasks = readTasks();
  if (!isNaN(index) && index > 0 && index <= tasks.length) {
    tasks[index - 1].title = newTitle;
    tasks[index - 1].description = newDescription;
    tasks[index - 1].updatedAt = new Date().toISOString();
    writeTasks(tasks);
    console.log(`Task updated: ${tasks[index - 1].title}`);
  } else {
    console.error("Invalid task index.");
  }
} else if (command === "mark-in-progress") {
  const index = parseInt(args[1], 10);
  const tasks = readTasks();
  if (!isNaN(index) && index > 0 && index <= tasks.length) {
    tasks[index - 1].status = "in-progress";
    writeTasks(tasks);
    console.log(`updated task status: ${tasks[index - 1].title}`);
  } else {
    console.log("Invalid task index.");
  }
} else if (command === "mark-done") {
  const index = parseInt(args[1], 10);
  const tasks = readTasks();
  if (!isNaN(index) && index > 0 && index <= tasks.length) {
    tasks[index - 1].status = "done";
    writeTasks(tasks);
    console.log(`updated task status: ${tasks[index - 1].title}`);
  } else {
    console.log("Invalid task index.");
  }
}
