import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Formik } from "formik";
import React, { useState } from "react";
import { Form } from "react-router-dom";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { QueryResults } from "../components/QueryResults";

interface ItemSearchProps {}

export const ItemSearch: React.FC<ItemSearchProps> = () => {
  const [complete, setComplete] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{
          searchInput: "",
        }}
        onSubmit={async (values) => {
          setSearchInput(values.searchInput);
          setComplete(true);
        }}
      >
        {(props) => (
          <>
            <Form onSubmit={props.handleSubmit}>
              <Stack pl={4} marginTop={4} mr={4} alignItems={"center"}>
                <InputField
                  name="searchInput"
                  type="text"
                  label="Search by Item Description"
                  labelAlign={"center"}
                  maxW={"700px"}
                />
                <Button
                  ml={"auto"}
                  p={4}
                  m={4}
                  type="submit"
                  color={"white"}
                  bg={"blue.400"}
                  _hover={{ bg: "blue.500" }}
                  isLoading={props.isSubmitting}
                >
                  Search
                </Button>
              </Stack>
            </Form>
          </>
        )}
      </Formik>
      {complete ? (
        <QueryResults type={"itemSearch"} searchInput={searchInput} />
      ) : null}
    </>
  );
};
