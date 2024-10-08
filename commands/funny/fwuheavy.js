const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('i-fwu-heavy')
    .setDescription('I fw u heavy.'),
  async execute(interaction) {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1290858038512848978/mitaka_slap.gif?ex=6705e5bb&is=6704943b&hm=f657bfa129f0b78ab1f5333bed69c5b9546f8f94eb641dd82b095d739d424965&'
    );
  },
};
