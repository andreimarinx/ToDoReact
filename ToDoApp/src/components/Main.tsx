import React, { useState } from "react";
import SignIn from "./SignIn";
import { Box, Center, Heading } from "@chakra-ui/react";
import Userpage from "./Userpage";

export interface User {
  _id: number;
  email: string;
  username: string;
}

const Main = () => {
  const [user, updateUser] = useState<User>({} as User);
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Center marginTop={10}>
        {!isLoggedIn && (
          <SignIn
            updateUser={(userUpdate) => {
              const newUser: User = {
                _id: userUpdate._id,
                email: userUpdate.email,
                username: userUpdate.username,
              };
              updateUser({ ...newUser } as User);
            }}
            onSuccess={(isLogged) => setLoggedIn(isLogged)}
          ></SignIn>
        )}
        {isLoggedIn && (
          <Userpage
            signOutUser={(logOut) => {
              setLoggedIn(logOut);
              updateUser({} as User);
            }}
            user={user}
          />
        )}
      </Center>
    </>
  );
};

export default Main;
