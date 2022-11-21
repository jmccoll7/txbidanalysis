import {
  Box,
  Button,
  chakra,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Navbar } from "../components/Navbar";

interface HomeProps {}

interface FeatureProps {
  heading: string;
  text: string;
}

export const Home: React.FC<HomeProps> = () => {
  return (
    <>
      <Navbar />

      <Box as={Container} maxW="7xl" mt={14} p={4}>
        <VStack>
          <chakra.h2 fontSize="3xl" fontWeight="700">
            TX Bid Analysis
          </chakra.h2>
          <chakra.p maxW={"600px"} textAlign={"center"}>
            Welcome to the top data analysis and visualization application for
            Texas Departmentof Transportation construction projects! This
            application utilizes a distributed database cluster for high
            availability and peak performance.
          </chakra.p>
        </VStack>
        <Divider mt={12} mb={12} />
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ base: "8", sm: "12", md: "16" }}
          textAlign={"center"}
        >
          <Feature
            heading={"MySQL Database"}
            text={"Construction bid data is stored in a highly available MySQL cluster."}
          />
          <Feature
            heading={"JWT User Authentication"}
            text={"Login sessions utilize Express along with JSON web tokens for secure authentication."}
          />
          <Feature
            heading={"Microsoft Azure"}
            text={"Infrastructure is hosted on Microsoft Azure's stable, trusted cloud environment."}
          />
          <Feature
            heading={"ReactJS"}
            text={"Frontend server utilizes React for building a sleek, well-integrated user interface."}
          />
        </Grid>
      </Box>
    </>
  );
};

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  );
};
