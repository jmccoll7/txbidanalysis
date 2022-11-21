import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { getAccessToken, setAccessToken } from "../access-token";
import { AppHeader } from "../components/AppHeader";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";
import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../gql/graphql";
import { router } from "../router";

interface Values {
  email: string;
  password: string;
}

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
  const [login] = useLoginMutation();
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
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={async (values) => {
                  const response = await login({
                    variables: {
                      email: values.email,
                      password: values.password,
                    },
                    update: (store, { data }) => {
                      if (!data) {
                        return null;
                      }
                      store.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {
                          me: data.login.user,
                        },
                      });
                    },
                  });
                  const responseData = response.data;
                  console.log("Login complete.");
                  console.log(responseData);

                  if (responseData) {
                    setAccessToken(responseData.login.accessToken);
                  }

                  router.navigate("/");
                  console.log("setting token: ", getAccessToken());
                }}
              >
                {(props: FormikProps<Values>) => (
                  <Form>
                    <InputField
                      isRequired={false}
                      name="email"
                      type="email"
                      label="Email address"
                    />
                    <InputField
                      isRequired={false}
                      name="password"
                      type="password"
                      label="Password"
                    />
                    <Stack spacing={10}>
                      <Stack
                        direction={{ base: "column", sm: "row" }}
                        align={"start"}
                        justify={"space-between"}
                      >
                        <Checkbox>Remember me</Checkbox>
                        <Link
                          _hover={{
                            color: "blue.500",
                          }}
                          color={"blue.400"}
                          as={"a"}
                          href={"/forgot-password"}
                        >
                          Forgot password?
                        </Link>
                      </Stack>
                      <Button
                        bg={"blue.400"}
                        color={"white"}
                        _hover={{
                          bg: "blue.500",
                        }}
                        type="submit"
                      >
                        Sign in
                      </Button>
                    </Stack>
                  </Form>
                )}
              </Formik>
            </Stack>
            <Stack>
              <Text pt={2}>
                No account?
                <span>
                  <Link
                    pl={2}
                    _hover={{
                      color: "blue.500",
                    }}
                    color={"blue.400"}
                    href="/signup"
                  >
                    Create one
                  </Link>
                </span>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};
