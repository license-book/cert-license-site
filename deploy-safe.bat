@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==========================================
echo   LABOOK SAFE DEPLOY
echo ==========================================
echo.
echo This task does NOT save open VS Code files.
echo Only changes already saved to disk can be deployed.
echo.

where git >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Git was not found.
  pause
  exit /b 1
)

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo [ERROR] This folder is not a Git repository.
  pause
  exit /b 1
)

echo [SAVED CHANGES]
git status --short
echo.

git diff --quiet
set "WORKTREE_CLEAN=%errorlevel%"
git diff --cached --quiet
set "INDEX_CLEAN=%errorlevel%"

if "%WORKTREE_CLEAN%"=="0" if "%INDEX_CLEAN%"=="0" (
  echo No saved changes to deploy.
  pause
  exit /b 0
)

set /p CONFIRM=Deploy all saved changes shown above? (Y/N): 
if /I not "%CONFIRM%"=="Y" (
  echo Deployment cancelled.
  pause
  exit /b 0
)

for /f %%i in ('powershell -NoProfile -Command "Get-Date -Format yyyy-MM-dd_HH-mm"') do set "STAMP=%%i"

git add .
if errorlevel 1 goto ERROR

git commit -m "Labook update %STAMP%"
if errorlevel 1 goto ERROR

git push
if errorlevel 1 goto ERROR

echo.
echo ==========================================
echo   PUSH COMPLETE
echo   Vercel deployment has started.
echo ==========================================
echo.
pause
exit /b 0

:ERROR
echo.
echo [ERROR] Deployment failed.
echo Review the messages above.
pause
exit /b 1
