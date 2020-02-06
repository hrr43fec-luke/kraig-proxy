const express = require('express');
const fetch = require('node-fetch');

const server = express();

const router = express.Router();

const apis = {
  player: 3001,
  chats: 3002,
  carousel: 3003,
  channels: 3004,
};

router.use(express.static('www'));

function handleAPI(type, req, res) {
  if (type in apis) {
    return fetch(`http://${req.hostname}:${apis[type]}${req.url}`)
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

server.use(router);

server.listen(3000);
