@echo off
chcp 65001 >nul
setlocal

set "PATCH_DIR=%~dp0"
set "PROJECT_DIR=%cd%"

if not exist "%PROJECT_DIR%\package.json" (
  echo [오류] 프로젝트 루트 폴더에서 APPLY_PATCH.bat을 실행해 주세요.
  pause
  exit /b 1
)

xcopy "%PATCH_DIR%app" "%PROJECT_DIR%\app" /E /I /Y >nul
xcopy "%PATCH_DIR%data" "%PROJECT_DIR%\data" /E /I /Y >nul
xcopy "%PATCH_DIR%scripts" "%PROJECT_DIR%\scripts" /E /I /Y >nul
xcopy "%PATCH_DIR%lib" "%PROJECT_DIR%\lib" /E /I /Y >nul

if exist "%PROJECT_DIR%\components\cert\FAQ.tsx" del /Q "%PROJECT_DIR%\components\cert\FAQ.tsx"

echo.
echo 패치 적용이 완료되었습니다.
echo 다음 명령으로 확인하세요:
echo npm run dev
echo.
pause
