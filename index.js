function encode() {
    const text = document.getElementById('inputText').value;
    const key = document.getElementById('key').value;
    // Add Rail Fence Cipher encoding logic here
    document.getElementById('result').innerText = `Encoded Text: ${text}`; // Placeholder
}

function decode() {
    const text = document.getElementById('inputText').value;
    const key = document.getElementById('key').value;
    // Add Rail Fence Cipher decoding logic here
    document.getElementById('result').innerText = `Decoded Text: ${text}`; // Placeholder
}
