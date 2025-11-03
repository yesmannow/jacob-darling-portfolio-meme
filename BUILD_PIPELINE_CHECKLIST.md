# Build Pipeline Checklist

This document outlines the automated build validation pipeline to prevent build and deployment issues.

## Pre-Build Validation

Before every build, the following MCP tools run automatically via `npm run prebuild`:

1. **asset-checker**: Scans `dist/assets/` for invalid file extensions (`.tsx`, `.jsx`, `.ts`)
2. **config-validator**: Validates:
   - `vite.config.js`: Rollup output configuration (must output `.js` files)
   - `tsconfig.json`: `jsx: "react-jsx"`, `moduleResolution: "node"`, `typeRoots` includes `node_modules`
   - `netlify.toml` / `vercel.json`: Publish directory (`dist`), SPA redirects, Content-Type headers
3. **deps-checker**: Verifies required dependencies:
   - `react`, `react-dom`, `@types/react`, `@types/react-dom`, `react-router-dom`

## Build Process

1. Run pre-build checks: `npm run prebuild`
2. Build the project: `npm run build` (automatically runs prebuild)
3. Verify build output: `npm run postbuild` (automatically runs after build)

## Post-Build Verification

After building, the following checks run automatically:

1. **Asset validation**: Confirms no `.tsx`, `.jsx`, or `.ts` files in `dist/assets/`
2. **Output structure**: Verifies JavaScript and CSS files are present

## Manual Verification (Before Deployment)

1. ✅ Build completes without errors
2. ✅ `dist/assets/` contains only `.js`, `.css`, fonts, and images
3. ✅ No `.tsx`, `.jsx`, or `.ts` files in build output
4. ✅ `netlify.toml` or `vercel.json` specifies `publish = "dist"` or `outputDirectory = "dist"`
5. ✅ SPA redirect/rewrite configured: `/* → /index.html`
6. ✅ Content-Type headers set: `.js` files have `Content-Type: text/javascript`

## Deployment Verification (After Deploy)

1. Open DevTools → Network tab
2. Load main script: Check `Content-Type: text/javascript` header
3. Verify no errors:
   - ❌ "Failed to load module script ... MIME type application/octet-stream"
   - ❌ "already been defined" custom element errors
   - ❌ 15-second timeout errors
4. Test SPA routing: Navigate to different routes, verify they load correctly

## Automated Pipeline

The build pipeline is automatically triggered:

- **Local builds**: `npm run build` → runs `prebuild` → builds → runs `postbuild`
- **CI/CD**: Configure your CI to run `npm run build` which includes all checks

## MCP Tools Location

All MCP tools are located in `./mcp-tools/`:
- `asset-checker.js`: Scans build output for invalid files
- `config-validator.js`: Validates configuration files
- `deps-checker.js`: Checks required dependencies

## Troubleshooting

If pre-build checks fail:
1. Review the error messages from the MCP tools
2. Fix the identified issues
3. Re-run `npm run build`

If build output contains invalid files:
1. Check `vite.config.js` `rollupOptions.output.entryFileNames` and `chunkFileNames`
2. Ensure they end with `.js` not `.tsx` or `.jsx`
3. Clean and rebuild: `npm run build:clean`

If deployment has MIME type errors:
1. Verify `netlify.toml` or `vercel.json` has Content-Type headers for `.js` files
2. Check that files actually have `.js` extension (not `.tsx` or `.jsx`)
3. Rebuild and redeploy

