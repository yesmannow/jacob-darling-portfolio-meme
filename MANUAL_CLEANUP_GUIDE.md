# Manual Cleanup Guide for Windows File Locks

## Issue
Windows file locks prevent `npm install` from completing. Multiple Node.js processes are holding locks on files in `node_modules`.

## Solution Steps

### Option 1: Close All Node Processes (Recommended)

1. **Close all Node.js processes:**
   ```powershell
   # In PowerShell (run as Administrator if needed)
   Stop-Process -Name "node" -Force -ErrorAction SilentlyContinue
   Stop-Process -Name "esbuild" -Force -ErrorAction SilentlyContinue
   Get-Process | Where-Object {$_.ProcessName -match "node|vite|rollup"} | Stop-Process -Force
   ```

2. **Close all terminals/editors** that might have Node processes running:
   - VS Code / Cursor terminals
   - Any running dev servers (`npm run dev`)
   - Any build processes

3. **Clean and reinstall:**
   ```powershell
   npx rimraf node_modules
   npm install
   ```

### Option 2: Manual Directory Deletion

1. Close all Node processes (see Option 1)
2. **Manually delete** `node_modules` folder:
   - Right-click → Delete (or Shift+Delete)
   - If locked, restart computer and delete immediately after boot
3. **Reinstall:**
   ```powershell
   npm install
   ```

### Option 3: Use Elevated PowerShell

1. **Open PowerShell as Administrator**
2. **Navigate to project:**
   ```powershell
   cd C:\dev\bear-cave
   ```
3. **Kill all Node processes:**
   ```powershell
   Get-Process | Where-Object {$_.ProcessName -match "node|esbuild|vite"} | Stop-Process -Force
   ```
4. **Clean and install:**
   ```powershell
   npx rimraf node_modules
   npm install
   ```

### Option 4: Use Task Manager

1. Open Task Manager (Ctrl+Shift+Esc)
2. Find all `node.exe` and `esbuild.exe` processes
3. End all of them
4. Delete `node_modules` folder manually
5. Run `npm install`

## Verification

After cleanup, verify:
```powershell
npm run build
```

Expected output:
- ✅ Pre-build checks pass
- ✅ Build completes successfully
- ✅ `dist/assets/` contains only `.js` and `.css` files

## Alternative: Use CI/CD

If local cleanup continues to be problematic, rely on CI/CD for builds:
- **Netlify**: Automatically installs dependencies on each deploy
- **Vercel**: Automatically installs dependencies on each deploy
- **GitHub Actions**: Clean environment, no file locks

See `DEPLOYMENT_GUIDE.md` for CI/CD setup.

