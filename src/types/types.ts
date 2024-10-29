import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandOptionsOnlyBuilder,
} from 'discord.js';

export interface iCommand {
  name: string;
  description?: string;
  slashCommandConfig: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;

  execute(interaction: ChatInputCommandInteraction): Promise<void>;
}
