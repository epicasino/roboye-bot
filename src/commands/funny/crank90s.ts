import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import crank90s from './json/crank90s.json';
import { iCommand } from '../../types/types';

class Crank90sCommand implements iCommand {
  name = 'crank-90s';
  description = 'Bot Cranks 90s!';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          crank90s.map(({ name, value }) => {
            return { name, value };
          })
        )
    );
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = crank90s.find((element) => element.value === gifChoice);
    // console.log(gifName);
    await interaction.reply(gifName.url);
  }
}

export default new Crank90sCommand();
