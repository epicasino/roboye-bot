const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bigbastard')
    .setDescription('A Big Bastard'),
  async execute(interaction) {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/819817069281411072/1289900229566533662/mentos_and_coke_full_crop_optimize_short.gif?ex=66fc7af3&is=66fb2973&hm=2781a92416d18d392d31c1ae6e6336a525650ffd829a8980a799e9e30d109a0e&'
    );
  },
};
