import QuestionsAndReplies from "@/components/faq";
import LayoutView from "@/components/layout";
import { Box, Heading, ListItem, OrderedList, Text } from "@chakra-ui/react";
import React from "react";

const AboutUs = () => {
  const questions = [
    {
      content: "What is DigiTextile?",
      replies: [`DigiTextile is an innovative application created to establish a digital ecosystem within Nigeria's fashion and textile industry. This initiative is the result of a project funded by Tetfund.`]
    },
    {
      content: "How can I register on DigiTextile?",
      replies: [` To create an account on DigiTextile, simply follow these links:
      -	For a creator account: https://digitextile.ng/auth/creator/register
      -	For a consumer account: https://digitextile.ng/auth/consumer/register
      `]
    },
    {
      content: "What is the distinction between a creator and a consumer account?",
      replies: [` A creator account is intended for business owners who offer products or services to consumers or fellow creators. On the other hand, a consumer account is for individuals seeking fashion-related products or services to purchase.`]
    },
    {
      content: "I haven't received the account verification email.",
      replies: [` If you haven't received the verification email, please ensure that you entered a valid email address. If the issue persists, reach out to our administrators using the "Contact Us" button located at the bottom of this page.`]
    },
    {
      content: "How can I verify my account? ",
      replies: [`Account verification, along with the submission of required credentials, can be completed during the registration process.      `]
    },
    {
      content: "What documents are required for account verification?",
      replies: [` For creators, you will need to submit a copy of your valid ID card, driver's license, or international passport, along with your business registration certificate from the Corporate Affairs Commission (CAC). Consumers do not need to submit any documents for account verification.`]
    },
    {
      content: "I lack the necessary registration documents",
      replies: [` To become a verified creator and utilize the platform, it is essential to possess the required documents.`]
    },
    {
      content: "How long does the account verification process take?",
      replies: [`Account verification for consumers is instant, while verification for creators typically takes 1 to 7 business days.      `]
    },
    {
      content: "What are the benefits of having a verified account? ",
      replies: [`Verified creators receive a verification badge next to their business name, enhancing their credibility and potentially boosting sales.`]
    },
    {
      content: "Is there a registration fee?",
      replies: [`No, registration on DigiTextile is completely free.`]
    },
    {
      content: "My account verification request was declined; what should I do?",
      replies: [`If your account verification request was declined, it may be due to reasons such as unclear documents, expired documents, invalid documents, or forged documents. If none of these apply to you, please contact the admin using the "Contact Us" button at the bottom of this page.`]
    },
    {
      content: "Can I change my email address?",
      replies: [`Currently, it is not possible to change your email address after it has been verified.      `]
    },
    {
      content: "How can I reset my password?",
      replies: [` To reset your password, click on the "Sign in" button in the menu, and then select the "Forgot password" option.      `]
    },
    {
      content: "How can I contact other users on DigiTextile?",
      replies: [` To contact other users, simply click on a listing to view details. Below the product description, you will find the "Message creator" and "Chat creator instead" buttons. Click on either of these buttons to initiate a conversation with the listing's creator.`]
    },
    {
      content: "How do I navigate the platform to discover products and services?",
      replies: [` DigiTextile offers various categories of listings, including fashion-related, logistics, and forum-based categories. To explore these listings, click of a category, and all listings under will be displayed. You can also navigate to the bottom section of the page or click the "Blog and Forum" button to view and create new topics.      `]
    },
    {
      content: "What is a hot drop?",
      replies: [` A hot drop is a discussion created to raise awareness or share information on specific inquiries or educational topics related to the fashion and textile industry.      `]
    },
    {
      content: "How can I create a hot drop?",
      replies: [` To create a hot drop, visit https://digitextile.ng/hot-drops and click the "Create Hot Drop" button.      `]
    },
    {
      content: "My hot drop was rejected; what should I do?",
      replies: [` If your hot drop was rejected, it may not have adhered to the platform's terms and conditions. Please edit it to ensure compliance with the guidelines.`]
    },
    {
      content: "How can I list a product on DigiTextile?",
      replies: [`On your creator's dashboard, you click on add listing button which takes you to the add listing page, you then enter all of your listing details and then click publish button to complete`]
    },
    {
      content: "What types of products can I list on DigiTextile?",
      replies: [` You can list a wide range of fashion and textile-related products and services, including fashion designs, accessories, textile materials, fashion design services, logistics services, and more.      `]
    },
    {
      content: "Are there any fees for listing products and services?",
      replies: [` Listing products and services on DigiTextile is entirely free.`]
    },
    {
      content: "Can I edit or delete my listings?",
      replies: [`Yes, you can delete any of your listings as a creator, you can do that by going to your listing tab in your creator's dashboard, and then click on delete on the menu botton on the specific listing`]
    },
    {
      content: "How can I advertise my products on DigiTextile?",
      replies: [`For information on placing targeted advertisements on DigiTextile, please use the "Contact Us" button at the bottom of this page to reach out to our administrators.`]
    },
    {
      content: "How can I report inappropriate content or users?",
      replies: [` To report inappropriate content, listings, topics, or users who violate our terms and conditions, click on the "Contact Us" button at the bottom of this page.      `]
    },
    {
      content: "How does DigiTextile handle data and privacy?",
      replies: [` DigiTextile takes data privacy seriously. Your data is securely encrypted and not shared or sold for any purpose. We prioritize the protection of our users' information.`]
    },
    {
      content: "How can I rate or review products and services?",
      replies: [`To rate or review a listing, click on a listing to view its details, and you will find a star rating and review section. Rate the listing on a scale of 1 to 5, with 1 being poor and 5 being excellent. Submit your review and await approval from an admin.`]
    },
  ]

  return (
    <LayoutView>
      <Box w={{ base: '100%', md: '85%' }} pb='70px' mx='auto' px={{ base: '20px', md: '70px' }}>
        <Heading my='20px'>FAQs</Heading>
        <Text my='20px'>
          These are the frequently asked questions by digitextile users
        </Text>
        <Box w={{ base: '95%', md: '90%' }} mx={'auto'}>
          <QuestionsAndReplies questions={questions} />
        </Box>
      </Box>
    </LayoutView>
  );
};

export default AboutUs