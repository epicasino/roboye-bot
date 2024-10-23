const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('6-bomboclatt-egg')
    .setDescription('6 Bomboclatt Egg!'),
  async execute(interaction) {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1298480118616035328/Crazy_Jamaican_Lady_Cursing_Son_6_EGGS.mp4?ex=6719b758&is=671865d8&hm=3da8a8fd3147f11e929b2335e01bc37280ec292dbb3fb213948ecc3b60aaf4e4&'
    );
  },
};
