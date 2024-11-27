import { Box, Button, Center, HStack, Heading } from "@chakra-ui/react";
import { User } from "./Main";
import AddTask from "./AddTask";
import TaskList from "./TaskList";
import { useState } from "react";

interface Props {
  user: User;
  signOutUser: (value: boolean) => void;
}

const Userpage = ({ user, signOutUser }: Props) => {
  const [taskAdded, setTaskAdded] = useState(false);
  return (
    <>
      <Box width={{ base: "95%", lg: 700 }}>
        <HStack justifyContent={"space-between"} paddingInline={5} marginBottom={5}>
          <Heading>Welcome, {user.username}</Heading>
          <Button colorScheme="red" onClick={() => signOutUser(false)}>
            Sign Out
          </Button>
        </HStack>
        <AddTask taskAdded={taskAdded} setTaskAdded={(setter) => setTaskAdded(setter)} user={user} />
        <TaskList taskAdded={taskAdded} setTaskAdded={(setter) => setTaskAdded(setter)} user={user} />
      </Box>
    </>
  );
};

export default Userpage;
