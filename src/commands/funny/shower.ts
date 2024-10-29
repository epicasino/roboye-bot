import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { iCommand } from '../../types/types';

class ShowerCommand implements iCommand {
  name = 'shower';
  description = `take a shower`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply(
      'https://tenor.com/view/league-of-legends-genshin-impact-oh-the-misery-shower-soap-gif-25193414'
    );
  }
}

export default new ShowerCommand();
