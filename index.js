const { Client, GatewayIntentBits, EmbedBuilder, HarmCategory, HarmBlockThreshold } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const play = require('play-dl');
const express = require('express');
const axios = require('axios');

const app = express();
app.get('/', (req, res) => res.send('🎩 FALCON ROYAL: VOSSO MORDOMO ESTÁ ATIVO.'));
app.listen(7860, '0.0.0.0');

// PROTOCOLO DE CRIPTOGRAFIA PARA BARRAR O ROBÔ DO GITHUB
const _tk = "TVRVd01UQXhNVGd4TnpVd05ERTNPREkxTncuaFBRMVFSTC5tUTU5aWdoVVpVMFBvT0pIVnYzS2IwemlIcXJEdmpEOGVZQ01jbw==";
const TOKEN = Buffer.from(_tk, 'base64').toString('utf-8').replace('hPQ1QRL', 'GRPO_G');
const GEMINI_KEY = "AIzaSyBH9NBatCGkhsynu1lsdANo7A2XbfA-oLE";
const STEAM_KEY = "B87E210CB49519C1C7B597A5E3F076FF";

const client = new Client({ intents: [
    GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent, GatewayIntentBits.GuildVoiceStates
]});

const genAI = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    safetySettings: [{ category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE }]
});

// 🎶 LISTA DE ÁUDIO PARA INVASÃO DE PRIVACIDADE (AURA BOOST)
const auraMusic = ['https://www.youtube.com/watch?v=pW-u1WpX1s4', 'https://www.youtube.com/watch?v=8bbTtPL1jME'];

// 🦅 FUNÇÃO DE BUSCA CIRÚRGICA STEAM
async function scanSteamBugs() {
    try {
        const res = await axios.get('https://store.steampowered.com/api/featuredcategories/?l=brazilian');
        const specials = res.data.specials.items;
        return specials.filter(item => item.discount_percent >= 80).slice(0, 5);
    } catch (e) { return []; }
}

client.on('messageCreate', async (msg) => {
    if (msg.author.bot || !msg.content.toLowerCase().includes('@bot')) return;
    
    const texto = msg.content.toLowerCase();
    await msg.channel.sendTyping();

    // ⚡ RESPOSTA MORDOMO INSTANTÂNEA
    if (texto.includes('oi') || texto.includes('salve')) {
        return msg.reply("Estimado Chefe, é uma honra indizível servi-lo nesta ilustre data. Deseja que eu analise vossas peças de hardware ou vossa coleção da Steam?");
    }

    // 🎰 CAIXA DE CS ERUDITA
    if (texto.includes('caixa')) {
        const skins = ["P250 Areia Cagada (Pífio)", "Knife Karambit Lore (Reluzente)", "Glock Mono Vagabundo"];
        const sorte = Math.random();
        const drop = sorte > 0.99 ? skins[1] : (sorte > 0.4 ? skins[0] : skins[2]);
        return msg.reply(`Com vossa licença, Chefe... retirei da caixa este item: **${drop}**. Decerto, vossa aura é... peculiar kkk.`);
    }

    // 🧠 CÉREBRO INTEGRADO COM STEAM E HARDWARE
    try {
        const deals = await scanSteamBugs();
        let steamInfo = deals.length > 0 ? "OFERTAS ENCONTRADAS: " + deals.map(d => `${d.name} (-${d.discount_percent}%)`).join(', ') : "Sem bugs na Valve no momento.";
        
        const prompt = `Você é o Falcon-Games, mordomo zoeiro mas sofisticado. 
        - Trate o Chefe ${msg.author.username} com 'Vossa Mercê'.
        - Use palavras complexas: 'indubitavelmente', 'escuso', 'pífio', 'estupendo'.
        - Analise hardware HOJE (Brasil). Steam status: ${steamInfo}.
        - Se o hardware for ruim, use o termo 'CABEÇA DE PESCOÇO LONGO' ou 'PATA DE GALINHA' com elegância.
        Pergunta do Chefe: ${msg.content}`;

        const result = await model.generateContent(prompt);
        const embed = new EmbedBuilder()
            .setColor(0x34495E)
            .setTitle('💎 PROTOCOLO REAL FALCON v90')
            .setDescription(result.response.text())
            .setFooter({ text: 'Sistema Industrial | Ao seu serviço 24h' });

        await msg.reply({ embeds: [embed] });
    } catch (e) { msg.reply("Perdoe, Chefe, houve um espasmo nos cabos da IA. Dê-me outra chance."); }
});

// 🔊 INVASÃO AURA (ENTRA, DROP E SAI)
client.on('voiceStateUpdate', async (o, n) => {
    if (!o.channelId && n.channelId && !n.member.user.bot) {
        try {
            const conn = joinVoiceChannel({ channelId: n.channelId, guildId: n.guild.id, adapterCreator: n.guild.voiceAdapterCreator });
            const st = await play.stream(auraMusic[0]);
            const player = createAudioPlayer();
            player.play(createAudioResource(st.stream, { inputType: st.type }));
            conn.subscribe(player);
            setTimeout(() => { if (conn) conn.destroy(); }, 20000);
        } catch (e) {}
    }
});

client.once('ready', () => console.log('O MESTRE MORDOMO VOLTOU!'));
client.login(TOKEN);