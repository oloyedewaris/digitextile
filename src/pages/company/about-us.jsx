import LayoutView from "@/components/layout";
import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import React from "react";

const AboutUs = () => {
    return (
        <LayoutView>
            <Box pb='70px' px='70px'>
                <Heading my='20px'>About Us</Heading>
                <Text my='20px'>
                    Digitextile is an application designed and implemented to create a digital ecosystem for all stakeholders in the fashion and textile industry in Nigeria.
                    Digitextile is a product of a project funded by Tetfund (https://tetfund.gov.ng/).
                </Text>
                <Text my='20px'>
                    The project<b> (ID: NRF/CC/EWC/00049)</b> titled<b> DEVELOPMENT OF DIGITAL ECOSYSTEM FOR THE NIGERIAN TEXTILE INDUSTRY</b> under the Entrepreneurship & Wealth Creation
                    Thematic Area of the Cross-Cutting (CC) Research Category. The project is a collaboration involving researchers and postgraduate students from Obafemi
                    Awolowo University(OAU), Ile-Ife, Nigeria Tallinn University(TU), Estonia, Ahmadu Bello University, Zaria, Univeristy of Nigeria, Nsukka and Federal
                    University of Technology, Akure.
                </Text>
                <Text my='20px'>
                    The project seeks to develop a digital ecosystem for the textile, fashion design and allied industry with a view to transforming the sector to
                    provide the lead in the African textile and fashion market by 2030. The project began early 2022 and the project is for a period of 24months.
                </Text>
                <Text my='20px'>
                    <b>The researchers are:</b>
                    <OrderedList>
                        <ListItem>
                            Prof A. O. Oluwatope - Principal Investigator, OAU
                        </ListItem>
                        <ListItem>
                            Prof K.O. Bakare - Co-researcher,  OAU
                        </ListItem>
                        <ListItem>
                            Prof I. O. Awoyelu - Co-researcher, OAU
                        </ListItem>
                        <ListItem>
                            Dr. J. I. Diyaolu -Co-researcher,  OAU
                        </ListItem>
                        <ListItem>
                            Dr. A. A. Ogunyemi -Co-researcher,  TU
                        </ListItem>
                    </OrderedList>
                </Text>
                <Text my='20px'>
                    The project contacts: email: <b>digitextnrf@gmail.com</b> and Office: <b>Incubation Center, ICT-Driven Knowledge Park, ACE, OAU., Ile-Ife.</b>
                </Text>
            </Box>
        </LayoutView>
    );
};

export default AboutUs