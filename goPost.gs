// this code is not actually called by node. i am including it here to track it in git. this code lives in the google workspace
// This function will handle the API call and write data to the Google Sheet
function doPost(e) {
  try {
    // Parse the POST request body (JSON)
    const data = JSON.parse(e.postData.contents);

    // Open the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Loop through the res data and build user object
    data.forEach(user => {
      sheet.appendRow([
        user.id, 
        user.name, 
        user.email, 
        user.phone,
        user.website,
        user.company
      ]);
    });

    return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
