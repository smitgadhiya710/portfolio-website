@echo off
cd /d "%~dp0"
node node_modules\next\dist\bin\next dev --hostname 0.0.0.0 --port 3000
