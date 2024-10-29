import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { iCommand } from '../../types/types';
import 'dotenv/config';
import { DataEntity } from './types/valMatchTypes';
import { MapInfo } from './types/mapInfoTypes';
import { AgentInfo } from './types/agentInfoTypes';
import { GamemodeInfo } from './types/gamemodeInfoTypes';
import { RanksInfo } from './types/ranksInfoTypes';

class JeffScoreCommand implements iCommand {
  name = 'jeff-score';
  description = `Returns Jeff's latest Valorant score.`;
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);

  async execute(interaction: ChatInputCommandInteraction): Promise<any> {
    interaction.deferReply();
    try {
      const playerMMR = await fetch(
        `https://api.henrikdev.xyz/valorant/v3/mmr/na/pc/chicacongranculo/vane?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          return data.data
            ? data.data
            : data.errors[0].status === 404 && {
                current: { tier: { id: 0, name: 'Unrated' } },
              };
        });

      const latestMatch: DataEntity = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/JeffTheFri/Crisp?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            return data.data[0];
          } else throw `Error code ${data.status}`;
        });

      // console.log(latestMatch);

      const jeff = latestMatch.players.find(
        (player) => player.puuid === '921d5e64-161a-5df5-9b59-b75c4408e8f4'
      );

      // console.log(jeff);

      const matchLength = latestMatch.rounds.length;
      const acs = Math.floor(jeff.stats.score / matchLength);

      const teamInfo = latestMatch.teams.find(
        (team) => team.team_id === jeff.team_id
      );
      const agentInfo: AgentInfo = await fetch(
        `https://valorant-api.com/v1/agents/${jeff.agent.id}`
      ).then((res) => res.json());

      const mapInfo: MapInfo = await fetch(
        `https://valorant-api.com/v1/maps/${latestMatch.metadata.map.id}`
      ).then((res) => res.json());

      const gamemodeInfo = await fetch(`https://valorant-api.com/v1/gamemodes`)
        .then((res) => res.json())
        .then((gamemodes: GamemodeInfo) =>
          gamemodes.data.find(
            (gamemode) =>
              gamemode.displayName === latestMatch.metadata.queue.mode_type
          )
        );

      // console.log(gamemodeInfo);

      // gets the last rank episode in array, unsure if thats right or not butt we'll see about that
      const ranksInfo = await fetch(
        `https://valorant-api.com/v1/competitivetiers`
      )
        .then((res) => res.json())
        .then((data: RanksInfo) => data.data.pop());

      // console.log(ranksInfo)

      const matchEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `${jeff.name}'s Game on ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleDateString()}`
        )
        .setURL(
          `https://tracker.gg/valorant/match/${latestMatch.metadata.match_id}`
        )
        .setAuthor({
          name: `${jeff.name}#${jeff.tag} | ${playerMMR.current.tier.name}`,
          iconURL: ranksInfo.tiers.find(
            (rank) => rank.tier === playerMMR.current.tier.id
          ).largeIcon,
          url: `https://tracker.gg/valorant/profile/riot/${jeff.name
            .trim()
            .split(' ')
            .join('%20')}%23${jeff.tag}/overview`,
        })
        .setThumbnail(agentInfo.data.displayIcon)
        .addFields(
          {
            name: `**${teamInfo.won ? 'Won' : 'Lost'} Game**`,
            value: `**Score:** \`${teamInfo.rounds.won} / ${teamInfo.rounds.lost}\``,
          },
          {
            name: 'Average Combat Score',
            value: `${jeff.name} ACS is **\`${acs}\`**`,
          },
          { name: 'Kills', value: `\`${jeff.stats.kills}\``, inline: true },
          {
            name: 'Deaths',
            value: `**\`${jeff.stats.deaths}\`**`,
            inline: true,
          },
          { name: 'Assists', value: `\`${jeff.stats.assists}\``, inline: true },
          {
            name: '\u200B',
            value: '**Abilities Used**',
          },
          {
            name: `${agentInfo.data.abilities[2].displayName}`,
            value: `\`${jeff.ability_casts.grenade}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[0].displayName}`,
            value: `\`${jeff.ability_casts.ability1}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[1].displayName}`,
            value: `\`${jeff.ability_casts.ability2}\``,
            inline: true,
          },
          {
            name: `${agentInfo.data.abilities[3].displayName}`,
            value: `\`${jeff.ability_casts.ultimate}\``,
            inline: true,
          }
        )
        .setImage(`${mapInfo.data.listViewIcon}`)
        .setFooter({
          text: `Gamemode: ${latestMatch.metadata.queue.name}`,
          iconURL: `${gamemodeInfo.displayIcon}`,
        });

      return interaction.followUp({ embeds: [matchEmbed] });
    } catch (e) {
      console.error(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  }
}

export default new JeffScoreCommand();
