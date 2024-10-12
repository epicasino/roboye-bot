const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('salt-in-a-pretzel-bag')
    .setDescription('eating the salt in a pretzel bag'),
  async execute(interaction) {
    // gif
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1294499850192424980/eating_the_salt_in_a_pretzel_bag.png?ex=670b3c6e&is=6709eaee&hm=2827225ac30441849fc384e41b547e432b42139b3faa1f975d416cb4d1e34b6a&'
    );
  },
};
