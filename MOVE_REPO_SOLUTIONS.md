# Solutions for Moving Repository - File Lock Error

The error "The process cannot access the file because it is being used by another process" means something is locking the source directory.

## Solution 1: Close Locking Processes (Recommended)

1. **Close File Explorer windows** that have the source folder open
2. **Close Cursor/VS Code/IDE** if it has the project open
3. **Close all PowerShell terminals** in that directory
4. **Close any Git GUI tools** that might be accessing the repo
5. **Check OneDrive** - if the folder is syncing, pause OneDrive temporarily

Then try the move command again:

```powershell
Move-Item -Path "C:\Users\hoosi\OneDrive\Desktop\port55\jacob-darling-portfolio-meme\jacob-darling-portfolio-meme\jacob-darling-portfolio-meme" -Destination "C:\dev\bear-cave" -Force
```

## Solution 2: Use Robocopy (More Reliable)

Robocopy can handle file locks better and copy then delete:

```powershell
# Copy everything first
robocopy "C:\Users\hoosi\OneDrive\Desktop\port55\jacob-darling-portfolio-meme\jacob-darling-portfolio-meme\jacob-darling-portfolio-meme" "C:\dev\bear-cave" /E /COPYALL /R:3 /W:5

# After successful copy, verify contents match, then delete source:
# (Only delete after verifying everything copied correctly!)
Remove-Item -Path "C:\Users\hoosi\OneDrive\Desktop\port55\jacob-darling-portfolio-meme\jacob-darling-portfolio-meme\jacob-darling-portfolio-meme" -Recurse -Force
```

## Solution 3: Check What's Locking the File

Run this to find processes locking the directory:

```powershell
Get-Process | Where-Object {$_.Path -like "*jacob-darling-portfolio-meme*"}
```

Or use Process Explorer (Sysinternals) to find what's locking the folder.

## Solution 4: Restart Computer

If nothing else works, restart your computer (this closes all processes) and try the move again immediately after boot.

## Recommended Approach

1. Close Cursor/IDE completely
2. Close File Explorer windows
3. Open a fresh PowerShell as Administrator
4. Try Solution 1 (Move-Item) again
5. If that fails, use Solution 2 (Robocopy)
