import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
} from 'discord.js';

import { iCommand } from '../../types/types';

export default class PingCommand implements iCommand {
  name = 'ping';
  description = 'Pings the bot';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<any> {
    return interaction.reply('Pong!');
  }
}
