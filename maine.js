document.getElementById("sendBtn").addEventListener("click", send);
document.getElementById("addStopBtn").addEventListener("click", addStop);

let stopCount = 0;
const maxStops = 5;

// Додавання зупинок
function addStop() {
    if (stopCount >= maxStops) {
        alert(`Maximum stops allowed: ${maxStops}`);
        return;
    }

    stopCount++;

    const container = document.getElementById("stopsContainer");
    const div = document.createElement("div");

    div.classList.add("stop-item");
    div.innerHTML = `
        <label>Stop ${stopCount}:</label>
        <input type="text" class="stop-input" placeholder="Enter stop address">
    `;

    container.insertBefore(div, document.getElementById("end"));
}

// Зібрати всі зупинки
function getStops() {
    return [...document.querySelectorAll(".stop-input")]
        .map(i => i.value.trim())
        .filter(v => v.length > 0);
}

// Надсилання в AI / Make / Backend
async function send() {
    const start = document.getElementById("start").value.trim();
    const end = document.getElementById("end").value.trim();
    const vehicle = document.getElementById("vehicle").value;
    const travel_date = document.getElementById("travel_date").value;
    const stops = getStops();

    if (!start || !end) {
        alert("Please enter start and end address.");
        return;
    }

    document.getElementById("result").innerHTML = "Loading...";

    const payload = { 
        start_address: start,
        end_address: end,
        stops: stops,
        vehicle_type: vehicle,
        travel_date: travel_date
    };

    try {
        const res = await fetch("https://hook.eu2.make.com/y9ianrfc2521t2g4vl44z6vwpscwhq5l", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log(data);

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

    } catch (err) {
        document.getElementById("result").innerHTML = 
            `<div class="result-card"><h3>Error</h3><pre>${err}</pre></div>`;
    }
}
