require('dotenv').config({ debug: process.env.DEBUG });
const proxy = require('express-http-proxy');
const express = require('express');

const server = express();

const router = express.Router();

const hosts = {
  player: process.env.PLAYER_HOST,
  chats: process.env.CHATS_HOST,
  carousel: process.env.CAROUSEL_HOST,
  channels: process.env.CHANNELS_HOST,
};

const fixUrl = {proxyReqPathResolver: (req) => req.originalUrl};

router.use('/api/channels/:videoId', proxy(process.env.CHANNELS_HOST, fixUrl));
router.use('/ChannelService.js', proxy(process.env.CHANNELS_HOST, {
    proxyReqPathResolver: (req) => '/channel_bundle.js',
}));

router.use('/api/chats', proxy(process.env.CHATS_HOST, fixUrl));
router.use('/ChatService.js', proxy(process.env.CHATS_HOST, fixUrl));

router.use('/api/livestream/:videoId', proxy(process.env.PLAYER_HOST, fixUrl));
router.use('/PlayerService.js', proxy(process.env.PLAYER_HOST, {
  proxyReqPathResolver: (req) => '/main_bundle.js',
}));

router.use('/videos/:videoId', proxy(process.env.CAROUSEL_HOST, fixUrl));
router.use('/CarouselService.js', proxy(process.env.CAROUSEL_HOST, {
  proxyReqPathResolver: (req) => '/carousel.js',
}));

router.use('/filter/:videoId/:categoryId', proxy(process.env.CAROUSEL_HOST, fixUrl));

router.use(express.static('www'));

server.use(router);

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Proxying on ${port}.`)
});
