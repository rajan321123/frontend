// chatbot.js

const chatButton = document.getElementById("chat-button");
const chatInput = document.getElementById("chat-input");
const chatWindow = document.getElementById("chat-window");

// Define the backend API URL
const backendUrl = "https://widget-1.onrender.com/chat";

// Send message to the backend
async function sendMessage(message) {
    try {
        // Prepare the data to send
        const data = {
            message: message
        };

        // Make the POST request to the Flask backend
        const response = await fetch(backendUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        // Parse the response
        const responseData = await response.json();
        if (response.ok) {
            // Display the response message in the chat window
            const responseMessage = responseData.reply;
            displayMessage(responseMessage, "bot");
        } else {
            // If there's an error, display it
            displayMessage("Sorry, there was an error. Please try again later.", "bot");
        }
    } catch (error) {
        // Handle network or other errors
        console.error("Error sending message:", error);
        displayMessage("Sorry, there was an error. Please try again later.", "bot");
    }
}

// Display message in the chat window
function displayMessage(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight; // Auto scroll to the latest message
}

// Handle sending the user's message
chatButton.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage !== "") {
        displayMessage(userMessage, "user");
        chatInput.value = ""; // Clear the input field
        sendMessage(userMessage); // Send message to the backend
    }
});

// Optionally, allow pressing Enter to send the message
chatInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        chatButton.click();
    }
});
