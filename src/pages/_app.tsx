import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import Nav from "../components/navbar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div data-theme="autumn">
    <Nav />
    <Component {...pageProps} />
    </div>
  )
};

export default MyApp;
