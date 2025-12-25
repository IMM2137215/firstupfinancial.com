@echo off
echo Starting First Up Financial...
echo.

start "First Up Financial - Backend" cmd /c "cd server && npx ts-node src/app.ts"
timeout /t 3 /nobreak > nul

start "First Up Financial - Frontend" cmd /c "cd client && npm run dev"

echo.
echo Servers starting in separate windows!
echo Backend: http://localhost:3001
echo Frontend: http://localhost:5173
echo.
pause
