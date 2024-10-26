import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { iCommand } from '../../types/types';

export default class CriminalCommand implements iCommand {
  name = 'i-heard-u-a-pdf-file';
  description = 'criminal activity';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1294828974844678277/trim.9954CE6F-E86D-43E1-9980-511F4FD6A4D7.mov?ex=670c6ef4&is=670b1d74&hm=dea681d130b3f01c4f9f287469a7f38c99aa4de74416133c26a09f2727f80be7&'
    );
  }
}
