const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('with-this-treasure')
    .setDescription('I Summon...'),
  async execute(interaction) {
    // gif
    await interaction.reply(
      'https://tenor.com/view/with-this-treasure-i-summon-gif-13157585410586563450'
    );
  },
};

// https://tenor.com/view/with-this-treasure-i-summon-gif-13157585410586563450
