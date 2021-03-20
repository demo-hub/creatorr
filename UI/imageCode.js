var canvas, ctx;

// Enums for rarity types
const rarity = {
  COMMON: "COMMON",
  UNCOMMON: "UNCOMMON",
  RARE: "RARE",
  SUPERRARE: "SUPER RARE",
  ULTRARARE: "ULTRA RARE"
};

const borderColor = {
  COMMON: "#000000",
  UNCOMMON: "#ff0000",
  RARE: "#00ff00",
  SUPERRARE: "#0000ff",
  ULTRARARE: "#ffffff"
}

function CreatorrInfo(x,y,width,height,imageURL,cardRarityTitle,creatorText,date,borderColor,textColor,serialNumber) {
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
  const  {canvas, createCanvas} = require('canvas')
  canvas = createCanvas(500, 500)
  ctx=canvas.getContext('2d');

  // custom creator object to handle properties passed in from backend to frontend
  let creatorrInfo = new CreatorrInfo();
  creatorrInfo.x = 0
  creatorrInfo.y = 0
  creatorrInfo.width = 500 // should be based on image width
  creatorrInfo.height = 500 // should be based on image height

  // image should be passed in to iterate over
  creatorrInfo.imageURL = "https://i.ibb.co/ZVFrj7V/Image-Doggo-1.jpg";

  // adjust rarity based on some randomness
  creatorrInfo.cardRarityTitle = rarity.RARE
  // should be passed in as two components, first the collection then the creator
  creatorrInfo.creatorText = "Founder's Edition by: d0gg0"

  // hardcoded format and to now
  creatorrInfo.date = getDateString()

  // this randomness could/should come from another source
  let borderColor = randomColor()
  creatorrInfo.borderColor = borderColor
  creatorrInfo.textColor = idealTextColor(borderColor)

  // Serial number should come from the version of the card in the collection? Assuming unique copies
  creatorrInfo.serialNumber = "0000001"
  addImage(ctx,creatorrInfo)
}

function addImage(ctx,creatorrInfo) {
  const image = new Image();
  image.onload = function(){
    ctx.drawImage(image,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
    drawBorder(creatorrInfo.borderColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
    rarityTitle(creatorrInfo.cardRarityTitle,creatorrInfo.textColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
    dateTitle(creatorrInfo.date,creatorrInfo.textColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
    creatorTitle(creatorrInfo.creatorText,creatorrInfo.textColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
    serialNumberTitle(creatorrInfo.serialNumber,creatorrInfo.textColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
  };
  image.src = creatorrInfo.imageURL;
  exportImage();
}

// TEST CODE DOES NOT WORK YET
function exportImage() {
  const fs = require( "fs" );
  const out = fs.createWriteStream(__dirname + '/test.png')
  const stream = canvas.createPNGStream()
  stream.pipe(out)
  out.on('finish', () =>  console.log('The PNG file was created.'))
}

// Random Color Generator
// Should be imported from another source
function randomColor() {
  return "#" + Math.floor(Math.random()*16777215).toString(16);
}

// Code to draw border around image
function drawBorder(hexColor, x,y,width,height) {
  ctx.shadowColor = "Grey";
  ctx.shadowBlur = 20;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.strokeStyle = hexToRGBForBorder(hexColor);
  ctx.lineWidth = 60;
  //x,y,width, height
  ctx.strokeRect(x, y, width, height);
}

// Set of functions to add the four different titles to image border
function rarityTitle(title,hexColor,x,y,width,height) {
  ctx.font = '20px Helvetica'
  ctx.fillStyle = hexColor
  ctx.fillText
  ctx.fillText(title, width - 100, y + height - 10)
}

function dateTitle(title,hexColor,x,y,width,height) {
  ctx.font = '20px Helvetica'
  ctx.fillStyle = hexColor
  ctx.fillText
  ctx.fillText(title, 10, y + height - 10)
}

function creatorTitle(title,hexColor,x,y,width,height) {
  ctx.font = '20px Helvetica'
  ctx.fillStyle = hexColor
  ctx.fillText
  ctx.fillText(title, 10, 20)
}

function serialNumberTitle(title,hexColor,x,y,width,height) {
  ctx.font = '20px Helvetica'
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
  let r = 0, g = 0, b = 0;

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

  return "rgb("+ +r + "," + +g + "," + +b + ")";
}

// Ideal Text Color adjusts color of the text based on the border color for best contrast
function idealTextColor(hexColor) {
  threshold = 130;
  hRed = hexToR(hexColor);
  hGreen = hexToG(hexColor);
  hBlue = hexToB(hexColor);

  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}
  cBrightness = ((hRed * 299) + (hGreen * 587) + (hBlue * 114)) / 1000;
  if (cBrightness > threshold){return "#000000";} else { return "#ffffff";}
}

// Utility function to get formatted date, hardcoded to now
function getDateString() {
  const date = new Date();
  const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
  const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
  return month + " " + day + " " + year
}
