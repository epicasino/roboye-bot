const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const eightBallJSON = require('./json/8ball.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8-ball')
    .setDescription('Shake the 8 ball to decide your fate.')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription('Your question to ask the 8 ball')
        .setRequired(true)
    ),
  async execute(interaction) {
    const question = interaction.options.getString('question');
    const eightball =
      eightBallJSON[Math.floor(Math.random() * eightBallJSON.length)];

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
  },
};
