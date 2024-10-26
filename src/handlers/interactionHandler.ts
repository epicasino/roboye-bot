import { ChatInputCommandInteraction } from 'discord.js';
import { iCommand } from '../types/types';
import { commandsArr } from './commandsArr';

export class InteractionHandler {
  private commands: iCommand[];

  constructor() {
    // we can find a better way of doing this.
    this.commands = commandsArr;
  }

  getSlashCommands() {
    return this.commands.map((command: iCommand) =>
      command.slashCommandConfig.toJSON()
    );
  }

  async handleInteraction(
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    const commandName = interaction.commandName;

    const matchedCommand = this.commands.find(
      (command) => command.name === commandName
    );

    if (!matchedCommand) {
      return Promise.reject('Command not matched');
    }

    matchedCommand
      .execute(interaction)
      .then(() => {
        console.log(
          `Sucesfully executed command [/${interaction.commandName}]`,
          {
            guild: { id: interaction.guildId, name: interaction.guild.name },
            user: { name: interaction.user.globalName },
          }
        );
      })
      .catch((err) =>
        console.log(
          `Error executing command [/${interaction.commandName}]: ${err}`,
          {
            guild: { id: interaction.guildId, name: interaction.guild.name },
            user: { name: interaction.user.globalName },
          }
        )
      );
  }
}
