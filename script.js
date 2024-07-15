// Main encoding function
function encode() {
    const text = document.getElementById('encoderInput').value;
    const key = document.getElementById('encoderKey').value;
    const cipher = document.getElementById('cipherDropdown').value;
    let result = '';

    if (cipher === "railFence") {
        result = encryptRailFence(text, parseInt(key));
    } else if (cipher === "monoalphabetic") {
        result = encodeMonoalphabetic(text, key);
    } else {
        result = "Unsupported cipher";
    }

    document.getElementById('encoderOutput').value = result;
}

// Main decoding function
function decode() {
    const text = document.getElementById('decoderInput').value;
    const key = document.getElementById('decoderKey').value;
    const cipher = document.getElementById('cipherDropdown').value;
    let result = '';

    if (cipher === "railFence") {
        result = decryptRailFence(text, parseInt(key));
    } else if (cipher === "monoalphabetic") {
        result = decodeMonoalphabetic(text, key);
    } else {
        result = "Unsupported cipher";
    }

    document.getElementById('decoderOutput').value = result;
}

// Function to encode using Monoalphabetic Cipher
function encodeMonoalphabetic(text, key) {
    shuffledArr = key.toUpperCase().split('');
    var textArr = text.split("");

    for (let k = 0; k < textArr.length; k++) {
        if ((textArr[k] == ' ') || (textArr[k] == '\t') || (textArr[k] == '\n') || alphabetArr.indexOf(textArr[k].toUpperCase()) == -1) {
            continue;
        } else {
            textArr[k] = shuffledArr[alphabetArr.indexOf(textArr[k].toUpperCase())];
        }
    }
    return textArr.join().replace(/,/g, '');
}

// Function to decode using Monoalphabetic Cipher
function decodeMonoalphabetic(text, key) {
    var textArr = text.split("");
    shuffledArr = key.toUpperCase().split('');

    for (let k = 0; k < textArr.length; k++) {
        if ((textArr[k] == ' ') || (textArr[k] == '\t') || (textArr[k] == '\n') || alphabetArr.indexOf(textArr[k].toUpperCase()) == -1) {
            continue;
        } else {
            textArr[k] = alphabetArr[shuffledArr.indexOf(textArr[k].toUpperCase())];
        }
    }
    return textArr.join().replace(/,/g, '');
}

// Function to encode using Rail Fence Cipher
function encryptRailFence(text, key) {
    let n = text.length;
    let matrix = [];

    for (let i = 0; i < key; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = null;
        }
    }

    let row = 0, col = 0;
    let directionDown = false;

    for (let i = 0; i < n; i++) {
        matrix[row][col] = text[i];
        if (row === 0 || row === key - 1) {
            directionDown = !directionDown;
        }
        row += directionDown ? 1 : -1;
        col++;
    }

    let result = '';
    for (let r = 0; r < key; r++) {
        for (let c = 0; c < n; c++) {
            if (matrix[r][c] !== null) {
                result += matrix[r][c];
            }
        }
    }
    return result;
}

// Function to decode using Rail Fence Cipher
function decryptRailFence(cipher, key) {
    if (key === 1) return cipher;  // Edge case for a single rail

    let n = cipher.length;
    let matrix = Array.from({ length: key }, () => Array(n).fill(null));

    let idx = 0;
    let row = 0;
    let col = 0;
    let directionDown = false;

    // Mark the positions in the matrix
    for (let i = 0; i < n; i++) {
        matrix[row][col++] = '*';
        if (row === 0 || row === key - 1) {
            directionDown = !directionDown;
        }
        row += directionDown ? 1 : -1;
    }

    // Fill the marked positions with cipher characters
    for (let i = 0; i < key; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] === '*') {
                matrix[i][j] = cipher[idx++];
            }
        }
    }

    // Read the matrix in a zigzag manner to decrypt the message
    let result = '';
    row = 0;
    col = 0;
    directionDown = false;

    for (let i = 0; i < n; i++) {
        result += matrix[row][col++];
        if (row === 0 || row === key - 1) {
            directionDown = !directionDown;
        }
        row += directionDown ? 1 : -1;
    }

    return result;
}

// Function to display tutorial based on selected cipher
function tutorial() {
    const cipher = document.getElementById('cipherDropdown').value;
    const tutorialText = document.getElementById('tutorial');

    if (cipher === "unselected") {
        tutorialText.innerHTML = "<h2>Select a Cipher to see a Tutorial of it.</h2>";
    } else if (cipher === "railFence") {
        tutorialText.innerHTML = `<h2>Rail Fence Cipher Tutorial</h2>
                    <h2>Encryption Process:</h2>
                    <ul>
                        <li>Set up a matrix with rows equal to the key and columns equal to the length of the plaintext.</li>
                        <li>Fill the matrix by placing each character of the plaintext in a zigzag pattern across the rows.</li>
                        <li>Read the ciphertext row by row to generate the encrypted text.</li>
                    </ul>
                    <h2>Decryption Process:</h2>
                    <ul>
                        <li>Reconstruct the rail structure by setting up an empty matrix with rows equal to the key and columns equal to the length of the ciphertext.</li>
                        <li>Fill the matrix with the ciphertext in the zigzag pattern as it was during encryption.</li>
                        <li>Read the matrix in a zigzag manner to retrieve the original plaintext.</li>
                    </ul>`;
    } else if (cipher === "monoalphabetic") {
        tutorialText.innerHTML = `<h2>Monoalphabetic Cipher Tutorial</h2>
                    <h2>Encryption Process:</h2>
                    <ul>
                        <li>Create a substitution map using the provided key.</li>
                        <li>Replace each character of the plaintext with the corresponding character from the substitution map.</li>
                    </ul>
                    <h2>Decryption Process:</h2>
                    <ul>
                        <li>Create a reverse substitution map from the original substitution map.</li>
                        <li>Replace each character of the ciphertext with the corresponding character from the reverse substitution map.</li>
                    </ul>`;
    }
}

// Function to display description based on selected cipher
function description() {
    const cipher = document.getElementById('cipherDropdown').value;
    const descriptionText = document.getElementById('description');

    if (cipher === "unselected") {
        descriptionText.innerHTML = "<h2>Select a Cipher to see a Description of it.</h2>";
    } else if (cipher === "railFence") {
        descriptionText.innerHTML = `<h2>Rail Fence Cipher Description</h2>
                    <p>The Rail Fence Cipher is a type of transposition cipher, where characters are written diagonally in a zigzag pattern (resembling a rail fence) across several rails or lines. It rearranges the plaintext letters by shifting them around in a pattern resembling the shape of a fence.</p>`;
    } else if (cipher === "monoalphabetic") {
        descriptionText.innerHTML = `<h2>Monoalphabetic Cipher Description</h2>
                    <p>The Monoalphabetic Cipher is a substitution cipher where each letter of the plaintext is replaced by a corresponding letter from a fixed substitution alphabet. It relies on a key to define the substitution, making it relatively simple yet effective for encoding messages.</p>`;
    }
}

// Function to update cipher name based on selection
function updateCipherName() {
    const cipher = document.getElementById('cipherDropdown').value;
    let name = document.getElementById('Cipher-Name');

    if (cipher === "unselected") {
        name.textContent = "Please select a Cipher";
    } else if (cipher === "railFence") {
        name.textContent = "Rail Fence Cipher";
    } else if (cipher === "monoalphabetic") {
        name.textContent = "Monoalphabetic Cipher";
    }
}

// Function to update the encode card based on selected cipher
function updateEncodeCard() {
    const cipher = document.getElementById('cipherDropdown').value;
    let card = document.getElementById('encode');
    if (cipher === "unselected") {
        card.innerHTML = "<h2>Please select a Cipher</h2>";
    } else if (cipher === "railFence") {
        card.innerHTML = `<div class="input-group mb-3">
            <textarea id="encoderInput" class="form-control" rows="3" placeholder="Enter plaintext to be encoded"></textarea>
        </div>
        <div class="input-group mb-3">
            <input type="number" id="encoderKey" class="form-control" placeholder="Enter the key (number of rails)">
        </div>
        <button type="button" class="btn btn-primary" onclick="encode()">Encode</button>
        <div class="input-group mb-3">
            <textarea id="encoderOutput" class="form-control" rows="3" readonly></textarea>
        </div>`;
    } else if (cipher === "monoalphabetic") {
        card.innerHTML = `<div class="input-group mb-3">
            <textarea id="encoderInput" class="form-control" rows="3" placeholder="Enter plaintext to be encoded"></textarea>
        </div>
        <div class="input-group mb-3">
            <input type="text" id="encoderKey" class="form-control" placeholder="Enter the key (substitution alphabet)">
        </div>
        <button type="button" class="btn btn-primary" onclick="encode()">Encode</button>
        <div class="input-group mb-3">
            <textarea id="encoderOutput" class="form-control" rows="3" readonly></textarea>
        </div>`;
    }
}

// Function to update the decode card based on selected cipher
function updateDecodeCard() {
    const cipher = document.getElementById('cipherDropdown').value;
    let card = document.getElementById('decode');
    if (cipher === "unselected") {
        card.innerHTML = "<h2>Please select a Cipher</h2>";
    } else if (cipher === "railFence") {
        card.innerHTML = `<div class="input-group mb-3">
            <textarea id="decoderInput" class="form-control" rows="3" placeholder="Enter ciphertext to be decoded"></textarea>
        </div>
        <div class="input-group mb-3">
            <input type="number" id="decoderKey" class="form-control" placeholder="Enter the key (number of rails)">
        </div>
        <button type="button" class="btn btn-primary" onclick="decode()">Decode</button>
        <div class="input-group mb-3">
            <textarea id="decoderOutput" class="form-control" rows="3" readonly></textarea>
        </div>`;
    } else if (cipher === "monoalphabetic") {
        card.innerHTML = `<div class="input-group mb-3">
            <textarea id="decoderInput" class="form-control" rows="3" placeholder="Enter ciphertext to be decoded"></textarea>
        </div>
        <div class="input-group mb-3">
            <input type="text" id="decoderKey" class="form-control" placeholder="Enter the key (substitution alphabet)">
        </div>
        <button type="button" class="btn btn-primary" onclick="decode()">Decode</button>
        <div class="input-group mb-3">
            <textarea id="decoderOutput" class="form-control" rows="3" readonly></textarea>
        </div>`;
    }
}

// Array to store the shuffled alphabet for Monoalphabetic Cipher
var shuffledArr;
let alphabetArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];