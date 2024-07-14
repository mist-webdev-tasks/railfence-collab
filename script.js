function encode() {
    const text = document.getElementById('encoderInput').value;
    const key = document.getElementById('encoderKey').value;
    const cipher = document.getElementById('cipherDropdown').value;
    let result = '';

    if (cipher === "railFence") {
        result = encryptRailFence(text, key);
    } else {
        result = "Unsupported cipher";
    }

    document.getElementById('encoderOutput').textContent = result;
}


function decode() {
    const text = document.getElementById('decoderInput').value;
    const key = document.getElementById('decoderKey').value;
    const cipher = document.getElementById('cipherDropdown').value;
    let result = '';

    if (cipher === "railFence") {
        result = decryptRailFence(text, key);
    } else {
        result = "Unsupported cipher";
    }

    document.getElementById('decoderOutput').textContent = result;
}


//encrypting function
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

//decrypting function
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

//function for Tutorial
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
    }
}

//funtion for decription
function description() {
    const cipher = document.getElementById('cipherDropdown').value;
    const descriptionText = document.getElementById('description');

    if (cipher === "unselected") {
        descriptionText.innerHTML = "<h2>Select a Cipher to see a Description of it.</h2>";
    } else if (cipher === "railFence") {
        descriptionText.innerHTML = `<h2>Rail Fence Cipher Description</h2>
                    <p>The Rail Fence Cipher is a type of transposition cipher, where characters are written diagonally in a zigzag pattern (resembling a rail fence) across several rails or lines. It rearranges the plaintext letters by shifting them around in a pattern resembling the shape of a fence.</p>`;
    }
}

//function t display Cipher Name
function updateCipherName() {
    const cipher = document.getElementById('cipherDropdown').value;
    let name = document.getElementById('Cipher-Name');

    if (cipher === "unselected") {
        name.textContent = "Please select a Cipher";
    } else if (cipher === "railFence") {
        name.textContent = "Rail Fence Cipher";
    }
}

//function for encoding card part
function updateEncodeCard() {
    const cipher = document.getElementById('cipherDropdown').value;
    let card = document.getElementById('encode');
    if (cipher === "unselected") {
        card.innerHTML = "<h2>Please select a Cipher to see it's Encoder</h2>";
    } else if (cipher === "railFence") {
        card.innerHTML = `<h2 class="card-title">Rail Fence Cipher Encoder</h2>
                  <form id="encoderForm">
                    <div class="mb-3">
                      <label for="encoderInput" class="form-label">Plain Text</label>
                      <textarea class="form-control" id="encoderInput" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="encoderKey" class="form-label">Number of Rails</label>
                      <input type="number" class="form-control" id="encoderKey" min="2" value="3">
                    </div>
                    <button type="submit" class="btn btn-primary" onclick="event.preventDefault(); encode();">Encode</button>
                  </form>
                  <div class="mt-3">
                    <label for="encoderOutput" class="form-label">Encoded Text</label>
                    <textarea class="form-control" id="encoderOutput" rows="2" readonly></textarea>
                  </div>`;
    }
}

//function for decoding card part
function updateDecodeCard() {
    const cipher = document.getElementById('cipherDropdown').value;
    let card = document.getElementById('decode');
    if (cipher === "unselected") {
        card.innerHTML = "<h2>Please select a Cipher to see it's Decoder</h2>";
    } else if (cipher === "railFence") {
        card.innerHTML = `<h2 class="card-title">Rail Fence Cipher Decoder</h2>
                  <form id="decoderForm">
                    <div class="mb-3">
                      <label for="decoderInput" class="form-label">Encoded Text</label>
                      <textarea class="form-control" id="decoderInput" rows="2"></textarea>
                    </div>
                    <div class="mb-3">
                      <label for="decoderKey" class="form-label">Number of Rails</label>
                      <input type="number" class="form-control" id="decoderKey" min="2" value="3">
                    </div>
                    <button type="submit" class="btn btn-primary" onclick="event.preventDefault(); decode();">Decode</button>
                  </form>
                  <div class="mt-3">
                    <label for="decoderOutput" class="form-label">Decoded Text</label>
                    <textarea class="form-control" id="decoderOutput" rows="2" readonly></textarea>
                  </div>`;
    }
}
