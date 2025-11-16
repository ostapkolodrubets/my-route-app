const stopsContainer = document.getElementById("stops-container");
const addStopBtn = document.getElementById("addStopBtn");
const sendBtn = document.getElementById("sendBtn");
const maxStops = 5;

// Додаємо новий інпут при натисканні на кнопку
addStopBtn.addEventListener("click", () => {
    const stopInputs = stopsContainer.querySelectorAll(".stop-input");
    if (stopInputs.length >= maxStops) {
        alert("Максимальна кількість зупинок – 5");
        return;
    }
    const newInput = document.createElement("input");
    newInput.classList.add("stop-input");
    newInput.placeholder = `Enter stop ${stopInputs.length}`;
    stopsContainer.insertBefore(newInput, document.getElementById("end"));
});

// Відправка запиту
sendBtn.addEventListener("click", async () => {
    const stopInputs = stopsContainer.querySelectorAll(".stop-input");
    const stops = Array.from(stopInputs).map(input => input.value.trim()).filter(Boolean);

    if (stops.length < 2) {
        alert("Введіть хоча б старт та кінцеву точки!");
        return;
    }

    const vehicle = document.getElementById("vehicle").value;
    const travelDate = document.getElementById("travel_date").value;

    document.getElementById("result").innerHTML = "Loading...";

    const payload = {
        stops: stops,
        vehicle: vehicle,
        travel_date: travelDate
    };

    try {
        const res = await fetch("https://your-backend-url/route", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (data) {
            document.getElementById("result").innerHTML = `
                <div class="result-card">
                    <h3>Route Link</h3>
                    <a href="${data.route}" target="_blank">Open in Google Maps</a>
                </div>
                <div class="result-card">
                    <h3>Recommendations</h3>
                    <pre>${data.advice}</pre>
                </div>
            `;
        }
    } catch (err) {
        document.getElementById("result").innerHTML = `<div class="result-card"><h3>Error</h3><pre>${err}</pre></div>`;
    }
});
