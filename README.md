# View Bot

An automated view bot using Puppeteer with stealth capabilities for generating website visits.

## Features

- 🤖 **Automated browsing** with Puppeteer
- 🥷 **Stealth mode** to avoid detection
- ⏰ **Scheduled execution** via GitHub Actions
- 🔄 **Configurable visit parameters**
- 📊 **Progress logging**

## Project Structure

```
view-bot/
├── .github/
│   └── workflows/
│       └── run-bot.yml      # GitHub Actions workflow
├── index.js                 # Main Puppeteer script
├── package.json            # Node.js dependencies
└── README.md               # This file
```

## Setup

### 1. Clone Repository

```bash
git clone <your-repository-url>
cd view-bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Set the target URL as an environment variable:

```bash
export TARGET_URL="https://your-target-website.com"
```

For GitHub Actions, add `TARGET_URL` as a repository secret:

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `TARGET_URL`
4. Value: Your target website URL

## Usage

### Local Development

Run the bot locally:

```bash
node index.js
```

### GitHub Actions (Automated)

The bot runs automatically every day at 1:00 AM Thai time (18:00 UTC previous day).

You can also trigger it manually:

1. Go to your repository → Actions tab
2. Select "Run Puppeteer Script" workflow
3. Click "Run workflow"

## Configuration

Edit these variables in `index.js`:

```javascript
const viewCount = 10000;      // Number of visits (default: 10,000)
const visitDuration = 3200;   // Time spent on each visit in ms (default: 3.2 seconds)
```

## How It Works

1. **Browser Launch**: Opens a headless Chrome browser with stealth configurations
2. **Visit Loop**: Performs the specified number of visits to the target URL
3. **Page Navigation**: Each visit opens a new tab, navigates to URL, waits for network idle
4. **Duration Control**: Stays on page for the configured duration
5. **Cleanup**: Closes each tab after visit and browser after completion

## Dependencies

- **puppeteer** (^24.10.1): Chrome browser automation
- **puppeteer-extra** (^3.3.6): Enhanced Puppeteer with plugin support
- **puppeteer-extra-plugin-stealth** (^2.11.2): Stealth plugin to avoid detection

## GitHub Actions Workflow

The workflow (`run-bot.yml`) includes:

- **Schedule**: Daily execution at 1:00 AM Thai time
- **Manual trigger**: Can be run on-demand
- **Environment**: Ubuntu latest with Node.js 20
- **Security**: Uses repository secrets for sensitive data

## Security Features

- Stealth plugin to mimic human browsing behavior
- Headless browser operation
- Randomized user agents and browser fingerprints
- Network idle waiting for natural page loading

## Monitoring

The script provides console output for:

- ✅ Successful visits with visit numbers
- ❌ Error messages for failed attempts
- 📊 Progress updates
- 🏁 Completion notifications

## Important Notes

⚠️ **Disclaimer**: This tool is for educational purposes only. Make sure you have permission to visit the target website and comply with their terms of service and robots.txt.

⚠️ **Rate Limiting**: The bot includes built-in delays to avoid overwhelming target servers.

## License

ISC License

## Support

If you encounter any issues:

1. Check the GitHub Actions logs for error details
2. Verify your TARGET_URL secret is correctly set
3. Ensure the target website is accessible
4. Review console output for specific error messages