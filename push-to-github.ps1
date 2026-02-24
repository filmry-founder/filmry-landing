# Connect Filmry to GitHub and push
# Run in PowerShell: .\push-to-github.ps1

$ErrorActionPreference = "Stop"
$repoRoot = $PSScriptRoot

Set-Location $repoRoot

# Ensure Git is available
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Git is not installed or not in PATH. Install from https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# Initialize if needed
if (-not (Test-Path .git)) {
    Write-Host "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit"
}

Write-Host "=== Connecting to GitHub ===" -ForegroundColor Cyan

# 1. Add or update remote origin
$remoteUrl = "https://github.com/filmry-founder/filmry-landing.git"
$currentRemote = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
    Write-Host "Updating existing remote origin..."
    git remote set-url origin $remoteUrl
} else {
    Write-Host "Adding remote origin..."
    git remote add origin $remoteUrl
}

# 2. Ensure branch is main
Write-Host "Setting branch to main..."
git branch -M main

# 3. Push to GitHub
Write-Host "Pushing to origin main..."
git push -u origin main

Write-Host "`n=== Success ===" -ForegroundColor Green
Write-Host "Code pushed to https://github.com/filmry-founder/filmry-landing"
