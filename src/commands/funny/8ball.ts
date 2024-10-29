import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
  CacheType,
} from 'discord.js';
import eightballJSON from './json/8ball.json';
import { iCommand } from '../../types/types';

class EightBallCommand implements iCommand {
  name = '8-ball';
  description = 'Shake the 8 ball to decide your fate.';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description)
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('Your question to ask the 8 ball')
        .setRequired(true)
    );
  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<any> {
    const question = interaction.options.getString('question');
    const eightball =
      eightballJSON[Math.floor(Math.random() * eightballJSON.length)];

    const eightBallEmbed = {
      title: 'The 8 Ball has Decided!',
      description: `"${question}"`,
      color: parseInt(eightball.color),
      fields: [
        {
          name: '\u200B',
          value: `**Result: ${eightball.result}**`,
        },
      ],
    };

    // console.log(eightBallEmbed);

    await interaction.reply({ embeds: [eightBallEmbed] });
  }
}

export default new EightBallCommand();
