import 'dotenv/config';
import express from 'express';
import {
  Client,
  Events,
  GatewayIntentBits,
  REST as DiscordRestClient,
  Routes,
  ChatInputCommandInteraction,
} from 'discord.js';
import { InteractionHandler } from './handlers/interactionHandler';

class BoyeBotApplication {
  private client: Client;
  private discordRestClient: DiscordRestClient;
  private interactionHandler: InteractionHandler;

  constructor() {
    this.client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });
    this.interactionHandler = new InteractionHandler();
    this.discordRestClient = new DiscordRestClient().setToken(
      process.env.TOKEN
    );
  }

  addClientEventHandlers() {
    this.client.on(Events.ClientReady, (client) => {
      console.log(`${client.user.username} logged in!`);
    });

    this.client.on(Events.Error, (err: Error) => {
      console.error('Client error', err);
    });

    this.client.on(Events.InteractionCreate, (interaction) => {
      this.interactionHandler.handleInteraction(
        interaction as ChatInputCommandInteraction
      );
    });
  }

  registerSlashCommands() {
    const commands = this.interactionHandler.getSlashCommands();
    this.discordRestClient
      .put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: commands,
      })
      .then((data: any) => {
        console.log(
          `Successfully registered ${data.length} global application (/) commands`
        );
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

// express stuff for render
const expressApp = express();
const PORT = process.env.PORT || 3001;

expressApp.get('*', (req, res) => {
  res.send({ message: 'Hello!' });
});

expressApp.listen(PORT, () => {
  console.log('Express Server up, listening to port ' + PORT);
});
