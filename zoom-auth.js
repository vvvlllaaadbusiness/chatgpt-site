const axios = require("axios");
const qs = require("qs");

const clientId = "XIPv7iapTYSlALNUqGSisA";
const clientSecret = "LlPmuNslPCEYHke0f21m8MDz363qrdpA";
const accountId = "mE24_NFETeSoTgEl95Nlmw";

const authString = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

async function getAccessToken() {
  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      qs.stringify({
        grant_type: "account_credentials",
        account_id: accountId,
      }),
      {
        headers: {
          Authorization: `Basic ${authString}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("✅ Токен:", response.data.access_token);
  } catch (err) {
    console.error("❌ Ошибка:", err.response?.data || err.message);
  }
}

getAccessToken();
npm install axios qs
node zoom-auth.js
