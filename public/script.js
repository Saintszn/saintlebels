document.getElementById("orderButton").addEventListener("click", async () => {
    const phoneNumber = prompt("Enter your Safaricom Mpesa Number:");
    const amount = 1000; // Example amount for a sneaker order
  
    if (phoneNumber) {
      try {
        const response = await fetch("/api/pay", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber, amount }),
        });
        const result = await response.json();
  
        if (result.success) {
          alert("Payment successful! Receipt: " + result.receiptNumber);
        } else {
          alert("Payment failed: " + result.message);
        }
      } catch (error) {
        alert("Error occurred: " + error.message);
      }
    }
  });
  