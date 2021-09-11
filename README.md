# chat-api
The chat-api is an API with `send_message` and `read_messages` endpoints. `send_message` requests the user to specify a unique chatroom identifier (chat_id), sender name, and the message in order to save it in the database. `read_messages` requests a chat_id and optionally the sender's name in order to fetch the messages contained in the unique chatroom.
## Pre-requisistes
* Node.js with npm
* MongoDB Atlas Account
## Database Setup
1. Log into your Atlas account
2. Create a new cluster
    1. Choose allowed IPs
    2. Create a database account
    3. Choose `Connect your application`
    4. Copy the provided `uri`
## Local Setup
1. Download this project
2. Run `npm install` in the project directory
3. Create a `.env` file in your project directory
4. Add `URI=your_uri_here` to the `.env` file and save it
5. Run `npm start` in project terminal
## Heroku
You can try the API by interacting with `https://acm-chat-api.herokuapp.com/`
## API Usage
```
POST /send_message
Eg. http://localhost:3000/send_message

{
    "chat_id": "chatroom1"
    "sender": "adam",
    "message": "This is just a test message..."
}

=>

db_object_id

```
```
GET /read_messages
Eg. http://localhost:3000/read_messages

{
    "chat_id": "chatroom1"
    "sender": "adam" // optional
}

=>

[{
    "sender": "adam",
    "message": "This is just a test message..."
}]

```
