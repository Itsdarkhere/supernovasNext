import Head from "../node_modules/next/head";
import styles from "../styles/Home.module.scss";
import Header from "../components/Navigation/header";
import LeftNav from "../components/Navigation/leftNav";
import {
  launchLoginFlow,
} from "../utils/global-context";
import { useEffect, useState } from "react";
import { handleMessage } from "../utils/identity-context";
import { useAppSelector } from "../utils/Redux/hooks";
export default function Home() {
  // Redux
  let requestingStorageAccess = useAppSelector((state) => state.app.requestingStorageAccess);
  
  // State
  const [identityURL, setIdentityURL] = useState("");
  // State end

  // Functions
  function login() {
    launchLoginFlow();
  }
  // Functions end

  // Lifecycle methods
  useEffect(() => {
    // This used to be inside the identityService / context
    window.addEventListener("message", (event) => {
      event.stopImmediatePropagation();
      handleMessage(event);
    });
    setIdentityURL("https://identity.deso.org/embed?v=2");
  }, []);
  // Lifycycle methods end

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <iframe
          id="identity"
          frameBorder="0"
          style={
            requestingStorageAccess ? { display: "block" } : { display: "none" }
          }
          src={identityURL}
          className="global__iframe"
        ></iframe>
        {/* USE HERE sanitizedIdentityServiceURL */}
        <Header></Header>
        <button onClick={() => login()}>CLICK</button>
        <LeftNav></LeftNav>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
