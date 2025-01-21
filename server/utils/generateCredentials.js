const generateCredentials = () => {
    const shortCode = process.env.SHORT_CODE;
    const passkey = process.env.PASSKEY;
    
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);
  
    const rawPassword = shortCode + passkey + timestamp;
    const password = Buffer.from(rawPassword).toString("base64");
  
    return { timestamp, password };
  };
  
  module.exports = { generateCredentials };
  