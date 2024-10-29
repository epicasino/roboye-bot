import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { iCommand } from '../../types/types';

class SixEggCommand implements iCommand {
  name = '6-bomboclatt-egg';
  description = '6 Bomboclatt Egg!';
  slashCommandConfig = new SlashCommandBuilder()
    .setName(this.name)
    .setDescription(this.description);

  async execute(
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<any> {
    await interaction.reply(
      'https://cdn.discordapp.com/attachments/902415144670351373/1298480118616035328/Crazy_Jamaican_Lady_Cursing_Son_6_EGGS.mp4?ex=6719b758&is=671865d8&hm=3da8a8fd3147f11e929b2335e01bc37280ec292dbb3fb213948ecc3b60aaf4e4&'
    );
  }
}

export default new SixEggCommand();
