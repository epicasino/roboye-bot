import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import phoenixWright from './json/phoenixwright.json';
import { iCommand } from '../../types/types';

class PhoenixWrightCommand implements iCommand {
  name = 'phoenix-wright';
  description = 'Phoenix wright showing you papers.';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          phoenixWright.map(({ name, value }) => {
            return { name, value };
          })
        )
    );
  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = phoenixWright.find(
      (element) => element.value === gifChoice
    );
    // console.log(gifName);
    await interaction.reply(gifName.url);
  }
}

export default new PhoenixWrightCommand();
