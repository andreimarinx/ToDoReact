import { Alert, AlertIcon, Box, Button, Center, HStack, Heading, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import { User } from "./Main";

import axios from "axios";
import SignUp from "./SignUp";

interface LoginData {
  username: string;
  password: string;
}

interface Props {
  onSuccess: (signedIn: boolean) => void;
  updateUser: (updateUser: User) => void;
}

const SignIn = ({ onSuccess, updateUser }: Props) => {
  const [error, setError] = useState("");
  const [signUpMessage, setSignupMessage] = useState("");
  const [signIn, setSignIn] = useState(true);

  const { register, handleSubmit } = useForm<LoginData>();

  const onSubmit = (data: FieldValues) => {
    axios
      .post("https://todoserveer.onrender.com/users/login", { username: data.username, password: data.password })
      .then((res) => {
        if (!res.data.status) {
          setError("Invalid Username or password!");
          onSuccess(false);
        } else {
          onSuccess(true);
          updateUser(res.data.userData);
        }
      });
  };
  if (signIn)
    return (
      <Box width={{ base: "95%", lg: 500 }} padding={10} bg={"gray.900"} borderRadius={20}>
        <Heading marginBottom={5}>Sign In</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          {signUpMessage != "" && (
            <Alert status="success" marginTop={5} marginBottom={3}>
              <AlertIcon />
              {signUpMessage}
            </Alert>
          )}
          <label htmlFor="username">Username</label>
          <Input
            {...register("username", { required: true })}
            placeholder="Username"
            id="username"
            size="sm"
            marginBottom={3}
            marginTop={2}
            _placeholder={{ opacity: 1, color: "gray.400" }}
            borderColor={"gray.400"}
          />
          <label htmlFor="password">Password</label>
          <Input
            {...register("password", { required: true })}
            placeholder="Passwoed"
            id="password"
            size="sm"
            marginTop={2}
            type="password"
            _placeholder={{ opacity: 1, color: "gray.400" }}
            borderColor={"gray.400"}
          />
          {error != "" && (
            <Alert status="error" marginTop={5}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Button colorScheme="blue" marginTop={5} width={"100%"} type="submit">
            LogIn
          </Button>
          <HStack marginTop={3}>
            <Center width={"100%"}>
              <Text>No account yet?</Text>
              <Button variant={"link"} marginLeft={2} onClick={() => setSignIn(false)}>
                Create one now
              </Button>
            </Center>
          </HStack>
        </form>
      </Box>
    );
  else {
    return (
      <SignUp
        setSuccessMessage={(success) => setSignupMessage(success)}
        signIn={(setSignIns) => setSignIn(setSignIns)}
      />
    );
  }
};

export default SignIn;
