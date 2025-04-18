# Email Assistant

This is a LLM-based email assistant for optimizing the email built with [Next.js](https://nextjs.org) and [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the command to install all required dependencies:

```bash
npm install
```

Then, create a `.env` file and fill in the Open AI key (example in `.env.example`) and change the version of LLM (if needed).

Then, run the development server to start the backend service:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the service. You should be able to see a input box to input the email that you wish ChatGPT to help you rewrite; select the tone and click "Create" button to see the output from ChatGPT.

## Acknowledgement

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel, with [Tailwind CSS](https://tailwindcss.com/) for format support.