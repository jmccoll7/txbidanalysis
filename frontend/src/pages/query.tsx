import {
  Button, HStack
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { QueryResults } from "../components/QueryResults";

interface QueryProps {}

export const Query: React.FC<QueryProps> = () => {
  const [complete, setComplete] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [itemCode, setItemCode] = useState(0);
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{
          startDate: new Date(),
          endDate: new Date(),
          itemCode: "",
        }}
        onSubmit={async (values) => {
          setStartDate(values.startDate);
          setEndDate(values.endDate);
          setItemCode(Number(values.itemCode));
          setComplete(true);
        }}
      >
        {(props) => (
          <Form onSubmit={props.handleSubmit}>
            <HStack pl={4} marginTop={4} mr={4} alignItems={"start"}>
              <InputField
                isRequired={false}
                name="startDate"
                type="date"
                label="Start Date"
                maxW={"200px"}
              />
              <InputField
                isRequired={false}
                name="endDate"
                type="date"
                label="End Date"
                maxW={"200px"}
              />
              <InputField
                isRequired={false}
                name="itemCode"
                type="text"
                label="Item Code"
                maxW={"300px"}
              />
            </HStack>
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
              Submit Query
            </Button>
          </Form>
        )}
      </Formik>
      {complete ? (
        <QueryResults
          type={"query"}
          startDate={startDate}
          endDate={endDate}
          itemCode={itemCode}
        />
      ) : null}
    </>
  );
};
