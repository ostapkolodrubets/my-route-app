document.getElementById("sendBtn").addEventListener("click", send);

async function send() {
    const start = document.getElementById("start").value.trim();
    const end = document.getElementById("end").value.trim();
    const vehicle = document.getElementById("vehicle").value;

    if (!start || !end) {
        alert("Please enter both addresses!");
        return;
    }

    document.getElementById("result").innerHTML = "Loading...";

    const payload = { 
        start_address: start,
        end_address: end,
        vehicle_type: vehicle
    };

    try {
        const res = await fetch("https://hook.eu2.make.com/y9ianrfc2521t2g4vl44z6vwpscwhq5l", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log(data);

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
        document.getElementById("result").innerHTML = `
            <div class="result-card"><h3>Error</h3><pre>${err}</pre></div>
        `;
    }
}
