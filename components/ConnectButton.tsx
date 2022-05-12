import styled from "styled-components";
import MetaMaskOnboarding from "@metamask/onboarding";

import { COLORS } from "../lib";
import { useEthers } from "../providers";
import { OnboardingButton } from "./OnboardingButton";

const Button = styled.button`
  border-radius: 99px;
  text-decoration: none;
  display: inline;
  padding: 15px 30px;
  margin-top: 2rem;
  background: ${COLORS.pinkish};
  color: black;
  cursor: pointer;
  box-shadow: 0 0 0 0 rgba(255, 149, 238, 1);
  transform: scale(1);
  animation: pulse 2s infinite;
`;

export const ConnectButton = () => {
  const { connect, isConnected, isConnecting, error } = useEthers();
  // todo onboarding
  // if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
  //   return <OnboardingButton />
  // }

  return !isConnected ? (
    <Button onClick={connect}>
      {isConnecting ? "connecting..." : "Connect your wallet"}
    </Button>
  ) : null;
};
