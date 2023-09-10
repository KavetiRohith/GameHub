import { HStack, Image, Text } from "@chakra-ui/react";
import logo from "../assets/logo.webp";

function NavBar() {
  return (
    <HStack>
      <Image src={logo} boxSize="60px"></Image>
      <Text>GameHub</Text>
    </HStack>
  );
}

export default NavBar;
