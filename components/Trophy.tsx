import { useGameState } from "../hooks/useGameState";
import { TROPHY_NFT_ADDRESS } from "../interfaces";
import { getTrophyColor } from "../lib/util";
import Image from "next/image";

export const Trophy = (): JSX.Element => {
  const { gameTaskState } = useGameState();
  const contractUrl = `https://polygonscan.com/address/${TROPHY_NFT_ADDRESS}#writeContract`;
  const openSeaUrl = `https://opensea.io/assets/matic/${TROPHY_NFT_ADDRESS}/`;
  const trophyId = gameTaskState?.["trophyId"] || "";

  if (parseInt(trophyId) == 0) {
    return (
      <>
        <p>
          For your efforts, you&apos;ve received 1,000 FWEB3 tokens and can now
          mint a <a href={contractUrl}>Trophy NFT</a>.
        </p>
        <p>
          Hurry! There are only 10,000 trophies. The first 333 winners get a
          Gold trophy, the next 3,333 get a Silver trophy, and the rest get a
          Bronze trophy.
        </p>
      </>
    );
  } else {
    const trophyColor = getTrophyColor(trophyId);
    return (
      <div className="trophy-container">
        <h2>You learned and built in web3!</h2>
        <p>Here&apos;s the trophy that proves it:</p>
        <a
          href={openSeaUrl + trophyId}
          style={{ display: "block" }}
          target="_blank"
          rel="noreferrer"
        >
          <Image
            alt="trophy image"
            src={"/fweb_yearone_" + trophyColor + ".png"}
            width="500px"
            height="500px"
          />
        </a>
      </div>
    );
  }
};
