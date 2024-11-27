import axios from "axios";
import React, { useEffect, useState } from "react";
import { User } from "./Main";
import TaskBlock from "./TaskBlock";

export interface Task {
  taskName: string;
  _id: string;
}

interface Props {
  user: User;
  setTaskAdded: (setter: boolean) => void;
  taskAdded: boolean;
}

const TaskList = ({ user, taskAdded, setTaskAdded }: Props) => {
  const [tasks, setTasks] = useState<Task[]>();
  useEffect(() => {
    axios.get("https://todoserveer.onrender.com/users/task/" + user._id).then((res) => {
      console.log(res.data.tasks);
      setTasks(res.data.tasks);
    });
  }, [taskAdded]);

  return (
    <ul>
      {tasks?.map((task) => (
        <TaskBlock setTaskAdded={setTaskAdded} taskAdded={taskAdded} task={task} user={user} />
      ))}
    </ul>
  );
};

export default TaskList;
