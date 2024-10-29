import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { iCommand } from '../../types/types';

class WithThisTreasureCommand implements iCommand {
  name = 'with-this-treasure';
  description = `I Summon...`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    await interaction.reply(
      'https://tenor.com/view/with-this-treasure-i-summon-gif-13157585410586563450'
    );
  }
}

export default new WithThisTreasureCommand();
