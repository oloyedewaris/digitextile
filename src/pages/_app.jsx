import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import "./globalStyles.css";
import Provider from "../context/Provider";
import 'react-image-gallery/styles/css/image-gallery.css';
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Provider>
          <Head>
            <title>Digitex</title>
            <meta
              name="description"
              content="Digital Texttile App"
            />
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
            />
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <Component pageProps={pageProps} />
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
