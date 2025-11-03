# Deployment Verification Guide

## Pre-Deployment Checks

Before deploying, ensure:

1. ✅ **Pre-build checks pass**: `npm run prebuild`
   - Asset checker: No invalid files
   - Config validator: All configs valid
   - Deps checker: All dependencies present

2. ✅ **Build succeeds**: `npm run build`
   - Build completes without errors
   - Post-build verification passes

3. ✅ **Build output verified**:
   ```bash
   # Check dist/assets contains only .js and .css files
   ls dist/assets/*.js  # Should show .js files
   ls dist/assets/*.tsx # Should show nothing (or error)
   ```

## Post-Deployment Verification

After deployment, verify the following:

### 1. Browser DevTools Console

Open DevTools (F12) → Console tab

**✅ Should see:**
- No errors
- Application loads successfully

**❌ Should NOT see:**
- "Failed to load module script ... MIME type application/octet-stream"
- "already been defined" (custom element errors)
- 15-second timeout errors
- Module loading errors

### 2. Network Tab

Open DevTools → Network tab → Reload page

**Check main script:**
1. Find the main JavaScript file (e.g., `index-[hash].js`)
2. Click on it
3. Check **Headers** tab:
   - **Content-Type**: Should be `text/javascript` or `application/javascript`
   - **Status**: Should be `200 OK`

**✅ Expected:**
```
Request URL: https://your-site.com/assets/index-ABC123.js
Status Code: 200 OK
Content-Type: text/javascript
```

**❌ Problem indicators:**
- Content-Type: `application/octet-stream` → MIME type error
- Status: `404` → File not found
- Content-Type: `text/html` → Wrong MIME type

### 3. SPA Routing Test

Test client-side routing:

1. Navigate directly to nested routes:
   - `/about`
   - `/case-studies`
   - `/contact`
   - Any other routes in your app

2. **✅ Expected:**
   - Page loads (200 OK)
   - Content displays correctly
   - No 404 errors

3. **❌ Problem indicators:**
   - 404 error → SPA redirect not configured
   - Blank page → Route not handled

### 4. Automated Verification Script

Run the verification script:

```bash
# Set deployment URL
export DEPLOYMENT_URL=https://your-site.com
npm run verify:deploy

# Or pass URL as argument
npm run verify:deploy https://your-site.com
```

**Checks performed:**
- ✅ Homepage loads (200 OK)
- ✅ Main script loads with correct Content-Type
- ✅ SPA routing works

## CI/CD Integration

### Netlify

Netlify automatically runs:
1. `npm install`
2. `npm run build` (includes prebuild and postbuild hooks)
3. Deploys `dist/` directory

**Configuration** (`netlify.toml`):
```toml
[build]
  command = "npm run build"  # Runs prebuild → build → postbuild
  publish = "dist"
```

### Vercel

Vercel automatically runs:
1. `npm install`
2. `npm run build` (includes prebuild and postbuild hooks)
3. Deploys `dist/` directory

**Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",  // Runs prebuild → build → postbuild
  "outputDirectory": "dist"
}
```

### GitHub Actions

See `.github/workflows/build-and-deploy.yml`:

**Pre-build validation stage:**
- Runs all MCP tools (asset-checker, config-validator, deps-checker)
- Blocks build if any tool fails

**Build stage:**
- Runs `npm run build` (includes prebuild/postbuild hooks)
- Verifies build output
- Uploads artifacts

## Common Issues & Solutions

### Issue: MIME Type Error

**Error:** "Failed to load module script ... MIME type application/octet-stream"

**Causes:**
1. File has wrong extension (`.tsx` instead of `.js`)
2. Server not configured with correct Content-Type headers

**Solutions:**
1. Check `dist/assets/` - ensure only `.js` files
2. Verify `netlify.toml` or `vercel.json` has Content-Type headers
3. Rebuild and redeploy

### Issue: SPA Routes Return 404

**Error:** Navigating to `/about` returns 404

**Causes:**
1. Missing SPA redirect/rewrite configuration
2. Incorrect redirect pattern

**Solutions:**
1. Check `netlify.toml` has `[[redirects]]` with `from = "/*"` to `/index.html`
2. Check `vercel.json` has `rewrites` with `/(.*)` to `/index.html`
3. Verify status code is 200 (not 301/302)

### Issue: Custom Element Already Defined

**Error:** "Custom element 'xxx' has already been defined"

**Causes:**
- Module loaded multiple times
- Build output has duplicate entries

**Solutions:**
1. Check build output for duplicate files
2. Verify `vite.config.js` rollupOptions
3. Clean build: `npm run build:clean`

## Manual Verification Checklist

- [ ] DevTools Console: No errors
- [ ] Network Tab: Main script has `Content-Type: text/javascript`
- [ ] Network Tab: All assets load (200 OK)
- [ ] Direct route navigation: `/about`, `/case-studies` load correctly
- [ ] SPA routing: Client-side navigation works
- [ ] No MIME type errors in console
- [ ] No custom element duplicate errors
- [ ] No timeout errors

## Next Steps

After successful deployment:
1. ✅ Document the deployment URL
2. ✅ Set up monitoring/alerts
3. ✅ Test all major features
4. ✅ Verify analytics tracking (if applicable)

