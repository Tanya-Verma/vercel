
const API = "https://mathminder-11.onrender.com";

async function solve() {
  let q = document.getElementById("input").value;

  if (!q) {
    alert("Please enter a math problem");
    return;
  }

  try {
    document.getElementById("output").innerText = "Solving... ⏳";

    let res = await fetch(`${API}/solve?q=${encodeURIComponent(q)}`);
    let data = await res.json();

    if (data.error) {
      document.getElementById("output").innerText = "Error: " + data.error;
    } else {
      document.getElementById("output").innerText =
        "Answer: " + data.answer + "\n\n" + data.explanation;
    }

  } catch (err) {
    document.getElementById("output").innerText =
      "Server error. Backend might be sleeping 😴";
  }
}


// ------------------ IMAGE SOLVER ------------------
async function upload() {
  let fileInput = document.getElementById("file");
  let file = fileInput.files[0];

  if (!file) {
    alert("Please upload an image");
    return;
  }

  let form = new FormData();
  form.append("file", file);

  try {
    document.getElementById("output").innerText = "Processing image... ⏳";

    let res = await fetch(`${API}/solve-image`, {
      method: "POST",
      body: form
    });

    let data = await res.json();

    if (data.error) {
      document.getElementById("output").innerText = "Error: " + data.error;
    } else {
      document.getElementById("output").innerText =
        "Detected: " + data.detected_text + "\n\n" + data.explanation;
    }

  } catch (err) {
    document.getElementById("output").innerText =
      "Server error. Backend might be sleeping 😴";
  }
}