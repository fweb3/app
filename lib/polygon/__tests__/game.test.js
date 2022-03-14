import { checkHasWonGame, currentWalletGameState } from "../validators";
import { fetchCurrentGameState, fetchDebugGameState } from "../game";

jest.mock("../validators");

const mockGameState = {
  tokenBalance: 0,
  hasEnoughTokens: false,
  hasEnoughTokens: false,
  hasUsedFaucet: false,
  hasSwappedTokens: false,
  hasVotedInPoll: false,
  hasDeployedContract: false,
  hasSentTokens: false,
  hasBurnedTokens: false,
  hasMintedNFT: false,
  hasWonGame: false,
  trophyId: 0,
};

describe("the game", () => {
  it("fetches current game state", async () => {
    checkHasWonGame.mockReturnValue(false);
    currentWalletGameState.mockReturnValue(mockGameState);
    const actual = await fetchCurrentGameState();
    expect(actual).toBe(mockGameState);
  });
  it("sends back a winner game state", async () => {
    checkHasWonGame.mockReturnValue({ ...mockGameState, trophyId: "100" });
    const actual = await fetchCurrentGameState();
    expect(actual).toEqual({ ...mockGameState, trophyId: "100" });
  });
  it("returns default state when no debug flag passed", () => {
    const actual = fetchDebugGameState();
    expect(actual).toEqual(mockGameState);
  });
  it("switches game state with debug flag", () => {
    const actual = fetchDebugGameState("111");
    expect(actual).toEqual({
      ...mockGameState,
      hasUsedFaucet: true,
      hasEnoughTokens: true,
    });
  });
});