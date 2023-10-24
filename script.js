// script.js

// Initialize Firebase with your project's config
const firebaseConfig = {
    apiKey: "AIzaSyBRdOPwbAWGR1Yb-caV-51CXffcLU4qUM8",
  authDomain: "openchat-6fcee.firebaseapp.com",
  databaseURL: "https://openchat-6fcee-default-rtdb.firebaseio.com",
  projectId: "openchat-6fcee",
  storageBucket: "openchat-6fcee.appspot.com",
  messagingSenderId: "544517919099",
  appId: "1:544517919099:web:c2647b22e13fc40b446dde",
  measurementId: "G-E08XKJ79RN"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Handle sending messages
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');
const messagesDiv = document.getElementById('messages');

sendButton.addEventListener('click', () => {
    const messageText = messageInput.value;
    if (messageText.trim() !== '') {
        // Push the message to the database
        database.ref('messages').push({
            text: messageText,
            timestamp: new Date().getTime(),
        });
        messageInput.value = '';
    }
});

// Listen for new messages and display them
database.ref('messages').on('child_added', (snapshot) => {
    const message = snapshot.val();
    const messageElement = document.createElement('p');
    messageElement.textContent = message.text;
    messagesDiv.appendChild(messageElement);
});
