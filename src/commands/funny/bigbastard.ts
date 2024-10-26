import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  CacheType,
} from 'discord.js';

import { iCommand } from '../../types/types';

export default class BigBastardCommand implements iCommand {
  name = 'big-bastard';
  description = 'A Big Bastard';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<any> {
    await interaction.reply('https://i.imgur.com/tpq5Lc2.gif');
  }
}
