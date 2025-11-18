<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Route AI</title>
<link rel="stylesheet" href="style.css" />
</head>

<body>

<h2>Route Planner AI</h2>

<div id="stopsContainer">
    <div class="stop-row" draggable="true">
        <input id="start" class="stop-input" placeholder="Enter start address" />
        <button id="addStopBtn" class="add-btn">+</button>
    </div>
    <input id="end" class="stop-input" placeholder="Enter destination address" />
</div>

<div class="row-line">
    <label for="vehicle">Vehicle type:</label>
    <select id="vehicle">
        <option value="car">Car</option>
        <option value="camper">Camper / Caravan</option>
        <option value="truck">Truck</option>
        <option value="motorcycle">Motorcycle</option>
    </select>

    <label for="travel_date">Travel date:</label>
    <input type="date" id="travel_date">
</div>

<br>
<button id="sendBtn">Send to AI</button>

<div id="result"></div>

<script src="maine.js"></script>
</body>
</html>
