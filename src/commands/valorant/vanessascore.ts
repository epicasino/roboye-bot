import {
  SlashCommandBuilder,
  EmbedBuilder,
  ChatInputCommandInteraction,
} from 'discord.js';
import { iCommand } from '../../types/types';
import { RankMMRInfo } from './types/rankMMRInfoTypes';
import { ValorantMatch } from './types/valMatchTypes';
import { AgentInfo } from './types/agentInfoTypes';
import { MapInfo } from './types/mapInfoTypes';
import { GamemodeInfo } from './types/gamemodeInfoTypes';
import { RanksInfo } from './types/ranksInfoTypes';
import 'dotenv/config'

class VanessaScoreCommand implements iCommand {
  name = 'vanessa-score';
  description = `Returns Vanessa's latest Valorant score.`;
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
        .then((data: RankMMRInfo) => {
          return data.data
            ? data.data
            : data.errors[0].status === 404 && {
                current: { tier: { id: 0, name: 'Unrated' } },
              };
        });

      const latestMatch = await fetch(
        `https://api.henrikdev.xyz/valorant/v4/matches/na/pc/chicacongranculo/vane?api_key=${process.env.VAL_TOKEN}`
      )
        .then((res) => res.json())
        .then((data: ValorantMatch) => {
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

      const teamInfo = latestMatch.teams.find(
        (team) => team.team_id === vanessa.team_id
      );
      const agentInfo: AgentInfo = await fetch(
        `https://valorant-api.com/v1/agents/${vanessa.agent.id}`
      ).then((res) => res.json());

      const mapInfo: MapInfo = await fetch(
        `https://valorant-api.com/v1/maps/${latestMatch.metadata.map.id}`
      ).then((res) => res.json());

      // console.log(mapInfo);

      const gamemodeInfo = await fetch(`https://valorant-api.com/v1/gamemodes`)
        .then((res) => res.json())
        .then((gamemodes: GamemodeInfo) =>
          gamemodes.data.find(
            (gamemode) =>
              gamemode.displayName === latestMatch.metadata.queue.mode_type
          )
        );

      // gets the last rank episode in array, unsure if thats right or not butt we'll see about that
      const ranksInfo = await fetch(
        `https://valorant-api.com/v1/competitivetiers`
      )
        .then((res) => res.json())
        .then((data: RanksInfo) => data.data.pop());

      // console.log(ranksInfo);

      // console.log(gamemodeInfo);

      const matchEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `${vanessa.name}'s Game on ${new Date(
            latestMatch.metadata.started_at
          ).toLocaleDateString()}`
        )
        .setURL(
          `https://tracker.gg/valorant/match/${latestMatch.metadata.match_id}`
        )
        .setAuthor({
          name: `${vanessa.name}#${vanessa.tag} | ${playerMMR.current.tier.name}`,
          iconURL: ranksInfo.tiers.find(
            (rank) => rank.tier === playerMMR.current.tier.id
          ).largeIcon,
          url: `https://tracker.gg/valorant/profile/riot/${vanessa.name
            .trim()
            .split(' ')
            .join('%20')}%23${vanessa.tag}/overview`,
        })
        .setThumbnail(agentInfo.data.displayIcon)
        .addFields(
          {
            name: `**${teamInfo.won ? 'Won' : 'Lost'} Game**`,
            value: `**Score:** \`${teamInfo.rounds.won} / ${teamInfo.rounds.lost}\``,
          },
          {
            name: 'Average Combat Score',
            value: `${vanessa.name} ACS is **\`${acs}\`**`,
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
        .setImage(`${mapInfo.data.listViewIcon}`)
        .setFooter({
          text: `Gamemode: ${latestMatch.metadata.queue.name}`,
          iconURL: `${gamemodeInfo.displayIcon}`,
        });

      return interaction.followUp({ embeds: [matchEmbed] });
    } catch (e) {
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  }
}

export default new VanessaScoreCommand();
