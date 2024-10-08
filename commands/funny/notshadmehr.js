const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('not-shadmehr')
    .setDescription(`How I sleep at night knowing I'm not shadmehr`),
  async execute(interaction) {
    // gif
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/819817069281411072/994032303221248110/djshmad.PNG?ex=6705c9b9&is=67047839&hm=62aeb61ceab44cb478aacfcc3acbeac332465bedc24a8967d99d8a6d7a3a3447&'
    );
  },
};
