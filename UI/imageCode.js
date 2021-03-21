var canvas, ctx;
let dataURL = '';
let ipfsHash = '';
let creatorr;

// Enums for rarity types
const rarity = {
    COMMON: "C",
    UNCOMMON: "U",
    RARE: "R",
    SUPERRARE: "SR",
    ULTRARARE: "UR"
};

const borderColor = {
    C: "#DBDBDB",
    U: "#03AC13",
    R: "#63C5DA",
    SR: "#B65FCF",
    UR: "#D4AF37"
}

function CreatorrInfo(x, y, width, height, imageURL, cardRarityTitle, creatorText, date, borderColor, textColor, serialNumber) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.imageURL = imageURL
    this.cardRarityTitle = cardRarityTitle
    this.creatorText = creatorText
    this.date = date
    this.borderColor = borderColor
    this.textColor = textColor
    this.serialNumber = serialNumber
};

function init() {

    // Throwaway code to display in HTML
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    // custom creator object to handle properties passed in from backend to frontend
    let creatorrInfo = new CreatorrInfo();
    creatorrInfo.x = 0
    creatorrInfo.y = 0
    creatorrInfo.width = 500 // should be based on image width
    creatorrInfo.height = 500 // should be based on image height

    // image should be passed in to iterate over
    creatorrInfo.imageURL = getRandomImage();

    // adjust rarity based on some randomness
    creatorrInfo.cardRarityTitle = getRandomRarity();
    // should be passed in as two components, first the collection then the creator
    creatorrInfo.creatorText = "Mr Beast Founder's Edition"

    // hardcoded format and to now
    creatorrInfo.date = getDateString()

    // this randomness could/should come from another source
    let borderColor = randomColor(creatorrInfo.cardRarityTitle)
    creatorrInfo.borderColor = borderColor
    creatorrInfo.textColor = idealTextColor(borderColor)

    // Serial number should come from the version of the card in the collection? Assuming unique copies
    creatorrInfo.serialNumber = makeId(7)
    creatorr = creatorrInfo;
    addImage(ctx, creatorrInfo)
}

function addImage(ctx, creatorrInfo) {
    const image = new Image();
    image.crossOrigin = "*";
    image.onload = function() {
        ctx.drawImage(image, creatorrInfo.x, creatorrInfo.y, creatorrInfo.width, creatorrInfo.height);
        drawBorder(creatorrInfo.borderColor, creatorrInfo.x, creatorrInfo.y, creatorrInfo.width, creatorrInfo.height, creatorrInfo.cardRarityTitle);
        rarityTitle(creatorrInfo.cardRarityTitle, creatorrInfo.textColor, creatorrInfo.x, creatorrInfo.y, creatorrInfo.width, creatorrInfo.height, creatorrInfo.cardRarityTitle);
        dateTitle(creatorrInfo.date, creatorrInfo.textColor, creatorrInfo.x, creatorrInfo.y, creatorrInfo.width, creatorrInfo.height, creatorrInfo.cardRarityTitle);
        creatorTitle(creatorrInfo.creatorText, creatorrInfo.textColor, creatorrInfo.x, creatorrInfo.y, creatorrInfo.width, creatorrInfo.height, creatorrInfo.cardRarityTitle);
        serialNumberTitle(creatorrInfo.serialNumber, creatorrInfo.textColor, creatorrInfo.x, creatorrInfo.y, creatorrInfo.width, creatorrInfo.height, creatorrInfo.cardRarityTitle);

        dataURL = canvas.toDataURL(); // png is the default format

        dataURL = dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");

        /* const img = new Image();

        img.src = dataURL;

        document.body.appendChild(img); */
    };
    image.src = creatorrInfo.imageURL;
    // exportImage(image);
}

function exportImage() {
    if (creatorr.cardRarityTitle == 'UR' || creatorr.cardRarityTitle == 'SR') {
        const startit = () => {
            setTimeout(function() {
                console.log("start");
                confetti.start();
            }, 1000);
        };

        const stopit = () => {
            setTimeout(function() {
                console.log("stop");
                confetti.stop();
            }, 6000);
        };

        startit();
        stopit();
    }
    const http = new XMLHttpRequest();
    http.open('POST', 'https://nft.storage/api/upload')
    http.setRequestHeader('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8NDI2NTc4MjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjE5MzE2ODM1MywibmFtZSI6ImRlZmF1bHQifQ.Z2IJR2bXChHWb78YjTRi36zbC-ldSWlHX1YXv-JAmrI')
    var formData = new FormData();
    const byteCharacters = atob(dataURL);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }
    formData.append("file", new File(byteArrays, 'test_1.png'));
    http.onload = function() {
        if (http.readyState == 4 && http.status == "200") {
            document.getElementById('imageLink').href = 'https://ipfs.io/ipfs/' + JSON.parse(http.responseText).value.cid + '/test_1.png';
            document.getElementById('imageLink').textContent = 'https://ipfs.io/ipfs/' + JSON.parse(http.responseText).value.cid + '/test_1.png';
            let images = localStorage.getItem('images')

            if (images) {
                let jsonImages = JSON.parse(images);
                jsonImages.array.push('https://ipfs.io/ipfs/' + JSON.parse(http.responseText).value.cid + '/test_1.png')
                localStorage.removeItem('images');
                localStorage.setItem('images', JSON.stringify(jsonImages));
                console.log(JSON.stringify(jsonImages))
            } else {
                localStorage.setItem('images', JSON.stringify({ array: ['https://ipfs.io/ipfs/' + JSON.parse(http.responseText).value.cid + '/test_1.png'] }))
            }
        } else {
            console.error("error", http.responseText);
        }
    }
    http.send(formData);
}

// Random Color Generator
// Should be imported from another source
function randomColor(rarity) {
    return borderColor[rarity];
    // return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

// Code to draw border around image
function drawBorder(hexColor, x, y, width, height, rarity) {
    ctx.shadowColor = "Grey";
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.strokeStyle = hexToRGBForBorder(hexColor);
    ctx.lineWidth = 60;
    if (rarity == 'UR') {
        var gradient = ctx.createLinearGradient(20, 0, 220, 0);
        gradient.addColorStop(0, hexColor);
        gradient.addColorStop(.5, '#DDC060');
        gradient.addColorStop(1, '#E7D18C');
        ctx.strokeStyle = gradient
    }
    //x,y,width, height
    ctx.strokeRect(x, y, width, height);
}

// Set of functions to add the four different titles to image border
function rarityTitle(title, hexColor, x, y, width, height) {
    ctx.font = '18px Helvetica'
    if (title == 'R' || title == 'SR') {
        ctx.font = 'bold 20px Helvetica'
    } else if (title == 'UR') {
        ctx.font = 'bold 20px Brush Script MT'
    }
    ctx.fillStyle = hexColor
    ctx.fillText(title, width - 50, y + height - 10)
}

function dateTitle(title, hexColor, x, y, width, height, rarity) {
    ctx.font = '18px Helvetica'
    if (rarity == 'R' || rarity == 'SR') {
        ctx.font = 'bold 20px Helvetica'
    } else if (rarity == 'UR') {
        ctx.font = 'bold 20px Brush Script MT'
    }
    ctx.fillStyle = hexColor
    ctx.fillText
    ctx.fillText(title, 10, y + height - 10)
}

function creatorTitle(title, hexColor, x, y, width, height, rarity) {
    ctx.font = '18px Helvetica'
    if (rarity == 'R' || rarity == 'SR') {
        ctx.font = 'bold 20px Helvetica'
    } else if (rarity == 'UR') {
        ctx.font = 'bold 20px Brush Script MT'
    }
    ctx.fillStyle = hexColor
    ctx.fillText
    ctx.fillText(title, 10, 20)
}

function serialNumberTitle(title, hexColor, x, y, width, height, rarity) {
    ctx.font = '18px Helvetica'
    if (rarity == 'R' || rarity == 'SR') {
        ctx.font = 'bold 20px Helvetica'
    } else if (rarity == 'UR') {
        ctx.font = 'bold 20px Brush Script MT'
    }
    ctx.fillStyle = hexColor
    ctx.fillText
    ctx.fillText(title, width - 100, 20)
}

// Utlity functions for color manipulation and conversion
function hexToRGB(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function hexToRGBForBorder(h) {
    let r = 0,
        g = 0,
        b = 0;

    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];

        // 6 digits
    } else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }

    return "rgb(" + +r + "," + +g + "," + +b + ")";
}

// Ideal Text Color adjusts color of the text based on the border color for best contrast
function idealTextColor(hexColor) {
    threshold = 130;
    hRed = hexToR(hexColor);
    hGreen = hexToG(hexColor);
    hBlue = hexToB(hexColor);

    function hexToR(h) { return parseInt((cutHex(h)).substring(0, 2), 16) }

    function hexToG(h) { return parseInt((cutHex(h)).substring(2, 4), 16) }

    function hexToB(h) { return parseInt((cutHex(h)).substring(4, 6), 16) }

    function cutHex(h) { return (h.charAt(0) == "#") ? h.substring(1, 7) : h }
    cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
    if (cBrightness > threshold) { return "#000000"; } else { return "#ffffff"; }
}

// Utility function to get formatted date, hardcoded to now
function getDateString() {
    const date = new Date();
    const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
    const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return month + " " + day + " " + year
}

function getRandomRarity() {
    var num = Math.random();
    if (num < 0.3) return rarity.COMMON; //probability 0.3
    else if (num < 0.5) return rarity.UNCOMMON; // probability 0.2
    else if (num < 0.7) return rarity.RARE; //probability 0.2
    else if (num < 0.9) return rarity.SUPERRARE; //probability 0.2
    return rarity.ULTRARARE; //probability 0.1
}

function makeId(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getRandomImage() {
    var num = Math.random();
    if (num < 0.3) return "img/nft1.jpg";
    else if (num < 0.7) return "img/nft2.jpg";
    return "img/nft3.jpg";
}