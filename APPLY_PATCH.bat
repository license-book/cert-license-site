@echo off
setlocal
cd /d "%~dp0"

if exist "components\cert\FAQ.tsx" (
  del /f /q "components\cert\FAQ.tsx"
  echo [OK] components\cert\FAQ.tsx deleted.
) else (
  echo [INFO] FAQ.tsx was already absent.
)

echo.
echo Patch files have been applied by overwrite.
echo Next: run npm run dev and check the page.
echo.
pause
