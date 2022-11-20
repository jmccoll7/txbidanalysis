import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Form, Formik, Field } from "formik";
import React from "react";
import { InputField } from "../components/InputField";
import { Navbar } from "../components/Navbar";
import { contractors, itemCodes } from "./temp-data";

interface QueryProps {}

export const Query: React.FC<QueryProps> = ({}) => {
  return (
    <>
      <Navbar />
      <Formik
        initialValues={{
          startDate: new Date(),
          endDate: new Date(),
          contractors: [] as string[],
          itemCode: null as number | null,
        }}
        onSubmit={async (values) => {
          alert(JSON.stringify(values, null, 2));
        }}
      >
        {(props) => (
          <Form>
            <HStack pl={4} marginTop={4} mr={4} alignItems={"start"}>
              <InputField isRequired={false} name="startDate" type="date" label="Start Date" />
              <InputField isRequired={false} name="endDate" type="date" label="End Date" />
              <Field name="contractors">
                {(props: any) => {
                  console.log(props.field, props.form, props.meta, props);
                  return (
                    <FormControl isInvalid={!!props.meta.error} maxW={"400px"}>
                      <FormLabel htmlFor={props.field.name}>
                        Contractors
                      </FormLabel>
                      <Select
                        placeholder="Select All"
                        id={props.field.name}
                        name={props.field.name}
                        isMulti
                        options={contractors}
                        value={
                          contractors
                            ? contractors.find(
                                (option) => option.value === props.field.value
                              )
                            : ""
                        }
                        onChange={(options) => {
                          var optionValues: string[] = [];
                          options.forEach((option: any) => {
                            optionValues.push(option.value);
                          });
                          props.form.setFieldValue(
                            props.field.name,
                            optionValues
                          );
                        }}
                        onBlur={props.field.onBlur}
                      />
                      {props.field.error ? (
                        <FormErrorMessage>{props.field.error}</FormErrorMessage>
                      ) : null}
                    </FormControl>
                  );
                }}
              </Field>
              <Field name="itemCode">
                {(props: any) => {
                  console.log(props.field, props.form, props.meta);
                  return (
                    <FormControl isInvalid={!!props.meta.error} maxW={"400px"}>
                      <FormLabel htmlFor={props.field.name}>
                        Item Code
                      </FormLabel>
                      <Select
                        id={props.field.name}
                        name={props.field.name}
                        options={itemCodes}
                        value={
                          itemCodes
                            ? itemCodes.find(
                                (option) => option.value === props.field.value
                              )
                            : ""
                        }
                        onChange={(option: any) =>
                          props.form.setFieldValue(
                            props.field.name,
                            option.value
                          )
                        }
                        onBlur={props.field.onBlur}
                      />
                      {props.field.error ? (
                        <FormErrorMessage>{props.field.error}</FormErrorMessage>
                      ) : null}
                    </FormControl>
                  );
                }}
              </Field>
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
    </>
  );
};
