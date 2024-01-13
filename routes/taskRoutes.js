const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

router.get("/test", (req, res) => {
  res.json({
    message: "Task routes are working!",
    user: req.user,
  });
});

// CRUD tasks for authenticated users

//create a task
router.post("/", async (req, res) => {
  try {
    // description, completed from req.body
    // owner : req.user._id
    const task = new Task({
      ...req.body,
    
    });
    await task.save();
    res.status(201).json({ task, message: "Task Created Successfully" });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

// get user tasks
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const tasks = await Task.find().skip(skip).limit(limit);
    const totalTasks = await Task.countDocuments();
    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      tasks,
      count: tasks.length,
      page,
      totalPages,
      totalTasks,
      message: 'Tasks Fetched Successfully',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// update a task by id   -   description , completed
router.patch("/:id", async (req, res) => {
  const taskid = req.params.id;
  const updates = Object.keys(req.body);
  
  console.log(updates);
  
  const allowedUpdates = ["Name", "Email"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  console.log(isValidOperation);
  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid Updates" });
  }

  try {
    const task = await Task.findOne({
      _id: taskid,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.status(200).json({
      task,
      message: "Task Updated Successfully",
    });
  } catch (err) {
    res.status(500).send({ error, message:"Task Updated Successfully" });
  }
});
// delete a task by id
router.delete("/:id",  async (req, res) => {
  const taskid = req.params.id;

  try {
    const task = await Task.findOneAndDelete({
      _id: taskid,
     
    });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ task, message: "Task Deleted Successfully" });
  } catch (err) {
    res.status(500).send({ error });
  }
});

module.exports = router;
