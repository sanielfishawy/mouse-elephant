import net from 'net'

// Create a TCP server
const server = net.createServer((socket) => {
    console.log('Client connected');

    socket.on('data', (data) => {
        console.log(`Received data of size: ${data.length} bytes`);
    });

    socket.on('end', () => {
        console.log('Client disconnected');
    });

    socket.on('error', (err) => {
        console.error('Server Error:', err);
    });
});

server.listen(6000, () => {
    console.log('Server listening on port 6000');
});

// Client code to send a 1MB buffer filled with 'a'
const client = new net.Socket();
const buffer = Buffer.alloc(100 * 1024 * 1024, 'a'); // 1MB buffer filled with 'a'

client.connect(6000, '127.0.0.1', () => {
    console.log('Connected to server');
    client.write(buffer, () => {
        console.log('Buffer sent to server');
    });
});

client.on('close', () => {
    console.log('Connection closed');
});

client.on('error', (err) => {
    console.error('Client Error:', err);
});
