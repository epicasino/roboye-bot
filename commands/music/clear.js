const { SlashCommandBuilder } = require("discord.js");
const { useMasterPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears current queue"),
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
      queue.tracks.clear();
      return interaction.followUp("Queue Cleared!");
    } catch (e) {
      return interaction.followUp(`Error: ${e}`);
    }
  },
};
