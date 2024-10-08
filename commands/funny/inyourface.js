const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('in-your-face')
    .setDescription('In Your Face. In Your Face.'),
  async execute(interaction) {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1293105069503418369/granddad_smack_the_s.MP4?ex=67062971&is=6704d7f1&hm=397af006958edfe185bc04014dc7f7472707d4e00b5f03fb07be3243a8700ad8&'
    );
  },
};
