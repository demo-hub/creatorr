# Creatorr

## Presentation

[Youtube](https://www.youtube.com/watch?v=6JNUpGN_XpM)

## You might have seen us at NFTHack 2021...

![alt text](https://github.com/demo-hub/creatorr/blob/main/photo_2021-03-21_21-27-33.jpg "Prize winners")

**1st place** for **Best payments experience for end-users using Circle's sandbox**

**Winner** for **Best engagement in NFT Protocol's session**

## Development

### Client

- npm i -g http-server to install this module globally on your pc;
- Navigate to the UI directory;
- Run http-server;
- If you go http://localhost:8080 you should see the app running;

### API

- Go the the api directory;
- Run npm i;
- Create a .env file with PORT=5000, CIRCLE_API_KEY={your_circle_api_key}, BASE_URL=https://api-sandbox.circle.com;
- Run npm run dev;
- You should see "Listening on port 5000" on the console and if you open the browser on localhost:5000 you should see "It's working!"

### NFT Minter
- Go to the creatorrminter folder;
- Run npm i;
- Run npm run dev;
- You should see "Listening on port 3001" on the console and if you open the browser on localhost:5000 you should see the minter.
- Cloned from https://github.com/hack3r-0m/NFTminter
### Resources

#### Generate Circle API Key

https://developers.circle.com/docs/api-keys
