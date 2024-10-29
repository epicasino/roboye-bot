import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { iCommand } from '../../types/types';

class DivorcePapersCommand implements iCommand {
  name = 'divorce-papers';
  description = 'Whenever someone wants to get a divorce';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const divorceEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Divorce Papers`)
      .setURL(
        `https://www.dochub.com/fillable-form/32077-california-divorce-papers`
      )
      .setImage('https://i.imgur.com/MsS8EML.png');

    await interaction.reply({ embeds: [divorceEmbed] });
  }
}

export default new DivorcePapersCommand();
