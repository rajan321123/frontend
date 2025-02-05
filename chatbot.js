function sendMessage(message) {
    fetch("https://your-chatbot-api.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => displayResponse(data.reply))
    .catch(error => console.error("Error:", error));
}
