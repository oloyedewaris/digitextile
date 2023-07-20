import { Box } from "@chakra-ui/react";
import Navbar from "../navbar";

const LayoutView = ({ children, noPadding, activePage, ...rest }) => (
  <Box
    maxW='100vw'
    overflowX={'hidden'}
    bg="#F5F5F5"
    h={"100%"}
    minH="100vh"
    position={'relative'}
    {...rest}
  >
    <Navbar activePage={activePage} />
    <Box w={"100%"} px={noPadding ? "0" : "30px"}>
      {children}
    </Box>
  </Box>
);

export default LayoutView