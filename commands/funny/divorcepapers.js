const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('divorce-papers')
    .setDescription('Whenever someone wants to get a divorce'),
  async execute(interaction) {
    const divorceEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(`Divorce Papers`)
      .setURL(
        `https://www.dochub.com/fillable-form/32077-california-divorce-papers`
      )
      .setImage('https://i.imgur.com/MsS8EML.png');

    await interaction.reply({ embeds: [divorceEmbed] });
  },
};
