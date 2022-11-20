import {
  Link, LinkProps, useBreakpointValue,
  useColorModeValue
} from "@chakra-ui/react";
import React from "react";

type AppHeaderProps = LinkProps;

export const AppHeader: React.FC<AppHeaderProps> = ({ flex }) => {
  return (
    <Link
      flex={flex}
      variant={"link"}
      href={"/"}
      fontWeight={"bold"}
      textAlign={useBreakpointValue({ base: "center", md: "left" })}
      fontFamily={"heading"}
      color={useColorModeValue("gray.600", "white")}
      _hover={{
        color: useColorModeValue("black", "gray.300")
      }}
    >
      TX Bid Analysis
    </Link>
  );
};
