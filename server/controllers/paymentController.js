const axios = require("axios");
const { generateCredentials } = require("../utils/generateCredentials");

const initiateSTKPush = async (req, res) => {
  const { phoneNumber, amount } = req.body;
  const { password, timestamp } = generateCredentials();

  try {
    const tokenResponse = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString("base64")}`,
      },
    });

    const accessToken = tokenResponse.data.access_token;

    const stkResponse = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.SHORT_CODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: process.env.SHORT_CODE,
        PhoneNumber: phoneNumber,
        CallBackURL: process.env.CALLBACK_URL,
        AccountReference: "SneakerOrder",
        TransactionDesc: "Order Sneakers",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json({ success: true, message: "STK Push initiated", receiptNumber: stkResponse.data.CheckoutRequestID });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.json({ success: false, message: "Payment failed" });
  }
};

module.exports = { initiateSTKPush };
