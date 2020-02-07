require('dotenv').config({ debug: process.env.DEBUG });
const express = require('express');
const fetch = require('node-fetch');

const server = express();

const router = express.Router();

const hosts = {
  player: process.env.PLAYER_HOST,
  chats: process.env.CHATS_HOST,
  carousel: process.env.CAROUSEL_HOST,
  channels: process.env.CHANNELS_HOST,
};

router.use(express.static('www'));

function handleAPI(type, req, res) {
  if (type in hosts) {
    return fetch(`${hosts[type]}${req.url}`)
      .then((results) => results.json())
      .then((results) => res.send(results));
  };
}

router.get('/api/livestream/:videoId', (req, res) => {
  return handleAPI('player', req, res);
});

router.get('/api/chats/:videoId', (req, res) => {
  return handleAPI('chats', req, res);
});

router.get('/api/channels/:videoId', (req, res) => {
  return handleAPI('channels', req, res);
});

router.get('/videos/:userId', (req, res) => {
  return handleAPI('carousel', req, res);
});

router.get('/filter/:videoId/:categoryId', (req, res) => {
  return handleAPI('carousel', req, res);
});

server.use(router);

server.listen(process.env.PROXY_PORT, () => {
  console.log(`Proxying on ${process.env.PROXY_PORT}.`)
});
