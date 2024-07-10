function encode() {
    const text = document.getElementById('inputText').value;
    const key = document.getElementById('key').value;
    const cipher = document.getElementById('cipherDropdown').value;
    let result = '';

    if (cipher === "railFence") {
        result = encryptRailFence(text, key);
    } else {
        result = "Unsupported cipher";
    }

    document.getElementById('result').textContent = result;
}


function decode() {
    const text = document.getElementById('inputText').value;
    const key = document.getElementById('key').value;
    const cipher = document.getElementById('cipherDropdown').value;
    let result = '';

    if (cipher === "railFence") {
        result = decryptRailFence(text, key);
    } else {
        result = "Unsupported cipher";
    }

    document.getElementById('result').textContent = result;
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