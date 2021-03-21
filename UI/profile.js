function getProfileBio(name) {
    switch (name) {
        case "Andrew":
            return "Andrew loves streaming CSGO until he rage quits";
        case "Rosalie":
            return "Rosalie hits the whoa while serving up the best filters";
        case "Tom":
            return "Tom is king of doggos";
        case "Joao":
            return "Joao inspires people by giving away crypto to those in need";
        case "Jurjen":
            return "Jurjen is #nofilter on all that fire he is posting on the daily";
        default:
            return "Just starting out on the Creatorr platform";
    }
}

function getProfileImage(name) {
    switch (name) {
        case "Andrew":
            return "img/profile_pic_andrew.png";
        case "Rosalie":
            return "img/profile_pic_rosa.png";
        case "Tom":
            return "img/profile_pic.png";
        case "Joao":
            return "img/profile_pic.png";
        case "Jurjen":
            return "img/profile_pic_jur.png";
        default:
            return "img/profile_pic.png";
    }
}

function getProfilePlatform(name) {
    switch (name) {
        case "Andrew":
            return "Twitch";
        case "Rosalie":
            return "TikTok";
        case "Tom":
            return "Creatorr";
        case "Joao":
            return "YouTube";
        case "Jurjen":
            return "Instagram";
        default:
            return "Creator";
    }
}

function getCardHTML(name) {
    switch (name) {
        case "Andrew":
            return `
        <div class="circle">
            <img src="img/avira.png" alt="" width="180">
        </div>`;
        case "Rosalie":
            return `
        <div class="circle">
            <img src="img/bbb.jpg" alt="" width="180">
        </div>
        <div class="circle">
            <img src="img/littleporg.jpg" alt="" width="180">
        </div>`;
        case "Tom":
            return `
        <div class="circle">
            <img src="img/nft1.png" alt="" width="180">
        </div>`;
        case "Joao":
            return `
        <div class="circle">
            <img src="img/nft1.jpg" alt="" width="180">
        </div>
        <div class="circle">
            <img src="img/nft2.jpg" alt="" width="180">
        </div>
        <div class="circle">
            <img src="img/nft3.jpg" alt="" width="180">
        </div>`;
        case "Jurjen":
            return `
        <div class="circle">
            <img src="img/1_grey.png" alt="" width="180">
        </div>
        <div class="circle">
            <img src="img/1_yellow.png" alt="" width="180">
        </div>`;
        default:
            return `
      <div class="circle">
          <img src="img/nft1.png" alt="" width="180">
      </div>`;
    }
}