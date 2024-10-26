import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { iCommand } from '../../types/types';
import fwuHeavy from './json/fwuheavy.json';

export default class IFwUHeavyCommand implements iCommand {
  name = 'i-fw-u-heavy';
  description = 'I fw u heavy.';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          fwuHeavy.map(({ name, value }) => {
            return { name, value };
          })
        )
    );
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = fwuHeavy.find((element) => element.value === gifChoice);
    // console.log(gifName);
    await interaction.reply(gifName.url);
  }
}
