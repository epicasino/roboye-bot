const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skips current song in queue"),
  async execute(interaction) {
    const player = useMasterPlayer();
    const queue = player.nodes.get(interaction.guild.members.me);
    const tracks = queue.tracks.toArray();
    const currentTrack = queue.currentTrack;

    if (tracks == "") {
      return interaction.reply("Queue is Empty!");
    }

    await interaction.deferReply();

    try {
      queue.node.skip();
      return interaction.followUp("Song Skipped!");
    } catch (e) {
      return interaction.followUp(`Error: ${e}`);
    }
  },
};
