document.getElementById('activationForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {};
  formData.forEach((val, key) => data[key] = val);

  console.log("שולח נתונים ל-Google Sheets", data);

  try {
    await fetch("https://script.google.com/macros/s/AKfycbzc3wjolLJaojMo7MhEKVPfAs-HlBLGbZC6WmFFjQei5k2r4cjBs5bXPIG2SV-5j123/exec", {
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