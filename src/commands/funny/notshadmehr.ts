import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { iCommand } from '../../types/types';

class NotShadmehrCommand implements iCommand {
  name = 'not-shadmehr';
  description = `How I sleep at night knowing I'm not shadmehr`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply('https://i.imgur.com/SEFYqSO.png');
  }
}

export default new NotShadmehrCommand();
