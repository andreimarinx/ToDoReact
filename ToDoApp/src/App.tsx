import { Grid, GridItem, Text, useColorMode } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import { useState } from "react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  if (localStorage.getItem("chakra-ui-color-mode") === "light") toggleColorMode();

  return (
    <Grid
      templateAreas={`"navbar"
                      "main"`}
    >
      <GridItem area="navbar">
        <Navbar />
      </GridItem>
      <GridItem area="main">
        <Main />
      </GridItem>
    </Grid>
  );
}

export default App;
