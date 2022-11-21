import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { InputField, PasswordInputField } from "../components/InputField";
import { useRegisterMutation } from "../gql/graphql";
import { router } from "../router";

interface SignUpProps {}

interface Values {
  email: string;
  password: string;
}

export const SignUp: React.FC<SignUpProps> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [register] = useRegisterMutation();
  return (
    <>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.800")}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <AppHeader flex={{ base: 1 }} />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Box>

      <Flex
        minH={"80vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            minW={"400px"}
          >
            <Stack spacing={4}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  const response = register({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                  });
                  console.log("Registration complete.");
                  console.log(response);
                  router.navigate("/");
                }}
              >
                {(props: FormikProps<Values>) => (
                  <Form>
                    <InputField
                      isRequired={true}
                      name="email"
                      type="email"
                      label="Email address"
                    />
                    <PasswordInputField
                      showPassword={showPassword}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                      isRequired={true}
                      name="password"
                      type={showPassword ? "text" : "password"}
                      label="Password"
                    />
                    <Stack spacing={10} pt={2}>
                      <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        type="submit"
                      >
                        Sign up
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link
                    as={RouterLink}
                    to="/login"
                    _hover={{
                      color: "blue.500",
                    }}
                    color={"blue.400"}
                  >
                    Login
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
