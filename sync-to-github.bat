@echo off
chcp 65001 >nul
echo ========================================
echo   📤 同步到 GitHub
echo ========================================
echo.

cd /d "C:\Users\Administrator\.gemini\antigravity\scratch\podcast-generator"

echo 正在添加文件...
git add .

echo.
set /p msg="请输入更新说明 (直接回车默认'更新内容'): "
if "%msg%"=="" set msg=更新内容

echo.
echo 正在提交...
git commit -m "%msg%"

echo.
echo 正在推送到 GitHub...
git push

echo.
echo ========================================
echo   ✅ 同步完成！
echo   网站将在1-2分钟后更新
echo   https://miaom9897-pixel.github.io/podcast-generator/admin.html
echo ========================================
echo.
pause
