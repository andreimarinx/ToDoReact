import { Alert, AlertIcon, Box, Button, HStack, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { User } from "./Main";
import { Task } from "./TaskList";

interface Props {
  user: User;
  task: Task;
  setTaskAdded: (setter: boolean) => void;
  taskAdded: boolean;
}

const TaskBlock = ({ user, task, setTaskAdded, taskAdded }: Props) => {
  const onDelete = () => {
    axios.delete("https://todoserveer.onrender.com/users/task/" + user._id, { data: { id: task._id } }).then((res) => {
      console.log(res);
      setTaskAdded(!taskAdded);
    });
  };
  return (
    <Box bg={"gray.900"} padding={5} borderRadius={20} marginTop={2}>
      <HStack justifyContent={"space-between"}>
        <Text>{task.taskName}</Text>
        <Button colorScheme="green" size={"sm"} onClick={onDelete}>
          Complete
        </Button>
      </HStack>
    </Box>
  );
};

export default TaskBlock;
