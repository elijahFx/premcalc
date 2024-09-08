const URLS = [
    "http://localhost:4000/users/statistics", 
    "https://premcalc.onrender.com/users/statistics", 
    "https://premiumcalculator.site/users/statistics"
  ];
  const BASIC_URL = URLS[2]; // Switch between different URLs based on your environment
  
  (async function triggerAddStatistic() {
    try {
      const response = await fetch(BASIC_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Statistics updated successfully for all users:", result);
    } catch (error) {
      console.error("Error updating statistics:", error);
    }
  })();