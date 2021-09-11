const { uri } = require('./config.json');
const { MongoClient } = require('mongodb');
const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;

app.listen(port);

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

app.post('/send_message', async (req, res) => {
    const status = await sendMsg(req.body.chat_id, req.body.sender, req.body.message);
    res.send(status);
});

app.get('/read_messages', async (req, res) => {
    const status = await readMsg(req.body.chat_id, req.body.sender);
    res.send(status);
});

const client = new MongoClient(uri);

async function sendMsg (chat_id, sender, message) {
    try {
        await client.connect();
        const db = client.db('chat');
        const collection = db.collection(chat_id);
        let data = {
            'sender': sender,
            'message': message
        }
        await collection.insertOne(data);
        console.log('Inserted a message entry.');
    } catch (error) {
        console.error(error);
        return `ERROR: ${error}`;
    } finally {
        await client.close();
    }
}

async function readMsg (chat_id, author) {
    try {
        await client.connect();
        const db = client.db('chat');
        const exists = await db.listCollections({ name: chat_id }).hasNext();
        if (!exists) return `ERROR: chat_id ${chat_id} not found!`;
        const collection = db.collection(chat_id);
        var results = [];
        if (author) results = await collection.find({ sender: author }).toArray();
        else results = await collection.find().toArray();
        results.forEach((result, index) => {
            results[index] = { sender: result.sender, message: result.message };
        });
        return results;
    } catch (error) {
        console.error(error);
        return `ERROR: ${error}`;
    } finally {
        await client.close();
    }
}



