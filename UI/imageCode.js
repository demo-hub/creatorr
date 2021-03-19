var canvas, ctx;

 const rarity = {
   COMMON: "COMMON",
   UNCOMMON: "UNCOMMON",
   RARE: "RARE",
   SUPERRARE: "SUPER RARE",
   ULTRARARE: "ULTRA RARE"
 };

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
    // This function is called after the page is loaded
    // 1 - Get the canvas
    canvas = document.getElementById('myCanvas');
    // 2 - Get the context
    ctx=canvas.getContext('2d');
    // 3 - we can draw
    let creatorrInfo = new CreatorrInfo();
    creatorrInfo.x = 0
    creatorrInfo.y = 0
    creatorrInfo.width = 500 // should be based on image width
    creatorrInfo.height = 500 // should be based on image height
    creatorrInfo.imageURL = "https://i.ibb.co/ZVFrj7V/Image-Doggo-1.jpg";

    // adjust rarity based on some randomness
    creatorrInfo.cardRarityTitle = rarity.RARE
    creatorrInfo.creatorText = "Founder's Edition by: d0gg0"
    creatorrInfo.date = getDateString()
    let borderColor = randomColor()
    creatorrInfo.borderColor = borderColor
    creatorrInfo.textColor = idealTextColor(borderColor)
    creatorrInfo.serialNumber = "0000001"
    addImage(ctx,creatorrInfo)
  }

   function addImage(ctx,creatorrInfo) {
      const image = new Image();
      image.onload = function(){
         ctx.drawImage(image,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
        drawBorder(creatorrInfo.borderColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
        rarityTitle(creatorrInfo.cardRarityTitle,creatorrInfo.titleColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
        dateTitle(creatorrInfo.date,creatorrInfo.titleColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
        creatorTitle(creatorrInfo.creatorText,creatorrInfo.titleColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
        serialNumberTitle(creatorrInfo.serialNumber,creatorrInfo.titleColor,creatorrInfo.x,creatorrInfo.y,creatorrInfo.width,creatorrInfo.height);
      };
      image.src = creatorrInfo.imageURL;
   }


   function randomColor() {
     return "#" + Math.floor(Math.random()*16777215).toString(16);
   }

  function drawBorder(hexColor, x,y,width,height) {
     ctx.shadowColor = "Grey";
     ctx.shadowBlur = 20;
     ctx.shadowOffsetX = 5;
     ctx.shadowOffsetY = 5;
     ctx.strokeStyle = hexToRGB(hexColor);
     ctx.lineWidth = 60;
      //x,y,width, height
     ctx.strokeRect(x, y, width, height);
  }

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


   function hexToRGB(h) {
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

   function idealTextColor(bgColor) {
      var nThreshold = 105;
      var components = getRGBComponents(bgColor);
      var bgDelta = (components.R * 0.299) + (components.G * 0.587) + (components.B * 0.114);
      return ((255 - bgDelta) < nThreshold) ? "#000000" : "#ffffff";
   }

   function getRGBComponents(color) {
       var r = color.substring(1, 3);
       var g = color.substring(3, 5);
       var b = color.substring(5, 7);

       return {
          R: parseInt(r, 16),
          G: parseInt(g, 16),
          B: parseInt(b, 16)
       };
   }

   function getDateString() {
     const date = new Date();
     const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
     const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);
     const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
     return month + " " + day + " " + year
   }
