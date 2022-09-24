import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Nav from "../components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "../components/topnav";
import { AnimatePresence, motion } from 'framer-motion'

const frontEndApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;


const MyApp: AppType = ({ Component, pageProps, router }) => {
  return (
    <ClerkProvider frontendApi={frontEndApi}>
      <div>
        <TopNav />
        <Nav />
        <AnimatePresence mode="wait">
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} key={router.route} exit={{ x: '-100%', opacity: 0 }}>
            <Component  {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
    </ClerkProvider>
  )
};

export default MyApp;
