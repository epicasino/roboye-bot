import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { iCommand } from '../../types/types';

export default class SaltInAPretzelBagCommand implements iCommand {
  name = 'salt-in-a-pretzel-bag';
  description = `eating the salt in a pretzel bag`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply(
      'blob:https://imgur.com/cfbe9450-0a82-4928-ad03-f58896fff7c8'
    );
  }
}
