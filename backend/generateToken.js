import fs from "fs";
import { google } from "googleapis";
import readline from "readline";

const credentials = JSON.parse(fs.readFileSync("credentials.json"));
const { client_secret, client_id, redirect_uris } =
  credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/gmail.send"],
});

console.log("\nAuthorize this app by visiting this URL:\n");
console.log(authUrl, "\n");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Paste the authorization code here: ", async (code) => {
  const { tokens } = await oAuth2Client.getToken(code);
  fs.writeFileSync("token.json", JSON.stringify(tokens, null, 2));
  console.log("\n✅ token.json created successfully\n");
  rl.close();
});