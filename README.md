# Kraig's Proxy
![screenshot](https://github.com/hrr43fec-luke/kraig-proxy/blob/master/twitchy.jpg?raw=true)

## Background
This proxy brings together four services and displays them. They are a mockup of four sections of the twitch.tv website (using faker data.) See the service repos here: https://github.com/hrr43fec-luke

## Set the following environment variables (either in the shell or in a '.env' file in the root)
    PLAYER_HOST
    CHATS_HOST
    CAROUSEL_HOST
    CHANNELS_HOST
Example: `PLAYER_HOST=locahost:3002`

## Running
`npm start` (which will just `node index.js`)

## Deploying
`npm run zip` will creat a zip archive for uploading to AWS Elastic Beanstalk (`git archive -v -o kraig-proxy.zip --format=zip HEAD`)
