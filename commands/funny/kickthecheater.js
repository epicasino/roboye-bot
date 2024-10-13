const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick-the-cheater')
    .setDescription('KICK THE CHEATER MASTER YAMBO'),
  async execute(interaction) {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1294831391430672435/TF2s_Calmest_Voice_Chat_We_need_to_kick_the_cheater.mp4?ex=670c7134&is=670b1fb4&hm=b05eb4afb5aaae176b8ea668e5c3a816a5a860ff546fff34855e71bd321338c2&'
    );
  },
};
