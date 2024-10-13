const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('in-your-face')
    .setDescription('In Your Face. In Your Face.'),
  async execute(interaction) {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1293105069503418369/granddad_smack_the_s.MP4?ex=670c1831&is=670ac6b1&hm=a4c09fd2e44cbb100fa561bab1dbda1608c4787397c6d1896b202f8c2a22af4e&'
    );
  },
};
