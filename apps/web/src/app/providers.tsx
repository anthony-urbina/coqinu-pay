"use client";
import { WagmiConfig, createConfig } from "wagmi";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { ReactNode } from "react";
import { avalanche, avalancheFuji } from "viem/chains";
import { siweClient } from "../utils/siwe-client";
import { AuthContext } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "@/contexts/UserContext";

const config = createConfig(
  getDefaultConfig({
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
    appName: "Coqinu Pay",
    chains: [avalanche, avalancheFuji],

    // Optional
    appDescription: "Welcome to Coqinu Pay!",
    // appUrl: "https://family.co", // your app's url
    appIcon: "/images/coqinu-logo.png",
  })
);

export const Providers = ({ children }: { children: ReactNode }) => {
  //   const { isBrowser } = useSsr();

  return (
    <WagmiConfig config={config}>
      <siweClient.Provider
        // Optional parameters
        enabled={true} // defaults true
        nonceRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        sessionRefetchInterval={300000} // in milliseconds, defaults to 5 minutes
        signOutOnDisconnect={true} // defaults true
        signOutOnAccountChange={true} // defaults true
        signOutOnNetworkChange={true} // defaults true
        onSignIn={() => undefined}
        onSignOut={() => undefined}
      >
        <ConnectKitProvider>
          <AuthContext>
            <UserProvider>
              <ToastContainer />
              {children}
            </UserProvider>
          </AuthContext>
        </ConnectKitProvider>
      </siweClient.Provider>
    </WagmiConfig>
  );
};
