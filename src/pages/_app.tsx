import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Nav from "../components/navbar";
import TopNav from "../components/topnav";
import { AnimatePresence, motion } from 'framer-motion'
import { SessionProvider } from 'next-auth/react'


const MyApp: AppType = ({ Component, pageProps: {session, ...pageProps}, router }) => {
  return (
    <SessionProvider session={session}>
      <div>
        <TopNav />
        <Nav />
        <AnimatePresence mode="wait">
          <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} key={router.route} exit={{ x: '-100%', opacity: 0 }}>
            <Component  {...pageProps} />
          </motion.div>
        </AnimatePresence>
      </div>
    </SessionProvider>
  )
};

export default MyApp;
