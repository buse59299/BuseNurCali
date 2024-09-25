import Head from "next/head";
import Header from "./userLogin";
import dbConnect from "../util/dbConnect";

dbConnect();

export default function Index() {
  return (
    <div className="">
      <Head>
        <title>Yardım Sandığı</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
      </Head>
      <Header/>
    </div>
  );
}
