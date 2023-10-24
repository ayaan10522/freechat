// script.js

// Initialize Firebase with your project's config
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
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
