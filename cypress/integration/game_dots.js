const WIN_STATE = {
  hasWonGame: true,
  trophyId: "1",
};

const DEFAULT_STATE = {
  hasEnoughTokens: false,
  hasUsedFaucet: false,
  hasSwappedTokens: false,
  hasVotedInPoll: false,
  hasDeployedContract: false,
  hasSentTokens: false,
  hasBurnedTokens: false,
  hasMintedNFT: false,
  hasWonGame: false,
};

describe("Game completion dots", () => {
  it("load the default page", () => {
    cy.visit("/");
    cy.get(".game-tile").should("be.visible");
    cy.get(".game-tile").should("have.length", 9);
    cy.get(".game-tile.completed").should("have.length", 0);
  });

  it("loads a wallet that is complete", () => {
    cy.intercept("/api/polygon?**", WIN_STATE);
    cy.visit("/?wallet=0x2A9d8CfD86796E6A68AF9c83FD90F67CcaF1352c");
    cy.get(".game-tile.completed").should("have.length", 9);
  });

  it("load a wallet that has not completed anything", () => {
    cy.visit("/");
    cy.get(".game-tile").should("be.visible");
    cy.get(".game-tile").should("have.length", 9);
    cy.get(".game-tile.completed").should("have.length", 0);
  });
});
