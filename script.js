document.getElementById('activationForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {};
  formData.forEach((val, key) => data[key] = val);

  console.log("שולח נתונים ל-Google Sheets", data);

  try {
    await fetch("https://script.google.com/macros/s/AKfycbyAsVjb6nNrrRO5o1unQpUUOBPYQPG7BE3b4cbOVitPQlYwJpxt0Qh3gYUto2U5pAv9/exec", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    });
    window.location.href = "success.html";
  } catch (err) {
    alert("שגיאה בשליחה ל-Google Sheets");
    console.error(err);
  }
});
