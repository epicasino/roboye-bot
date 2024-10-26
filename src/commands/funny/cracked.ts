import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

import crackedJSON from './json/cracked.json';

import { iCommand } from '../../types/types';

export default class CrackedCommand implements iCommand {
  name = 'dont-be-cracked';
  description = 'dont be cracked...';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .addStringOption((option) =>
      option
        .setName('gif')
        .setDescription('The specific gif')
        .setRequired(true)
        .addChoices(
          crackedJSON.map(({ name, value }) => {
            return { name, value };
          })
        )
    );

  async execute(interaction: ChatInputCommandInteraction): Promise<void> {
    const gifChoice = interaction.options.getString('gif');
    // console.log(gifChoice);
    const gifName = crackedJSON.find((element) => element.value === gifChoice);
    // console.log(gifName);
    await interaction.reply(gifName.url);
  }
}
