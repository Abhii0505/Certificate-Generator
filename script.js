async function generateCertificates() {
  const input = document.getElementById("nameListInput").value.trim();
  const event = document.getElementById("eventName").value.trim();
  const date = document.getElementById("eventDate").value.trim();
  const design = document.getElementById("designSelector").value;

  if (!input || !event || !design) {
    alert("Please fill in all fields.");
    return;
  }

  const names = input
    .split("\n")
    .map((name) => name.trim())
    .filter((name) => name);

  for (const name of names) {
    await generateSingleCertificate(name, event, date, design);
  }

  // alert("All certificates downloaded! ");
}

async function generateSingleCertificate(name, event, date, design) {
  const certDiv = document.getElementById("certificate");
  const certBg = certDiv.querySelector("img");
  const certName = document.getElementById("certName");
  const certEvent = document.getElementById("certEvent");
  const certDate = document.getElementById("certDate");

  // Set background and name style based on design
  switch (design) {
    case "1":
      certBg.src = "./assets/design1.png";
      certName.style = `
        position: absolute;
        top: 44%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 70px;
        font-family: "Tangerine", cursive;
        color: #000;
        font-weight: bold;
      `;
      break;

    case "2":
      certBg.src = "./assets/design2.png";
      certName.style = `
        position: absolute;
        top: 46%;
        left: 52%;
        transform: translate(-50%, -50%);
        font-size: 42px;
        font-family: 'Dancing Script', cursive;
        color: #222;
        font-weight: bold;
      `;
      break;

    case "3":
      certBg.src = "./assets/design3.png";
      certName.style = `
        position: absolute;
        top: 50%;
        left: 48%;
        transform: translate(-50%, -50%);
        font-size: 50px;
        font-family: 'Tangerine', cursive;
        color: #333;
        font-weight: bold;
      `;
      break;

    case "4":
      certBg.src = "./assets/design4.png";
      certName.style = `
        position: absolute;
        top: 58%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 46px;
        font-family: 'Roboto', sans-serif;
        color: #000;
        font-weight: bold;
      `;
      break;
  }

  // Set content
  certName.textContent = name;
  certEvent.textContent = event;
  certDate.textContent = date;

  certDiv.style.display = "block";

  await new Promise((resolve) => setTimeout(resolve, 1));

  const canvas = await html2canvas(certDiv);

  // Save canvas as JPEG
  const imgData = canvas.toDataURL("image/jpeg", 1.0); // Quality set to 1 (highest)

  const link = document.createElement("a");
  link.href = imgData;
  link.download = `${name}_Certificate.jpeg`;
  link.click();

  certDiv.style.display = "none";
}
