import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Nav from "../components/navbar";
import { ClerkProvider } from "@clerk/nextjs";

const frontEndApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider frontendApi={frontEndApi}>
      <div data-theme="autumn">
        <Nav />
        <Component {...pageProps} />
      </div>
    </ClerkProvider>
  )
};

export default MyApp;
