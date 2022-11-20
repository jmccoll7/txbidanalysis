import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { AppHeader } from "../components/AppHeader";
import { ColorModeSwitcher } from "../components/ColorModeSwitcher";

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
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
                >
                  Sign in
                </Button>
              </Stack>
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
