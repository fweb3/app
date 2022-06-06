# [fweb3.xyz](https://fweb3.xyz)

![Statements](https://img.shields.io/badge/statements-75.29%25-red.svg?style=flat&logo=jest)
![Branches](https://img.shields.io/badge/branches-60.11%25-red.svg?style=flat&logo=jest)
![Functions](https://img.shields.io/badge/functions-72.45%25-red.svg?style=flat&logo=jest)
![Lines](https://img.shields.io/badge/lines-74.21%25-red.svg?style=flat&logo=jest)

---

![CodeQL](https://github.com/fweb3/app/actions/workflows/codeql.yml/badge.svg)
![Cypress](https://github.com/fweb3/app/actions/workflows/cypress.yml/badge.svg)
![Tests](https://github.com/fweb3/app/actions/workflows/tests.yml/badge.svg)

---

Contributions are more than welcome! Please fork this repo, do work, then submit a PR!
You will find the contribution guidlines [here](https://github.com/fweb3/CONTRIBUTING)

---

## Game Contracts

All of our contracts are open and available!
You will find all of them [here](https://github.com/fweb3/contracts)

- Fweb3 Token [0x4a14ac36667b574b08443a15093e417db909d7a3](https://polygonscan.com/address/0x4a14ac36667b574b08443a15093e417db909d7a3)
- Fweb3 Trophy NFT [0x2a0493dee4f4b5e4b595326f0e73645f6f493923](https://polygonscan.com/address/0x2a0493dee4f4b5e4b595326f0e73645f6f493923)

## Local Development

### Prerequsits

- Node v16

```bash
# Ensure correct node version (with nvm)
nvm use

# Install dependencies
yarn install

# Copy .env.example to .env.local and fill out vars
cp .env.example .env.local

# Run dev server
yarn dev

# Testing...
yarn test

# watch mode
yarn test:watch

# cypress (start app first)
yarn cypress

# cypress standalone
yarn cypress:run

# Linting
yarn lint

# Formatting
yarn prettier
```

## Debugging with devtools

Supports using either the VS Code debugger or Chrome DevTools.
See official Next.js docs: https://nextjs.org/docs/advanced-features/debugging

## Depolyment

Deployment is handled automatically to vercel on a merge to master.
All checks must pass before a merge can occur. Preview deploys are created on opening a PR.

## Tooling & Documentation

- [Typescript](https://www.typescriptlang.org/docs)
- [Nextjs](https://nextjs.org/docs)
- [Vercel](https://vercel.com/docs?redirected=1)
- [PolygonScan](https://polygonscan.com/apis)
- [Cypress](https://cypress.io)
- [Jest](https://jestjs.io/docs/getting-started)
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## Join our [discord](https://discord.gg/SztqpYpY) for more information.
