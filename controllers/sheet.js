const { google } = require('googleapis')

module.exports = {
  getSheet: (req,res)=>{
    res.render('sheet')
  },
  postSheet: async (req,res)=>{
    const { request, name } = req.body;

    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({ version: "v4", auth: client });

    const spreadsheetId = "1JhPlcDi_IoE7dVJ7YMnQo4jCHIRV3V_FZqXIzn3DhUs";

    const metaData = await googleSheets.spreadsheets.get({
      auth,
      spreadsheetId,
    });


    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: "Sheet1!A:A",
    });

    await googleSheets.spreadsheets.values.append({
      auth,
      spreadsheetId,
      range: "Sheet1!A:B",
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [[request, name]],
      },
    });

    res.send("Successfully submitted! Thank you!");
    },
}