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
    let n = cipher.length;
    let matrix = [];

    for (let i = 0; i < key; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = null;
        }
    }

    let even = 0, num = 0;
    
    for (let i = 0; i < key; i++) {
        let j = i;
        while (j < n) {
            matrix[i][j] = cipher[num];
            num++;
            if (even === 0) {
                even = 1;
                j += 2 * (key - 1 - i);
            } else {
                even = 0;
                j += 2 * i;
            }
        }
        even = 0;
    }

    let result = '';
    let row = 0, col = 0;
    let directionDown = false;

    for (let i = 0; i < n; i++) {
        result+=matrix[row][col];
        if (row === 0 || row === key - 1) {
            directionDown = !directionDown;
        }
        row += directionDown ? 1 : -1;
        col++;
    }

    return result;
}

//function for Tutorial
function tutorial() {
    const cipher = document.getElementById('cipherDropdown').value;
    const tutorialTitle = document.getElementById('tutorial-title');
    const tutorialText = document.getElementById('tutorial-text');

    if (cipher === "unselected") {
        tutorialTitle.textContent = "Select a Cipher to see a Tutorial of it.";
        tutorialText.textContent = "";
    } else if (cipher === "railFence") {
        tutorialTitle.textContent = "Rail Fence Cipher Tutorial";
        tutorialText.textContent = "The Rail Fence Cipher is a type of transposition cipher, where characters are written diagonally in a zigzag pattern (resembling a rail fence) across several rails or lines. It rearranges the plaintext letters by shifting them around in a pattern resembling the shape of a fence.";
    }
}

//funtion for decription
function description() {
    const cipher = document.getElementById('cipherDropdown').value;
    const descriptionTitle = document.getElementById('description-title');
    const descriptionText = document.getElementById('description-text');

    if (cipher === "unselected") {
        descriptionTitle.innerHTML = "<h2>Select a Cipher to see a Description of it.</h2>";
        descriptionText.innerHTML = "";
    } else if (cipher === "railFence") {
        descriptionTitle.innerHTML = "<h2>Rail Fence Cipher Description</h2>";
        descriptionText.innerHTML = `
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
            </ul>
        `;
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
