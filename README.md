# Digital Wellness Through Data

What does the algorithm see when it looks at me? This is the interactive site for my CMU data mining final (45-851, December 2025): ten years of my own social media, read back through data mining.

**[Explore the live study →](https://digital-wellness-through-data.vercel.app)** · [Case study on sarakay.me](https://sarakay.me/case-studies/digital-wellness-through-data.html)

Screen time tells you how much you consumed, not what. So I pulled my official exports (26,720 liked tweets, 4,571 saved YouTube videos, 500+ LinkedIn connections) and asked what they say about me.

## Chapters

- **My Content Diet** (Twitter): zero-shot topic classification and emotion classification across 26,720 likes. The emotional nutrition I feed my mind daily.
- **My Attention Patterns** (YouTube): K-means clustering over saved video titles surfaced a library sorted by task, background noise for work versus full-attention watches, that I never organized on purpose.
- **My Career Story** (LinkedIn): connection growth over time. Every spike is an internship search, a first job, a layoff.
- **Your Turn**: reflection questions, copy-paste prompts, and how to download your own Twitter/X, Google, and LinkedIn data.

## Methods

Zero-shot topics with BART-large-MNLI, emotion with DistilRoBERTa, sentiment with twitter-roberta, K-means on TF-IDF vectors with scikit-learn, then chi-square tests, t-tests, regression, and time-series analysis to check the patterns were real.

This repo is the front end (React + Recharts). The analysis ran separately over the raw exports, which are not in this repo.

## The hard line

Only my own data, from official exports. Nothing scraped, nobody else classified. The only person profiled is me.

## Run locally

Requires Node.js.

```sh
npm install
npm run dev   # http://localhost:3000
```

The **Reflection Guide** at the end of "Your Turn" has two modes:

- **Demo** (default): scripted replies, no AI call, no key, nothing leaves the browser.
- **Use my Gemini key**: paste your own key ([get one free](https://aistudio.google.com/apikey)) to chat with the live guide. The key goes straight from your browser to Google, is kept only in `sessionStorage`, and is gone when you close the tab.

Running locally, you can skip pasting by putting `VITE_GEMINI_API_KEY=...` in `.env.local` (gitignored). Never set it in Vercel or any hosted build: Vite bakes `VITE_` variables into the public JavaScript.

Built by one human and an AI team: Claude on processing and documentation, Gemini on the interactive UI, ChatGPT on proofreading and portraits.

---

Maintained by [Sara Kay](https://sarakay.me) · [@ssskay](https://github.com/ssskay) · [more projects](https://sarakay.me/projects.html)
