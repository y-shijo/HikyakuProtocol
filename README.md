# HiKyaku Protocol – Email 🤝 web3 address

<img src="packages/frontend/public/images/mix-cover.jpg" width="800" height="223" alt="Cover Image" />

---

Resolve any email address to web3 address.

By [ken](https://twitter.com/kenichiNaoe), [Yoshi](https://twitter.com/yoshijo04), Tei

---

**Table of Contents:**

- [HiKyaku Protocol – Email 🤝 web3 address](#hikyaku-protocol--email--web3-address)
  - [The Stack](#the-stack)
  - [Protocol Spec](#protocol-spec)
    - [1. Register email address](#1-register-email-address)
    - [2. Send email](#2-send-email)
    - [3. Resolve web3 address](#3-resolve-web3-address)
    - [4. Get web3 address](#4-get-web3-address)
  - [Live demo](#live-demo)
  - [Development](#development)
    - [Quickstart](#quickstart)
  - [Deployment](#deployment)

---

## The Stack

- Package-Manager: `pnpm`
- Monorepo Tooling: `turborepo`
- Smart Contract Development: `hardhat`
  - Deploy & Address-Export: `hardhat-deploy`
  - Typescript-Types: `typechain`
- Frontend: `next`
  - Contract Interactions: `wagmi`, `rainbowkit`
  - Styling: `chakra`, `tailwindcss`, `twin.macro`, `emotion`
- Misc:
  - Linting & Formatting: `eslint`, `prettier`, `husky`, `lint-staged`

## Protocol Spec

### 1. Register email address

When a user try to resolve an email address, the user's email address is encrypted by LitProtocol and stored in the contract. At this time, the user can select the notifier provider from the list of providers registered in the contract.(Currently, only our first-party provider is available.)

### 2. Send email

The notifier provider sends an email to the user's email address. The email contains a url to the web3 address resolution page.

The url SHOULD be in the following format.

https://hikyaku-protocol.vercel.app/resolve?k={signed_jwt_token}

The JWT token is signed by the notifier provider's private key and the format is following:

```json
{
  "iss": "https://hikyaku-protocol-notifier.vercel.app",
  "sub": "ken@example.com",
  "req": "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",
  "type": "email",
  "nonce": 9999,
  "exp": 1620000000
}
```

The issuer SHOULD publish the public key of the private key used to sign the JWT token. The path of the public key SHOULD be in the following format `/.well-known/hikyaku-configuration`.

### 3. Resolve web3 address

When the user opens the url in the email, the user can register his/her web3 address. The user's web3 address is encrypted by LitProtocol and stored in the contract.

### 4. Get web3 address

Once the user's web3 address is registered, the email address can be resolved to the web3 address by calling the `getResolvedAddress` function of the contract.

## Live demo

https://hikyaku-protocol.vercel.app/

## Development

### Quickstart

```bash
# Install pnpm
npm i -g pnpm

# Install dependencies
pnpm install

# Copy & fill environments
# NOTE: Documentation of environment variables can be found in the according `.example` files
cp packages/frontend/.env.local.example packages/frontend/.env.local
cp packages/contracts/.env.example packages/contracts/.env
```

```bash
# Generate contract-types, start local hardhat node, and start frontend with turborepo
pnpm dev

# Only start frontend (from root-dir)
# NOTE: Alternatively it can just be started via `pnpm dev` inside `packages/frontend`
pnpm frontend:dev
```

## Deployment

Setting up a deployment via Vercel is pretty straightforward as build settings are preconfigured in `vercel.json`. To get started, press the **Deploy** button and enter the default environment variables listed below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fethathon%2Fethathon&env=NEXT_PUBLIC_PRODUCTION_MODE,NEXT_PUBLIC_URL,NEXT_PUBLIC_DEFAULT_CHAIN,NEXT_PUBLIC_SUPPORTED_CHAINS,NEXT_PUBLIC_RPC_1,NEXT_PUBLIC_RPC_5&envDescription=See%20Environment%20Variables%20Examples%20%26%20Documentation&envLink=https%3A%2F%2Fgithub.com%2Fethathon%2Fethathon%2Fblob%2Fmain%2Fpackages%2Ffrontend%2F.env.local.example&redirect-url=https%3A%2F%2Fgithub.com%2Fethathon%2Fethathon)

| Environment Variable           | Value                             |
| ------------------------------ | --------------------------------- |
| `NEXT_PUBLIC_PRODUCTION_MODE`  | `true`                            |
| `NEXT_PUBLIC_URL`              | `https://your-repo.vercel.app`    |
| `NEXT_PUBLIC_DEFAULT_CHAIN`    | `5`                               |
| `NEXT_PUBLIC_SUPPORTED_CHAINS` | `[5]`                             |
| `NEXT_PUBLIC_RPC_1`            | `https://rpc.ankr.com/eth`        |
| `NEXT_PUBLIC_RPC_5`            | `https://rpc.ankr.com/eth_goerli` |

You can find mode documentation on those environment variables in [`packages/frontend/.env.local.example`](https://github.com/scio-labs/ethathon/blob/main/packages/frontend/.env.local.example). Always make sure to include respective RPCs for supported chains and define them within [`packages/frontend/src/shared/environment.ts`](https://github.com/scio-labs/ethathon/blob/main/packages/frontend/src/shared/environment.ts). Valid hardhat deployments under [`packages/contracts/deployments`](https://github.com/scio-labs/ethathon/blob/main/packages/contracts/deployments) are mandatory for each supported chain.
