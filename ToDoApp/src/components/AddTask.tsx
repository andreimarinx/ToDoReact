import { Alert, AlertIcon, Box, Button, HStack, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { User } from "./Main";

interface Props {
  user: User;
  setTaskAdded: (setter: boolean) => void;
  taskAdded: boolean;
}

const AddTask = ({ user, setTaskAdded, taskAdded }: Props) => {
  const taskName = useRef<HTMLInputElement>(null);
  const [errorAdd, setErrorAdd] = useState("");
  const [successAdd, setsuccessAdd] = useState("");
  const onAddClass = () => {
    if (taskName.current! && taskName.current.value != "") {
      console.log(taskName.current!.value);
      setErrorAdd("");
      axios
        .post("https://todoserveer.onrender.com/users/task/" + user._id, { taskName: taskName.current!.value })
        .then((res) => {
          setsuccessAdd("Task Added!");
          taskName.current!.value = "";
          setTaskAdded(!taskAdded);
        });
    } else setErrorAdd("Please type in the task!");
  };
  return (
    <Box bg={"gray.900"} padding={5} borderRadius={20}>
      {errorAdd != "" && (
        <Alert status="error" marginBottom={3}>
          <AlertIcon />
          {errorAdd}
        </Alert>
      )}
      {successAdd != "" && (
        <Alert status="success" marginBottom={3}>
          <AlertIcon />
          {successAdd}
        </Alert>
      )}
      <HStack>
        <Input
          ref={taskName}
          // {...register("username", { required: true })}
          placeholder="Task"
          id="task"
          size="md"
          _placeholder={{ opacity: 1, color: "gray.400" }}
          borderColor={"gray.400"}
        />
        <Button colorScheme="blue" onClick={onAddClass}>
          Add Task
        </Button>
      </HStack>
    </Box>
  );
};

export default AddTask;
