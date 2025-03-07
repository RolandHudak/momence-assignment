# Currency Exchange App

## Overview

A React application built as an interview assignment for Momence company. This app displays currency exchange rates from the Czech National Bank and allows users to convert CZK to various currencies.

## Tech Stack

- React
- TypeScript
- Styled Components
- React Query
- Vite

## Live Demo

[View the application online](https://rolandhudak.com/momence)

## Getting started

This project was generated with [Vite](https://vite.dev/)

Install dependencies

```sh
npm install
```

Start project in dev mode

```sh
npm run dev
```

Run tests

```sh
npm run test
```

Create production build

```sh
npm run build
```

## Goal

Create a simple React app (don’t use NextJS please), which:

1. When it starts, retrieve the latest currency exchange rates from the Czech National Bank.

    API URL: https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt

    Documentation: https://www.cnb.cz/en/faq/Format-of-the-foreign-exchange-market-rates/

2. Parses the downloaded data and clearly displays a list to the user in the UI.

3. Add a simple form, into which the customer can enter an amount in CZK and select a currency, and after submitting (clicking a button or in real-time) sees the amount entered in CZK converted into the selected currency.

4. Commit your code throughout your work and upload the resulting codebase into a Github repo.

5. Deploy the app so it can be viewed online (it doesn’t matter where - e.q. Vercel, Netflify, etc.).
6. Add automated tests which might be appropriate to ensure that your solution is working correctly.

7. Tech stack: React (+ Hooks), TypeScript, Styled Components, React Query.

Overall: Keep the code simple and the UI nice and easy to use for the user.
