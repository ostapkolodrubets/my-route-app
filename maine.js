document.getElementById("sendBtn").addEventListener("click", send);
document.getElementById("addStopBtn").addEventListener("click", addStop);

let stopCount = 0;
const maxStops = 5;

function addStop() {
    if (stopCount >= maxStops) {
        alert(`Maximum stops allowed: ${maxStops}`);
        return;
    }

    stopCount++;
    const container = document.getElementById("stopsContainer");
    const endInput = document.getElementById("end");

    const div = document.createElement("div");
    div.classList.add("stop-row");
    div.draggable = true;
    div.innerHTML = `
        <input type="text" class="stop-input" placeholder="Enter stop address">
        <button class="remove-btn">x</button>
    `;

    container.insertBefore(div, endInput);

    const input = div.querySelector("input");
    input.focus();

    const removeBtn = div.querySelector(".remove-btn");
    removeBtn.addEventListener("click", () => {
        div.remove();
        stopCount--;
    });

    enableDragAndDrop();
}

function getStops() {
    return [...document.querySelectorAll(".stop-input")]
        .map(i => i.value.trim())
        .filter(v => v.length > 0);
}

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

        let responseText = await res.text();
        responseText = responseText.replace(/^```json\s*/, '').replace(/```$/, '');
        const data = JSON.parse(responseText);

        document.getElementById("result").innerHTML = `
            <div class="result-card">
                <h3>Route Link</h3>
                <a href="${data.route}" target="_blank">Open in Google Maps</a>
            </div>
            <div class="result-card">
                ${data.advice}
            </div>
        `;

    } catch (err) {
        document.getElementById("result").innerHTML = 
            `<div class="result-card"><h3>Error</h3><pre>${err}</pre></div>`;
    }
}

function enableDragAndDrop() {
    console.log('zalupa')
    const rows = document.querySelectorAll(".stop-row");
    let dragged = null;

    rows.forEach(row => {
        row.addEventListener("dragstart", e => {
            dragged = row;
            row.style.opacity = "0.5";
        });

        row.addEventListener("dragend", e => {
            dragged = null;
            row.style.opacity = "1";
        });

        row.addEventListener("dragover", e => {
            e.preventDefault();
        });

        row.addEventListener("drop", e => {
            e.preventDefault();
            if (dragged && dragged !== row) {
                const container = document.getElementById("stopsContainer");
                container.insertBefore(dragged, row);
            }
        });
    });
}

enableDragAndDrop();
