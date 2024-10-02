const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vanessascore')
    .setDescription("Returns Vanessa's latest Valorant score."),
  async execute(interaction) {
    interaction.deferReply();
    try {
      const latestMatch = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/chicacongranculo/vane?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            return data.data[0];
          } else throw `Error code ${data.status}`;
        });

      // console.log(latestMatch);

      const vanessa = latestMatch.players.find(
        (player) => player.puuid === 'ba4de230-0e7d-500e-840e-9ca16701c6df'
      );

      // console.log(vanessa);

      const matchLength = latestMatch.rounds.length;
      const acs = Math.floor(vanessa.stats.score / matchLength);

      const agentInfo = await fetch(
        `https://valorant-api.com/v1/agents/${vanessa.agent.id}`
      ).then((res) => res.json());

      const mapInfo = await fetch(
        `https://valorant-api.com/v1/maps/${latestMatch.metadata.map.id}`
      ).then((res) => res.json());

      // console.log(mapInfo);

      const matchEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `Vanessa's Game on ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleDateString()} at ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleTimeString()}`
        )
        .setURL(
          `https://tracker.gg/valorant/match/${latestMatch.metadata.match_id}`
        )
        .setThumbnail(agentInfo.data.displayIcon)
        .addFields(
          {
            name: 'Average Combat Score',
            value: `Vanessa's ACS is **\`${acs}\`**`,
          },
          { name: 'Kills', value: `\`${vanessa.stats.kills}\``, inline: true },
          {
            name: 'Deaths',
            value: `**\`${vanessa.stats.deaths}\`**`,
            inline: true,
          },
          {
            name: 'Assists',
            value: `\`${vanessa.stats.assists}\``,
            inline: true,
          },
          {
            name: '\u200B',
            value: '**Abilities Used**',
          },
          {
            name: `${agentInfo.data.abilities[2].displayName}`,
            value: `\`${vanessa.ability_casts.grenade}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[0].displayName}`,
            value: `\`${vanessa.ability_casts.ability1}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[1].displayName}`,
            value: `\`${vanessa.ability_casts.ability2}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[3].displayName}`,
            value: `\`${vanessa.ability_casts.ultimate}\``,
            inline: true,
          }
        )
        .setImage(`${mapInfo.data.listViewIcon}`);

      return interaction.followUp({ embeds: [matchEmbed] });
    } catch (e) {
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};

// https://api.henrikdev.xyz/valorant/v4/matches/na/pc/chicacongranculo/vane?api_key=process.env.VAL_TOKEN

// chicacongranculo;
