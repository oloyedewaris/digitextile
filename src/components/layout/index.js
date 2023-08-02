import { Box } from "@chakra-ui/react";
import Navbar from "../navbar";
import Footer from "../home/Footer";

const LayoutView = ({ darkFooter, children, noPadding, activePage, ...rest }) => (
  <Box
    maxW='100vw'
    overflowX={'hidden'}
    bg="#EDF2F4"
    h={"100%"}
    minH="100vh"
    position={'relative'}
    {...rest}
  >
    <Navbar activePage={activePage} />
    <Box mt={{ base: '60px', md: '120px' }} w={"100%"}>
      {children}
    </Box>
    <Footer isDark={darkFooter} />
  </Box>
);

export default LayoutView