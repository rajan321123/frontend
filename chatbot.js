function sendMessage(message) {
    fetch("https://widget-1.onrender.comt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => displayResponse(data.reply))
    .catch(error => console.error("Error:", error));
}
