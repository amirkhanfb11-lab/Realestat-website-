@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0.."
call npx --yes serve out -l 4173
