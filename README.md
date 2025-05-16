# Mem0Sync

This project syncs content from Notion pages into Mem0 using the Mem0 API.

## Setup

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Environment variables:**
   Create a `.env` file in the root directory with the following:
   ```env
   NOTION_API_KEY=your_notion_api_key
   NOTION_VERSION=2022-06-28
   MEM0_API_KEY=your_mem0_api_key
   USER_ID=your_user_id
   ```

## Usage

1. **Edit `notionToMem0.js`:**
   - Replace the placeholder Notion page IDs in the `notionPages` array with your real Notion page IDs and titles.
2. **Run the sync script:**
   ```bash
   node "📄 notionToMem0.js"
   ```

## Files
- `📄 notionToMem0.js`: Main script to sync Notion pages to Mem0
- `.env`: Environment variables (never commit this file)
- `.gitignore`: Make sure `.env` is listed here

## Notes
- Make sure your Notion integration has access to the pages you want to sync.
- For security, never share your `.env` file or API keys.
