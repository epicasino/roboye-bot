"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const discord_js_1 = require("discord.js");
const interactionHandler_1 = require("./handlers/interactionHandler");
class BoyeBotApplication {
    constructor() {
        this.client = new discord_js_1.Client({
            intents: [
                discord_js_1.GatewayIntentBits.Guilds,
                discord_js_1.GatewayIntentBits.GuildMessages,
                discord_js_1.GatewayIntentBits.MessageContent,
            ],
        });
        this.interactionHandler = new interactionHandler_1.InteractionHandler();
        this.discordRestClient = new discord_js_1.REST().setToken(process.env.TOKEN);
    }
    addClientEventHandlers() {
        this.client.on(discord_js_1.Events.ClientReady, (client) => {
            console.log(`${client.user.username} logged in!`);
        });
        this.client.on(discord_js_1.Events.Error, (err) => {
            console.error('Client error', err);
        });
        this.client.on(discord_js_1.Events.InteractionCreate, (interaction) => {
            this.interactionHandler.handleInteraction(interaction);
        });
    }
    registerSlashCommands() {
        const commands = this.interactionHandler.getSlashCommands();
        this.discordRestClient
            .put(discord_js_1.Routes.applicationCommands(process.env.CLIENT_ID), {
            body: commands,
        })
            .then((data) => {
            console.log(`Successfully registered ${data.length} global application (/) commands`);
        })
            .catch((err) => {
            console.error('Error registering application (/) commands', err);
        });
    }
    startBot() {
        this.client
            .login(process.env.TOKEN)
            .then(() => {
            this.addClientEventHandlers();
            this.registerSlashCommands();
        })
            .catch((err) => console.error(err));
    }
}
const app = new BoyeBotApplication();
app.startBot();
