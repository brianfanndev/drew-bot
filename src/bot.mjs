import { Client, Intents } from 'discord.js';

const token = process.env.DISCORD_BOT_TOKEN;
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
    console.log('ready!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'esper') {
        await interaction.reply('Pong!');
    } else if (commandName === 'build') {
        await interaction.reply('Boop!');
    }
});

export const startBot = () => {
    client.login(token);
};
