document.getElementById("sendBtn").addEventListener("click", send);

async function send() {
    const start = document.getElementById("start").value.trim();
    const end = document.getElementById("end").value.trim();

    if(!start || !end) {
        alert("Please enter both addresses!");
        return;
    }

    document.getElementById("result").innerText = "Loading...";

    const payload = {
        start_address: start,
        end_address: end
    };

    try {
        const res = await fetch("https://hook.eu2.make.com/y9ianrfc2521t2g4vl44z6vwpscwhq5l", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log(data);

        if(data) {
            document.getElementById("result").innerHTML = `
                <a href="${data.route}" target="_blank">Google Maps Route</a>
                <pre>${data.advice}</pre>
            `;
        }

    } catch (err) {
        document.getElementById("result").innerText = "Error: " + err;
    }
}