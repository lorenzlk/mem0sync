// Google Apps Script version for Notion to Mem0 sync
// Copy this into https://script.google.com/ and set your API keys and Notion page IDs

// === CONFIGURATION ===
const NOTION_API_KEY = 'YOUR_NOTION_API_KEY';
const NOTION_VERSION = '2022-06-28';
const MEM0_API_KEY = 'YOUR_MEM0_API_KEY';
const USER_ID = 'YOUR_USER_ID';

// Example Notion pages to sync
const notionPages = [
  { id: 'replace_with_notion_page_id', title: 'Weekly Update' }
];

// Main entry point
function syncNotionToMem0() {
  for (var i = 0; i < notionPages.length; i++) {
    var page = notionPages[i];
    sendToMem0(page);
  }
}

function sendToMem0(page) {
  var notionPageId = page.id;
  var title = page.title;

  // Fetch Notion page content (customize as needed)
  var notionUrl = 'https://api.notion.com/v1/pages/' + notionPageId;
  var notionOptions = {
    method: 'get',
    headers: {
      'Authorization': 'Bearer ' + NOTION_API_KEY,
      'Notion-Version': NOTION_VERSION
    },
    muteHttpExceptions: true
  };
  var notionResponse = UrlFetchApp.fetch(notionUrl, notionOptions);
  var notionData = JSON.parse(notionResponse.getContentText());

  // Prepare payload for Mem0
  var mem0Url = 'https://api.mem0.com/v1/ingest';
  var mem0Payload = {
    user_id: USER_ID,
    data: {
      source: 'Notion',
      title: title,
      notion_page_id: notionPageId,
      last_updated: new Date().toISOString()
      // You can add more fields from notionData as needed
    }
  };
  var mem0Options = {
    method: 'post',
    contentType: 'application/json',
    headers: {
      'Authorization': 'Bearer ' + MEM0_API_KEY
    },
    payload: JSON.stringify(mem0Payload),
    muteHttpExceptions: true
  };
  var mem0Response = UrlFetchApp.fetch(mem0Url, mem0Options);

  Logger.log('Ingested "' + title + '" into Mem0. Response: ' + mem0Response.getContentText());
}
