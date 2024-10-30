# roboye-bot

![GitHub License](https://img.shields.io/github/license/epicasino/roboye-bot)
![GitHub top language](https://img.shields.io/github/languages/top/epicasino/roboye-bot)
![GitHub repo size](https://img.shields.io/github/repo-size/epicasino/roboye-bot)

## Description

- A redone version of the boye bot. Written in typescript, utilizing discord.js.
- Can be deployed as a web service on platforms such as Render, Heroku, etc.
- Features commands for tracking Valorant matches, Fortnite shops, a link shortener command, and fun commands like the magical 8 ball!

## Table of Contents (Optional)

- [Installation](#installation)
- [Credits](#credits)
- [License](#license)

## Installation

Clone the repository or download the project as a .zip file.

You need a couple of API keys in order to run the application self-hosted or in the cloud.

- In order for discord.js to work, you need both the API and Client Token from Discord. If you don't know how to do that, check out [Discord's Documentation](https://discord.com/developers/docs/quick-start/getting-started) about getting started.
- You also need HenrikDev's Valorant API to get access to Valorant commands for the bot. If you need a key for that, [click here](https://docs.henrikdev.xyz/valorant/changes/v4.0.0).
- Additionally, you need a key from [FortniteApi.io](https://fortniteapi.io/) to have access to the bot's Fortnite commands.

1. After you have all of those keys in a .env file in the root directory of the project, install the necessary packages with `npm i` in the console.
2. Since this is a TypeScript project, you must build the project. To do this, use the build command `npm build` in the console.
3. A new folder `dist` in your root directory of your project will be created, this will contain your transpiled TypeScript files into executable JavaScript files.
4. To run this project and deploy it, run `npm start` and you should receive something of the following in your console:

```Console
Express Server up, listening to port 3001
Boye-Bot-Test logged in!
Successfully registered 23 global application (/) commands
```

NOTE: The `23 global application (/) commands` may be different, it may show more than 23 commands, as the bot will be expanded and have more commands in the future.

## Credits

- Big thanks to [Discord.js](https://discord.js.org/#/) for providing a package for the Discord API.
- Thank you [HenrikDev](https://docs.henrikdev.xyz/valorant/api-reference) for providing profile and match data for players on Valorant!
- Additional thanks to [FortniteApi.io](https://fortniteapi.io/) for providing information about Fortnite's daily shop.

## License

MIT License

Copyright (c) 2023 epicasino

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
