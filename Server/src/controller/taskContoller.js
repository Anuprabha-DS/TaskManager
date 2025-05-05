const Task = require('../model/task');

exports.createTask = async (req, res) => {   
    const { title, description, status, color, list, repeatCycle, repeatDays } = req.body;
    
    try {
      const newTask = new Task({
        title,
        description,
        status: status || 'pending',
        color,
        user: req.user.id,
        list,
        repeatCycle,
        repeatDays
      });

      const task = await newTask.save();
      res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
  };



exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });  
}
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });  
}
};



exports.updateTask = async (req, res) => { 
  const { title, description, status, color, list, repeatCycle, repeatDays } = req.body;
  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.color = color || task.color;
    task.list = list || task.list;
    task.repeatCycle = repeatCycle || task.repeatCycle;
    task.repeatDays = repeatDays || task.repeatDays;

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });  
}
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await task.remove();
    res.status(200).json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });  
}
};