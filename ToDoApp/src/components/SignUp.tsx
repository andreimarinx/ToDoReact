import { Alert, AlertIcon, Box, Button, Center, HStack, Heading, Input, Spinner, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface UserData {
  username: string;
  password: string;
  email: string;
}

interface Props {
  signIn: (setSignIn: boolean) => void;
  setSuccessMessage: (text: string) => void;
}

const SignUp = ({ signIn, setSuccessMessage }: Props) => {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm<UserData>();
  const [loading, setloading] = useState(false);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    if (data.username.length <= 5) setError("Username must be at least 5 characters");
    else if (data.password.length <= 5) setError("Password must be at least 5 characters");
    else {
      setloading(true);
      axios
        .post("https://todoserveer.onrender.com/users/", {
          username: data.username,
          password: data.password,
          email: data.email,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.message === "created") {
            setSuccessMessage("Userd created, time to login");
            signIn(true);
          } else if (res.data.message === "exists") {
            setError("An username already exists!");
          } else {
          }

          setloading(false);
        });
    }
  };
  return (
    <>
      <Box width={{ base: "95%", lg: 500 }} padding={10} bg={"gray.900"} borderRadius={20}>
        <Heading marginBottom={5}>Sign Up</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
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
          <label htmlFor="email">Email</label>
          <Input
            {...register("email", { required: true })}
            placeholder="Email"
            id="email"
            size="sm"
            type="email"
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
          {!loading && (
            <Button colorScheme="blue" marginTop={5} width={"100%"} type="submit">
              SignUp
            </Button>
          )}
          {loading && (
            <Box width={"100%"}>
              <Center>
                <Spinner />
              </Center>
            </Box>
          )}
          <HStack marginTop={3}>
            <Center width={"100%"}>
              <Text>Already have an account?</Text>
              <Button
                variant={"link"}
                marginLeft={2}
                onClick={() => {
                  signIn(true);
                }}
              >
                Long in
              </Button>
            </Center>
          </HStack>
        </form>
      </Box>
    </>
  );
};

export default SignUp;
