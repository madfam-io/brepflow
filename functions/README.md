# Functions Directory

This directory contains Vercel serverless functions that enable the BrepFlow Studio to work with WASM threading.

## Purpose

These are **NOT traditional API endpoints**. They serve as an infrastructure layer to work around Vercel's limitations with static site headers.

## Why This Exists

- **SharedArrayBuffer Requirement**: WASM threading requires COOP/COEP HTTP response headers
- **Vercel Limitation**: Static sites cannot set custom HTTP headers
- **Solution**: Route all traffic through serverless functions that can control headers

## Functions

### `studio.js`
- **Purpose**: Serves the entire Studio application with required headers
- **Route**: All requests (`/`, `/assets/*`, etc.) are routed here
- **Headers Set**:
  - `Cross-Origin-Embedder-Policy: require-corp`
  - `Cross-Origin-Opener-Policy: same-origin`
  - `Cross-Origin-Resource-Policy: cross-origin`

## Architecture

```
Request Flow:
User → https://studio.brepflow.com/
     → Vercel rewrites to /functions/studio
     → studio.js sets headers + serves file from /dist
     → Response with COOP/COEP headers
     → SharedArrayBuffer available → WASM threads work
```

## Alternative Hosting

If we moved to a different platform that supports static site headers (Netlify, Cloudflare Pages), this functions directory would be unnecessary.