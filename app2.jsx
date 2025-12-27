import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  ClipboardList, 
  PlayCircle, 
  Users, 
  Cpu, 
  ArrowRight, 
  ArrowLeft,
  Activity, 
  Shield, 
  Zap,
  Calendar,
  History,
  TrendingUp,
  XCircle,
  AlertTriangle,
  Swords,
  Gauge,
  MoveHorizontal,
  Target,
  Maximize2
} from 'lucide-react';

// --- DADOS E UTILITÁRIOS ---

const FORMATIONS = {
    '4-4-2': [
        {t: '90%', l: '50%', role: 'GK'}, 
        {t: '75%', l: '20%', role: 'LE'}, {t: '75%', l: '40%', role: 'ZAG'}, {t: '75%', l: '60%', role: 'ZAG'}, {t: '75%', l: '80%', role: 'LD'},
        {t: '45%', l: '20%', role: 'ME'}, {t: '45%', l: '40%', role: 'VOL'}, {t: '45%', l: '60%', role: 'VOL'}, {t: '45%', l: '80%', role: 'MD'},
        {t: '15%', l: '40%', role: 'ATA'}, {t: '15%', l: '60%', role: 'ATA'}
    ],
    '4-3-3': [
        {t: '90%', l: '50%', role: 'GK'}, 
        {t: '75%', l: '20%', role: 'LE'}, {t: '75%', l: '40%', role: 'ZAG'}, {t: '75%', l: '60%', role: 'ZAG'}, {t: '75%', l: '80%', role: 'LD'},
        {t: '50%', l: '50%', role: 'VOL'}, {t: '40%', l: '35%', role: 'MC'}, {t: '40%', l: '65%', role: 'MC'},
        {t: '15%', l: '20%', role: 'PE'}, {t: '10%', l: '50%', role: 'CA'}, {t: '15%', l: '80%', role: 'PD'}
    ],
    '4-2-3-1': [
        {t: '90%', l: '50%', role: 'GK'}, 
        {t: '75%', l: '20%', role: 'LE'}, {t: '75%', l: '40%', role: 'ZAG'}, {t: '75%', l: '60%', role: 'ZAG'}, {t: '75%', l: '80%', role: 'LD'},
        {t: '60%', l: '35%', role: 'VOL'}, {t: '60%', l: '65%', role: 'VOL'},
        {t: '35%', l: '20%', role: 'ME'}, {t: '35%', l: '50%', role: 'MEI'}, {t: '35%', l: '80%', role: 'MD'},
        {t: '15%', l: '50%', role: 'ATA'}
    ],
    '4-5-1': [
        {t: '90%', l: '50%', role: 'GK'}, 
        {t: '75%', l: '20%', role: 'LE'}, {t: '75%', l: '40%', role: 'ZAG'}, {t: '75%', l: '60%', role: 'ZAG'}, {t: '75%', l: '80%', role: 'LD'},
        {t: '50%', l: '15%', role: 'ME'}, {t: '50%', l: '32%', role: 'MC'}, {t: '50%', l: '50%', role: 'MC'}, {t: '50%', l: '68%', role: 'MC'}, {t: '50%', l: '85%', role: 'MD'},
        {t: '20%', l: '50%', role: 'ATA'}
    ],
    '4-1-4-1': [
        {t: '90%', l: '50%', role: 'GK'}, 
        {t: '75%', l: '20%', role: 'LE'}, {t: '75%', l: '40%', role: 'ZAG'}, {t: '75%', l: '60%', role: 'ZAG'}, {t: '75%', l: '80%', role: 'LD'},
        {t: '60%', l: '50%', role: 'VOL'},
        {t: '40%', l: '20%', role: 'ME'}, {t: '40%', l: '40%', role: 'MC'}, {t: '40%', l: '60%', role: 'MC'}, {t: '40%', l: '80%', role: 'MD'},
        {t: '15%', l: '50%', role: 'ATA'}
    ],
    '3-5-2': [
        {t: '90%', l: '50%', role: 'GK'}, 
        {t: '75%', l: '30%', role: 'ZAG'}, {t: '75%', l: '50%', role: 'ZAG'}, {t: '75%', l: '70%', role: 'ZAG'},
        {t: '50%', l: '10%', role: 'AE'}, {t: '50%', l: '30%', role: 'VOL'}, {t: '50%', l: '70%', role: 'VOL'}, {t: '50%', l: '90%', role: 'AD'},
        {t: '35%', l: '50%', role: 'MEI'},
        {t: '15%', l: '35%', role: 'ATA'}, {t: '15%', l: '65%', role: 'ATA'}
    ],
    '5-3-2': [
        {t: '90%', l: '50%', role: 'GK'},
        {t: '75%', l: '15%', role: 'AE'}, {t: '75%', l: '30%', role: 'ZAG'}, {t: '80%', l: '50%', role: 'LIB'}, {t: '75%', l: '70%', role: 'ZAG'}, {t: '75%', l: '85%', role: 'AD'},
        {t: '50%', l: '30%', role: 'VOL'}, {t: '50%', l: '50%', role: 'MC'}, {t: '50%', l: '70%', role: 'MC'},
        {t: '15%', l: '35%', role: 'ATA'}, {t: '15%', l: '65%', role: 'ATA'}
    ],
    '3-4-3': [
        {t: '90%', l: '50%', role: 'GK'},
        {t: '75%', l: '30%', role: 'ZAG'}, {t: '75%', l: '50%', role: 'ZAG'}, {t: '75%', l: '70%', role: 'ZAG'},
        {t: '50%', l: '15%', role: 'ME'}, {t: '50%', l: '38%', role: 'VOL'}, {t: '50%', l: '62%', role: 'VOL'}, {t: '50%', l: '85%', role: 'MD'},
        {t: '20%', l: '20%', role: 'PE'}, {t: '15%', l: '50%', role: 'CA'}, {t: '20%', l: '80%', role: 'PD'}
    ],
    '3-4-2-1': [
        {t: '90%', l: '50%', role: 'GK'},
        {t: '75%', l: '30%', role: 'ZAG'}, {t: '75%', l: '50%', role: 'ZAG'}, {t: '75%', l: '70%', role: 'ZAG'},
        {t: '50%', l: '10%', role: 'AE'}, {t: '55%', l: '40%', role: 'VOL'}, {t: '55%', l: '60%', role: 'VOL'}, {t: '50%', l: '90%', role: 'AD'},
        {t: '30%', l: '35%', role: 'MEI'}, {t: '30%', l: '65%', role: 'MEI'},
        {t: '15%', l: '50%', role: 'ATA'}
    ],
    '4-3-2-1': [
        {t: '90%', l: '50%', role: 'GK'},
        {t: '75%', l: '20%', role: 'LE'}, {t: '75%', l: '40%', role: 'ZAG'}, {t: '75%', l: '60%', role: 'ZAG'}, {t: '75%', l: '80%', role: 'LD'},
        {t: '55%', l: '30%', role: 'VOL'}, {t: '55%', l: '50%', role: 'VOL'}, {t: '55%', l: '70%', role: 'VOL'},
        {t: '35%', l: '40%', role: 'MEI'}, {t: '35%', l: '60%', role: 'MEI'},
        {t: '15%', l: '50%', role: 'ATA'}
    ],
    '5-4-1 (Retranca)': [
         {t: '90%', l: '50%', role: 'GK'},
         {t: '75%', l: '10%', role: 'LE'}, {t: '75%', l: '30%', role: 'ZAG'}, {t: '80%', l: '50%', role: 'LIB'}, {t: '75%', l: '70%', role: 'ZAG'}, {t: '75%', l: '90%', role: 'LD'},
         {t: '55%', l: '20%', role: 'ME'}, {t: '55%', l: '40%', role: 'VOL'}, {t: '55%', l: '60%', role: 'VOL'}, {t: '55%', l: '80%', role: 'MD'},
         {t: '20%', l: '50%', role: 'CA'}
    ]
};

// Liga com 20 Times - Força Equilibrada (Base 85)
const INITIAL_TABLE = [
    { id: 1, name: 'Manchester City', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 2, name: 'Real Madrid', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 3, name: 'Bayern Munich', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 4, name: 'SEU TIME', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, user: true, strength: 85 },
    { id: 5, name: 'Liverpool', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 6, name: 'Inter Milan', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 7, name: 'Arsenal', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 8, name: 'Barcelona', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 9, name: 'PSG', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 10, name: 'Juventus', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 11, name: 'Atlético Madrid', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 12, name: 'B. Dortmund', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 13, name: 'Chelsea', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 14, name: 'AC Milan', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 15, name: 'Tottenham', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 16, name: 'Leverkusen', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 17, name: 'Napoli', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 18, name: 'Benfica', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 19, name: 'Ajax', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
    { id: 20, name: 'Porto', p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0, strength: 85 },
];

// --- HELPERS ESTATÍSTICOS ---

// Gera números aleatórios com distribuição normal (Curva de Sino)
// Isso evita que o jogo seja "Random.io" e premia a consistência.
// Média 0, Desvio Padrão 1. A maioria dos resultados fica entre -1 e 1.
function gaussianRandom() {
    let u = 0, v = 0;
    while(u === 0) u = Math.random(); 
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

// Matriz de Vantagem Tática (Pedra-Papel-Tesoura)
const TACTICAL_MATCHUPS = {
    'posse': { 'contra': -5, 'pressao': -10, 'direto': 5, 'equilibrado': 0 }, // Sofre muito contra pressão
    'contra': { 'posse': 5, 'pressao': 5, 'direto': 0, 'equilibrado': 0 }, // Bom contra posse e pressão (acha espaço)
    'pressao': { 'posse': 10, 'contra': -5, 'direto': -5, 'equilibrado': 5 }, // Mata a posse, mas leva bola nas costas do direto
    'direto': { 'posse': -5, 'contra': 0, 'pressao': 5, 'equilibrado': 0 }, // Pula a linha de pressão
    'equilibrado': { 'posse': 0, 'contra': 0, 'pressao': -5, 'direto': 0 }
};

// --- COMPONENTES ---

const TacticalBoard = ({ formation }) => {
    const players = FORMATIONS[formation] || FORMATIONS['4-4-2'];

    return (
        <div className="relative w-full aspect-[2/3] max-w-[280px] sm:max-w-[320px] md:max-w-[350px] mx-auto bg-green-700 rounded-lg border-4 border-white/20 shadow-2xl overflow-hidden pitch-pattern transition-all duration-300">
            <div className="absolute top-0 left-0 w-full h-full border-2 border-white/30 m-2 box-border rounded-sm"></div>
            <div className="absolute top-[50%] left-0 w-full h-0.5 bg-white/30 -translate-y-1/2"></div>
            <div className="absolute top-[50%] left-[50%] w-24 h-24 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-0 left-[50%] w-32 h-16 border-2 border-t-0 border-white/30 -translate-x-1/2"></div>
            <div className="absolute bottom-0 left-[50%] w-32 h-16 border-2 border-b-0 border-white/30 -translate-x-1/2 m-2 mb-0"></div>

            {players.map((pos, idx) => (
                <div 
                    key={idx}
                    className="absolute w-6 h-6 sm:w-7 sm:h-7 bg-blue-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white z-10 player-dot"
                    style={{ top: pos.t, left: pos.l, transform: 'translate(-50%, -50%)' }}
                >
                    {pos.role}
                </div>
            ))}
        </div>
    );
};

export default function App() {
    const [activeTab, setActiveTab] = useState('table');
    const [mode, setMode] = useState('simple');
    const [leagueData, setLeagueData] = useState(INITIAL_TABLE);
    const [round, setRound] = useState(1);
    const [history, setHistory] = useState({});
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [nextOpponent, setNextOpponent] = useState(null);

    // --- NOVA ESTRUTURA TÁTICA ---
    const [tactics, setTactics] = useState({
        formation: '4-3-3',
        style: 'equilibrado',
        mentality: 'equilibrado',
        
        lineHeight: 50,
        width: 'normal',
        tempo: 'normal',
        creation: 'misto',
        compactness: 'media',
        pressure: 'media',
        setPieces: 'simples',
        
        sitWin: 'recuar',
        sitLose: 'pressao'
    });

    const [matchLog, setMatchLog] = useState([]);
    const [matchResult, setMatchResult] = useState(null);
    const [isSimulating, setIsSimulating] = useState(false);
    const [opponent, setOpponent] = useState(null);

    // Scout do oponente
    useEffect(() => {
        const possibleOpponents = leagueData.filter(t => !t.user);
        const randomOpp = possibleOpponents[Math.floor(Math.random() * possibleOpponents.length)];
        
        setNextOpponent({
            ...randomOpp,
            tacticStyle: ['posse', 'contra', 'direto', 'pressao'][Math.floor(Math.random()*4)],
            width: ['estreita', 'normal', 'aberta'][Math.floor(Math.random()*3)],
            compactness: ['baixa', 'media', 'alta'][Math.floor(Math.random()*3)],
            formVar: Math.floor(Math.random() * 6) - 3
        });
    }, [round]);

    const prepareMatch = () => {
        const currentOpponent = nextOpponent || { 
            name: "CPU FC", strength: 85, formVar: 0, tacticStyle: 'equilibrado', width: 'normal', id: 999 
        };
        
        setOpponent(currentOpponent);
        setMatchResult(null);
        setMatchLog([]);
        setActiveTab('match');
        setIsSimulating(false);
        
        setTimeout(() => simulateMatch(currentOpponent), 500);
    };

    // --- MOTOR DE SIMULAÇÃO 5.0 (GAUSSIANO & DINÂMICO) ---
    const simulateMatch = (currentOpponent) => {
        setIsSimulating(true);

        // 1. Definição de Stats Iniciais
        // Base igual para todos (85) + Variação do dia (-3 a +3)
        let userBase = 85; 
        let oppBase = currentOpponent.strength + currentOpponent.formVar;

        // Atributos:
        // Atk: Poder de fogo | Def: Solidez | Ctrl: Posse de bola | Org: Disciplina tática
        let userStats = { atk: userBase, def: userBase, ctrl: userBase, org: 90, stam: 100 };
        let oppStats = { atk: oppBase, def: oppBase, ctrl: oppBase, org: 90, stam: 100 };

        // 2. Aplicação de Táticas (Modifiers)
        // Nota: Modificadores agora são trade-offs. Se ganha num lugar, perde em outro.
        
        // Estilo
        if (tactics.style === 'posse') { userStats.ctrl += 8; userStats.atk -= 4; userStats.def -= 4; }
        if (tactics.style === 'contra') { userStats.def += 6; userStats.atk += 2; userStats.ctrl -= 8; }
        if (tactics.style === 'pressao') { userStats.def += 4; userStats.ctrl += 4; userStats.stam -= 20; } // Custo alto de stamina
        if (tactics.style === 'direto') { userStats.atk += 6; userStats.ctrl -= 6; }

        // Mentalidade
        let riskFactor = 1.0; // Multiplicador de variância
        if (tactics.mentality === 'agressivo') { 
            userStats.atk += 8; userStats.def -= 8; 
            riskFactor = 1.2; // Mais instável
        }
        if (tactics.mentality === 'conservador') { 
            userStats.def += 8; userStats.atk -= 8; 
            riskFactor = 0.8; // Mais estável
        }

        // CPU Tática (Simulada)
        if (currentOpponent.tacticStyle === 'posse') oppStats.ctrl += 8;
        if (currentOpponent.tacticStyle === 'pressao') { oppStats.ctrl += 4; oppStats.stam -= 20; }

        // 3. Matchup Tático (Pedra-Papel-Tesoura)
        // Isso decide quem tem vantagem inicial
        const tacticalBonus = (TACTICAL_MATCHUPS[tactics.style] && TACTICAL_MATCHUPS[tactics.style][currentOpponent.tacticStyle]) || 0;
        userStats.ctrl += tacticalBonus;

        let userScore = 0;
        let cpuScore = 0;
        let logs = [];
        let currentTime = 0;
        let userSituationalTriggered = false;

        const interval = setInterval(() => {
            currentTime += 5; // Ciclos de 5 minutos

            // A. Comportamento Situacional
            if (mode === 'advanced' && !userSituationalTriggered) {
                if (userScore > cpuScore && tactics.sitWin === 'recuar') {
                    userStats.def += 10; userStats.atk -= 10;
                    logs.unshift({time: currentTime, text: "🛡️ Tática: Time recuou para segurar o resultado.", type: "info"});
                    userSituationalTriggered = true;
                }
                if (userScore < cpuScore && tactics.sitLose === 'pressao') {
                    userStats.atk += 10; userStats.def -= 10; userStats.stam -= 10;
                    logs.unshift({time: currentTime, text: "🔥 Tática: Pressão total em busca do gol!", type: "info"});
                    userSituationalTriggered = true;
                }
            }

            // B. Cálculo de Eficiência (Stamina Progressiva)
            // A eficiência não cai em degrau, cai em curva.
            // 100% stamina = 1.0 eficiencia. 50% stamina = 0.85 eficiencia.
            const calcEfficiency = (stamina) => 0.7 + (Math.max(0, stamina) / 100) * 0.3;
            
            const userEff = calcEfficiency(userStats.stam);
            const oppEff = calcEfficiency(oppStats.stam);

            // Stamina drain
            let stamDrain = 1.5; // Base
            if (tactics.pressure === 'alta') stamDrain += 2.5;
            if (tactics.pressure === 'baixa') stamDrain -= 0.5;
            userStats.stam -= stamDrain;
            oppStats.stam -= 1.5; // CPU base drain

            // C. Disputa de Controle (Gaussiana)
            // Usamos gaussianRandom() para centralizar os resultados.
            // Multiplicamos pelo RiskFactor para aumentar/diminuir a variância.
            const noise = gaussianRandom() * 8 * riskFactor; 
            const controlVal = (userStats.ctrl * userEff) - (oppStats.ctrl * oppEff) + noise;

            // D. O Funil de Eventos
            let attacker = null;
            let momentum = 0; // Bonus temporário

            // Quem tem a bola e tenta criar?
            if (controlVal > 3) attacker = 'user';
            else if (controlVal < -3) attacker = 'cpu';
            else {
                // Jogo travado no meio campo
                if (Math.random() < 0.1) logs.unshift({time: currentTime, text: "⏳ Batalha tática no meio-campo.", type: "default"});
            }

            if (attacker) {
                // E. Qualidade da Chance (xG)
                // Atk do Atacante vs Def do Defensor + Organização
                
                let atkVal, defVal, compactnessBonus;
                
                if (attacker === 'user') {
                    atkVal = userStats.atk * userEff;
                    defVal = oppStats.def * oppEff;
                    // Se CPU tem alta compactação, é difícil criar chance clara
                    if (currentOpponent.compactness === 'alta') defVal += 5;
                } else {
                    atkVal = oppStats.atk * oppEff;
                    defVal = userStats.def * userEff;
                    if (tactics.compactness === 'alta') defVal += 5;
                }

                // Roll de criação
                const creationDiff = (atkVal + gaussianRandom() * 10) - defVal;
                
                let chanceType = 'none'; // blocked, speculative, decent, golden
                
                if (creationDiff > 20) chanceType = 'golden'; // Chance Clara
                else if (creationDiff > 8) chanceType = 'decent'; // Chance Média
                else if (creationDiff > -5) chanceType = 'speculative'; // Chute de Longe
                else chanceType = 'blocked'; // Bloqueado

                // F. Conversão (O Gol)
                if (chanceType !== 'none' && chanceType !== 'blocked') {
                    let goalProb = 0;
                    let desc = "";

                    if (chanceType === 'speculative') { goalProb = 0.02; desc = "Chute de longe..."; }
                    if (chanceType === 'decent') { goalProb = 0.12; desc = "Finalização perigosa."; }
                    if (chanceType === 'golden') { goalProb = 0.35; desc = "Cara a cara com o goleiro!"; }

                    // Ajuste de "Ritmo"
                    // Ritmo rápido gera mais chances, mas com finalização pior (pressa)
                    if (tactics.tempo === 'rapido') goalProb *= 0.9;
                    if (tactics.tempo === 'lento') goalProb *= 1.1; // Mais trabalhado

                    if (Math.random() < goalProb) {
                        if (attacker === 'user') {
                            userScore++;
                            logs.unshift({time: currentTime, text: `⚽ GOOOL! ${desc}`, type: "goal"});
                        } else {
                            cpuScore++;
                            logs.unshift({time: currentTime, text: `⚠️ GOL DO ADVERSÁRIO. ${desc}`, type: "bad"});
                        }
                    } else {
                        // Narrativa de erro
                        if (chanceType === 'golden') logs.unshift({time: currentTime, text: `❌ PERDEU! ${desc} Goleiro salvou.`, type: "miss"});
                        else if (chanceType === 'decent' && Math.random() < 0.3) logs.unshift({time: currentTime, text: `🧤 ${desc} Defesa do goleiro.`, type: "miss"});
                    }
                } else if (chanceType === 'blocked' && Math.random() < 0.15) {
                    logs.unshift({time: currentTime, text: attacker === 'user' ? "🧱 Defesa adversária bloqueou o chute." : "🛡️ Corte providencial da sua zaga.", type: "default"});
                }
            }

            // G. Eventos Raros (Bolas Paradas / Erros) - Frequência reduzida
            if (Math.random() < 0.005) { // 0.5% chance
                if (Math.random() > 0.5) {
                    // Bola parada user
                    let bonus = tactics.setPieces === 'ofensiva' ? 0.1 : 0;
                    if (Math.random() < (0.1 + bonus)) {
                        userScore++;
                        logs.unshift({time: currentTime, text: "⚽ GOL DE BOLA PARADA! Jogada ensaiada.", type: "goal"});
                    } else {
                        logs.unshift({time: currentTime, text: "🚩 Perigo em bola parada a seu favor.", type: "info"});
                    }
                } else {
                    // Erro / Zebra
                    if (Math.random() < 0.2) {
                        cpuScore++;
                        logs.unshift({time: currentTime, text: "⚠️ PÊNALTI para eles! Gol.", type: "bad"});
                    }
                }
            }

            setMatchLog([...logs]);

            if (currentTime >= 90) {
                clearInterval(interval);
                setIsSimulating(false);
                setMatchResult({ user: userScore, cpu: cpuScore });
                updateLeagueTable(userScore, cpuScore, currentOpponent);
            }
        }, 100);
    };

    const updateLeagueTable = (uScore, cScore, currentOpponent) => {
        setRound(r => r + 1);
        
        const userTacticSnapshot = { 
            style: tactics.style, 
            mentality: tactics.mentality 
        };

        let newHistory = { ...history };

        const addToHistory = (teamId, opponentName, myScore, oppScore, tactic) => {
            if (!newHistory[teamId]) newHistory[teamId] = [];
            const result = myScore > oppScore ? 'V' : myScore < oppScore ? 'D' : 'E';
            newHistory[teamId].unshift({
                round: round,
                opponent: opponentName,
                score: `${myScore} - ${oppScore}`,
                result: result,
                tactic: tactic
            });
        };

        setLeagueData(prev => {
            let updated = prev.map(team => {
                if (team.user) {
                    addToHistory(team.id, currentOpponent.name, uScore, cScore, userTacticSnapshot);
                    return {
                        ...team,
                        p: team.p + 1,
                        gf: team.gf + uScore,
                        ga: team.ga + cScore,
                        w: team.w + (uScore > cScore ? 1 : 0),
                        d: team.d + (uScore === cScore ? 1 : 0),
                        l: team.l + (uScore < cScore ? 1 : 0),
                        pts: team.pts + (uScore > cScore ? 3 : (uScore === cScore ? 1 : 0))
                    };
                }
                if (team.id === currentOpponent.id) {
                    addToHistory(team.id, "SEU TIME", cScore, uScore, {style: 'CPU'});
                    return {
                        ...team,
                        p: team.p + 1,
                        gf: team.gf + cScore,
                        ga: team.ga + uScore,
                        w: team.w + (cScore > uScore ? 1 : 0),
                        d: team.d + (cScore === uScore ? 1 : 0),
                        l: team.l + (cScore < uScore ? 1 : 0),
                        pts: team.pts + (cScore > uScore ? 3 : (cScore === uScore ? 1 : 0))
                    };
                }
                
                // Simulação Poisson Ajustada para Equilíbrio
                const simulateGoals = () => {
                    // Lambda 1.1 gera média de gols realista (~2.2 gols por jogo no total)
                    let lambda = 1.1; 
                    const L = Math.exp(-lambda);
                    let p = 1.0;
                    let k = 0;
                    do { k++; p *= Math.random(); } while (p > L);
                    return k - 1;
                };

                const fakeOpponents = prev.filter(t => t.id !== team.id && !t.user);
                const randomFakeOpp = fakeOpponents[Math.floor(Math.random() * fakeOpponents.length)];
                
                const teamGols = simulateGoals();
                const enemyGols = simulateGoals();

                addToHistory(team.id, randomFakeOpp.name, teamGols, enemyGols, {style: 'Sim'});

                const win = teamGols > enemyGols;
                const draw = teamGols === enemyGols;
                
                return {
                     ...team,
                        p: team.p + 1,
                        gf: team.gf + teamGols,
                        ga: team.ga + enemyGols,
                        pts: team.pts + (win ? 3 : (draw ? 1 : 0)),
                        w: team.w + (win ? 1 : 0),
                        d: team.d + (draw ? 1 : 0),
                        l: team.l + (!win && !draw ? 1 : 0)
                };
            });
            return updated.sort((a, b) => b.pts - a.pts || (b.gf - b.ga) - (a.gf - a.ga));
        });
        
        setHistory(newHistory);
    };

    const handleTeamClick = (team) => {
        setSelectedTeam(team);
        setActiveTab('teamDetail');
    };

    return (
        <div className="min-h-screen bg-slate-900 pb-20 md:pb-0 text-slate-200 font-sans">
            <style>{`
                .pitch-pattern {
                    background-color: #2f855a;
                    background-image: 
                        linear-gradient(0deg, transparent 24%, rgba(255, 255, 255, .1) 25%, rgba(255, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .1) 75%, rgba(255, 255, 255, .1) 76%, transparent 77%, transparent), 
                        linear-gradient(90deg, transparent 24%, rgba(255, 255, 255, .1) 25%, rgba(255, 255, 255, .1) 26%, transparent 27%, transparent 74%, rgba(255, 255, 255, .1) 75%, rgba(255, 255, 255, .1) 76%, transparent 77%, transparent);
                    background-size: 50px 50px;
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
                }
                .player-dot { transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
            `}</style>

            {/* Header */}
            <header className="bg-slate-800 border-b border-slate-700 p-3 sm:p-4 sticky top-0 z-50 shadow-md">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent flex items-center cursor-pointer" onClick={() => setActiveTab('table')}>
                        <Trophy className="mr-2 text-green-400" size={20} />
                        Tactical Manager
                    </h1>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1 rounded border border-slate-700">
                        <Calendar size={12} />
                        <span className="hidden sm:inline">Rodada</span> {round}/38
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto p-2 sm:p-4">
                
                {/* TAB: TABELA */}
                {activeTab === 'table' && (
                    <div className="animate-fade-in">
                        <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                            <div className="p-3 sm:p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center">
                                <h2 className="font-bold text-base sm:text-lg text-white flex items-center">
                                    <ClipboardList className="mr-2 text-blue-400" size={20}/>
                                    Classificação
                                </h2>
                                <button onClick={() => setActiveTab('tactics')} className="bg-blue-600 hover:bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition flex items-center shadow-lg shadow-blue-900/50">
                                    Preparar Time <ArrowRight className="ml-2" size={16}/>
                                </button>
                            </div>
                            <div className="overflow-x-auto min-h-[300px]">
                                <table className="w-full text-xs sm:text-sm text-left">
                                    <thead className="text-xs text-slate-400 uppercase bg-slate-900/50 sticky top-0">
                                        <tr>
                                            <th className="px-2 sm:px-4 py-3">#</th>
                                            <th className="px-2 sm:px-4 py-3">Time</th>
                                            <th className="px-2 sm:px-4 py-3 text-center" title="Jogos">J</th>
                                            <th className="px-2 sm:px-4 py-3 text-center" title="Vitórias">V</th>
                                            <th className="px-2 sm:px-4 py-3 text-center" title="Derrotas">D</th>
                                            <th className="px-2 sm:px-4 py-3 text-center text-white" title="Pontos">PTS</th>
                                            <th className="px-2 sm:px-4 py-3 text-center hidden sm:table-cell">SG</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-700">
                                        {leagueData.map((team, idx) => (
                                            <tr 
                                                key={team.id} 
                                                onClick={() => handleTeamClick(team)}
                                                className={`cursor-pointer ${team.user ? 'bg-blue-900/30' : idx < 4 ? 'bg-green-900/10' : idx > 16 ? 'bg-red-900/10' : ''} hover:bg-slate-700/80 transition`}
                                            >
                                                <td className={`px-2 sm:px-4 py-3 font-mono ${idx < 4 ? 'text-green-400' : idx > 16 ? 'text-red-400' : 'text-slate-500'}`}>{idx + 1}</td>
                                                <td className="px-2 sm:px-4 py-3 font-medium flex items-center text-white">
                                                    {team.user && <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>}
                                                    <span className="truncate max-w-[120px] sm:max-w-none">{team.name}</span>
                                                </td>
                                                <td className="px-2 sm:px-4 py-3 text-center text-slate-400">{team.p}</td>
                                                <td className="px-2 sm:px-4 py-3 text-center text-slate-500">{team.w}</td>
                                                <td className="px-2 sm:px-4 py-3 text-center text-slate-500">{team.l}</td>
                                                <td className="px-2 sm:px-4 py-3 text-center font-bold text-white text-base">{team.pts}</td>
                                                <td className="px-2 sm:px-4 py-3 text-center hidden sm:table-cell text-slate-500">{team.gf - team.ga}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-2 text-center text-xs text-slate-500 bg-slate-900/50">
                                Clique em um time para ver detalhes e histórico
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: DETALHES DO TIME */}
                {activeTab === 'teamDetail' && selectedTeam && (
                    <div className="animate-fade-in space-y-4">
                        <button 
                            onClick={() => setActiveTab('table')}
                            className="flex items-center text-slate-400 hover:text-white transition text-sm mb-4"
                        >
                            <ArrowLeft className="mr-1" size={16} /> Voltar
                        </button>

                        <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700 shadow-xl">
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-6 border-b border-slate-700 pb-4 gap-4">
                                <div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                                        {selectedTeam.user && <span className="w-3 h-3 bg-blue-500 rounded-full mr-3 shadow-lg shadow-blue-500/50"></span>}
                                        {selectedTeam.name}
                                    </h2>
                                    <div className="text-slate-400 text-sm mt-1 flex flex-wrap items-center gap-4">
                                        <span>Força: <span className="text-white font-mono">{selectedTeam.strength}</span></span>
                                        <span>Jogos: <span className="text-white font-mono">{selectedTeam.p}</span></span>
                                        <span>Saldo: <span className="text-white font-mono">{selectedTeam.gf - selectedTeam.ga}</span></span>
                                    </div>
                                </div>
                                <div className="text-right w-full sm:w-auto">
                                    <div className="text-3xl sm:text-4xl font-bold text-green-400">{selectedTeam.pts} <span className="text-sm text-slate-500 font-normal">pts</span></div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-slate-300 flex items-center text-sm uppercase tracking-wider">
                                    <History className="mr-2" size={16}/> Histórico de Partidas
                                </h3>
                                
                                {history[selectedTeam.id] && history[selectedTeam.id].length > 0 ? (
                                    <div className="space-y-2">
                                        {history[selectedTeam.id].map((match, i) => (
                                            <div key={i} className="bg-slate-900/50 p-3 rounded-lg border border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-2">
                                                <div className="flex items-center gap-3 w-full sm:w-auto">
                                                    <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-1 rounded">R{match.round}</span>
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                                        match.result === 'V' ? 'bg-green-600 text-white' : 
                                                        match.result === 'D' ? 'bg-red-600 text-white' : 'bg-slate-600 text-white'
                                                    }`}>
                                                        {match.result}
                                                    </div>
                                                    <span className="text-sm font-medium text-slate-200 truncate max-w-[150px] sm:max-w-none">vs {match.opponent}</span>
                                                </div>
                                                
                                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                    <div className="text-xs text-slate-400 flex flex-col items-end">
                                                        <span className="capitalize text-slate-300">{match.tactic?.style || 'Padrão'}</span>
                                                    </div>
                                                    <span className="text-lg font-mono font-bold text-white bg-slate-800 px-3 py-1 rounded min-w-[60px] text-center">
                                                        {match.score}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-10 text-slate-500 bg-slate-900/30 rounded-lg">
                                        Nenhuma partida registrada ainda.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: TÁTICAS */}
                {activeTab === 'tactics' && (
                    <div className="animate-fade-in space-y-4">
                        <div className="flex items-center justify-between">
                            <button 
                                onClick={() => setActiveTab('table')}
                                className="flex items-center bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700 px-3 sm:px-4 py-2 rounded-lg transition text-xs sm:text-sm font-bold shadow-sm"
                            >
                                <ArrowLeft className="mr-2" size={16} />
                                Voltar
                            </button>
                            <div className="text-xs font-mono text-slate-500">Preparação - Rodada {round}</div>
                        </div>

                        {/* CARD DO PRÓXIMO ADVERSÁRIO */}
                        {nextOpponent && (
                            <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-4 rounded-xl shadow-lg flex flex-col sm:flex-row items-center justify-between relative overflow-hidden group gap-4">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl group-hover:bg-white/10 transition"></div>
                                
                                <div className="flex items-center gap-4 z-10 w-full sm:w-auto">
                                    <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600 shadow-md shrink-0">
                                        <Shield size={24} className="text-slate-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-xs text-slate-400 uppercase tracking-wider font-bold mb-1">Próximo Adversário</div>
                                        <h2 className="text-lg sm:text-xl font-bold text-white leading-none truncate">{nextOpponent.name}</h2>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                                            <span className="text-slate-400 flex items-center" title="Força Estimada">
                                                <Zap size={12} className="mr-1 text-yellow-500" /> 
                                                <span className="hidden sm:inline">Força:</span> <span className="text-slate-200 font-mono ml-1">{nextOpponent.strength + (nextOpponent.formVar > 0 ? '+' : '')}{nextOpponent.formVar !== 0 && <span className="text-xs opacity-50">({nextOpponent.formVar})</span>}</span>
                                            </span>
                                            <span className="text-slate-400 flex items-center" title="Posição na Tabela">
                                                <Trophy size={12} className="mr-1 text-blue-500" /> 
                                                <span className="hidden sm:inline">Pos:</span> <span className="text-slate-200 font-mono ml-1">{leagueData.findIndex(t => t.id === nextOpponent.id) + 1}º</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="text-right z-10 w-full sm:w-auto flex justify-between sm:block border-t border-slate-700 sm:border-0 pt-3 sm:pt-0 mt-2 sm:mt-0">
                                    <div className="text-xs text-slate-500 mb-1 flex items-center sm:justify-end">Estilo Previsto</div>
                                    <div className="text-sm font-bold text-slate-300 bg-slate-800 px-2 py-1 rounded border border-slate-700 capitalize inline-block">
                                        {nextOpponent.tacticStyle}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Coluna Esquerda: Controles */}
                            <div className="space-y-6">
                                <div className="flex justify-between items-center bg-slate-800 p-3 rounded-lg border border-slate-700">
                                    <span className="text-sm font-medium text-slate-300">Modo de Edição</span>
                                    <div className="flex bg-slate-900 rounded p-1">
                                        <button 
                                            onClick={() => setMode('simple')}
                                            className={`px-3 py-1 text-xs rounded transition ${mode === 'simple' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
                                        >Simples</button>
                                        <button 
                                            onClick={() => setMode('advanced')}
                                            className={`px-3 py-1 text-xs rounded transition ${mode === 'advanced' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'}`}
                                        >Avançado</button>
                                    </div>
                                </div>

                                {/* Configurações Básicas (Macro) */}
                                <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4">
                                    <h3 className="font-bold text-green-400 flex items-center text-sm uppercase tracking-wide">
                                        <Users className="mr-2" size={16}/> Estrutura Base
                                    </h3>
                                    
                                    <div>
                                        <label className="block text-xs uppercase tracking-wide text-slate-400 mb-2">Formação</label>
                                        <select 
                                            value={tactics.formation}
                                            onChange={(e) => setTactics({...tactics, formation: e.target.value})}
                                            className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white focus:border-blue-500 outline-none text-sm"
                                        >
                                            {Object.keys(FORMATIONS).map(f => <option key={f} value={f}>{f}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wide text-slate-400 mb-2">Estilo de Jogo</label>
                                        <div className="grid grid-cols-2 gap-2">
                                            {['posse', 'contra', 'direto', 'pressao'].map(s => (
                                                <button 
                                                    key={s}
                                                    onClick={() => setTactics({...tactics, style: s})}
                                                    className={`p-2 rounded border text-sm capitalize transition ${tactics.style === s ? 'bg-green-600 border-green-500 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2 bg-slate-900/50 p-2 rounded border border-slate-800">
                                            {tactics.style === 'posse' && "ℹ️ Prioriza controle e passes curtos."}
                                            {tactics.style === 'contra' && "ℹ️ Defesa sólida e ataques rápidos."}
                                            {tactics.style === 'direto' && "ℹ️ Bolas longas, ignora o meio."}
                                            {tactics.style === 'pressao' && "ℹ️ Intensidade alta para roubar a bola."}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="block text-xs uppercase tracking-wide text-slate-400 mb-2">Mentalidade (Risco)</label>
                                        <div className="flex gap-2">
                                            {['conservador', 'equilibrado', 'agressivo'].map(m => (
                                                <button 
                                                    key={m}
                                                    onClick={() => setTactics({...tactics, mentality: m})}
                                                    className={`flex-1 p-2 rounded border text-sm capitalize transition ${tactics.mentality === m ? 'bg-blue-600 border-blue-500 text-white shadow-md' : 'bg-slate-900 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                                >
                                                    {m}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Configurações Avançadas (Micro) */}
                                {mode === 'advanced' && (
                                    <div className="space-y-4 animate-slide-in">
                                        
                                        {/* Físico e Ritmo */}
                                        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4 border-l-4 border-l-red-500">
                                            <h3 className="font-bold text-red-400 flex items-center text-sm uppercase tracking-wide">
                                                <Activity className="mr-2" size={16}/> Físico & Ritmo
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Pressão</label>
                                                    <select value={tactics.pressure} onChange={(e) => setTactics({...tactics, pressure: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                        <option value="baixa">Baixa (Pupa Físico)</option>
                                                        <option value="media">Média</option>
                                                        <option value="alta">Alta (Desgaste Alto)</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Ritmo</label>
                                                    <select value={tactics.tempo} onChange={(e) => setTactics({...tactics, tempo: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                        <option value="lento">Lento (Cadenciado)</option>
                                                        <option value="normal">Normal</option>
                                                        <option value="rapido">Rápido (Frenético)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Posicionamento */}
                                        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4 border-l-4 border-l-purple-500">
                                            <h3 className="font-bold text-purple-400 flex items-center text-sm uppercase tracking-wide">
                                                <MoveHorizontal className="mr-2" size={16}/> Posicionamento
                                            </h3>
                                            <div>
                                                <div className="flex justify-between text-xs mb-1 text-slate-300">
                                                    <span>Linha Defensiva</span>
                                                    <span className="font-mono text-purple-300">{tactics.lineHeight > 70 ? 'Alta' : tactics.lineHeight < 30 ? 'Baixa' : 'Média'}</span>
                                                </div>
                                                <input type="range" min="0" max="100" value={tactics.lineHeight} onChange={(e) => setTactics({...tactics, lineHeight: parseInt(e.target.value)})} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500" />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Largura</label>
                                                    <select value={tactics.width} onChange={(e) => setTactics({...tactics, width: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                        <option value="estreita">Estreita (Compacta)</option>
                                                        <option value="normal">Normal</option>
                                                        <option value="aberta">Aberta (Espalhada)</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Compactação</label>
                                                    <select value={tactics.compactness} onChange={(e) => setTactics({...tactics, compactness: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                        <option value="baixa">Baixa (Espaços)</option>
                                                        <option value="media">Média</option>
                                                        <option value="alta">Alta (Bloco Fechado)</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Técnico e Situacional */}
                                        <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 space-y-4 border-l-4 border-l-yellow-500">
                                            <h3 className="font-bold text-yellow-400 flex items-center text-sm uppercase tracking-wide">
                                                <Target className="mr-2" size={16}/> Técnico & Situacional
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Criação</label>
                                                    <select value={tactics.creation} onChange={(e) => setTactics({...tactics, creation: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                        <option value="lados">Pelos Lados</option>
                                                        <option value="centro">Pelo Centro</option>
                                                        <option value="misto">Misto</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-[10px] uppercase text-slate-400 mb-1">Bolas Paradas</label>
                                                    <select value={tactics.setPieces} onChange={(e) => setTactics({...tactics, setPieces: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                        <option value="simples">Simples</option>
                                                        <option value="ofensiva">Ofensiva (Risco)</option>
                                                        <option value="segura">Segura (Controle)</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="pt-2 border-t border-slate-700 mt-2">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Se estiver ganhando</label>
                                                        <select value={tactics.sitWin} onChange={(e) => setTactics({...tactics, sitWin: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                            <option value="manter">Manter</option>
                                                            <option value="recuar">Recuar Linhas</option>
                                                            <option value="gastar">Cera (Tempo)</option>
                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label className="block text-[10px] uppercase text-slate-400 mb-1">Se estiver perdendo</label>
                                                        <select value={tactics.sitLose} onChange={(e) => setTactics({...tactics, sitLose: e.target.value})} className="w-full bg-slate-900 text-xs p-2 rounded border border-slate-600 text-white">
                                                            <option value="manter">Manter</option>
                                                            <option value="pressao">Pressão Total</option>
                                                            <option value="chuveirinho">Bolas na Área</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <button 
                                    onClick={prepareMatch}
                                    className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-4 rounded-xl shadow-lg transform transition active:scale-95 flex items-center justify-center group"
                                >
                                    <PlayCircle className="mr-2 group-hover:scale-110 transition" size={24}/> SIMULAR RODADA {round}
                                </button>
                            </div>

                            {/* Coluna Direita: Visualização */}
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[400px]">
                                <div className="mb-4 text-center">
                                    <h3 className="text-white font-bold text-lg">{tactics.formation}</h3>
                                    <div className="flex justify-center gap-2 mt-1">
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 capitalize">{tactics.style}</span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 capitalize">{tactics.mentality}</span>
                                    </div>
                                </div>
                                <TacticalBoard formation={tactics.formation} />
                                
                                <div className="mt-6 w-full grid grid-cols-3 gap-2 text-center text-xs text-slate-400">
                                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                        <div className="font-bold text-white mb-1 flex justify-center items-center"><Zap size={10} className="mr-1 text-blue-400"/> ATK</div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 transition-all duration-500" style={{width: `${tactics.mentality === 'agressivo' ? '85%' : tactics.mentality === 'conservador' ? '30%' : '50%'}`}}></div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                        <div className="font-bold text-white mb-1 flex justify-center items-center"><Shield size={10} className="mr-1 text-yellow-400"/> DEF</div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-500 transition-all duration-500" style={{width: `${tactics.mentality === 'conservador' || tactics.compactness === 'alta' ? '85%' : '50%'}`}}></div>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 p-2 rounded border border-slate-800">
                                        <div className="font-bold text-white mb-1 flex justify-center items-center"><Activity size={10} className="mr-1 text-red-400"/> FIS</div>
                                        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 transition-all duration-500" style={{width: `${tactics.pressure === 'alta' ? '30%' : tactics.pressure === 'baixa' ? '90%' : '60%'}`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: PARTIDA (SIMULAÇÃO) */}
                {activeTab === 'match' && (
                    <div className="animate-fade-in max-w-2xl mx-auto">
                        {/* Placar */}
                        <div className="bg-slate-800 rounded-xl p-4 sm:p-6 text-center border border-slate-700 mb-6 shadow-2xl relative overflow-hidden">
                            <div className="flex justify-between items-center relative z-10 flex-col sm:flex-row gap-4 sm:gap-0">
                                <div className="w-full sm:w-1/3 text-center sm:text-left order-2 sm:order-1">
                                    <h2 className="font-bold text-lg sm:text-2xl text-white">SEU TIME</h2>
                                    <p className="text-xs text-slate-400">{tactics.formation}</p>
                                </div>
                                <div className="w-full sm:w-1/3 bg-slate-900/80 backdrop-blur rounded-lg p-3 border border-slate-700 order-1 sm:order-2">
                                    <div className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-widest flex justify-center items-center gap-2">
                                        {matchResult ? matchResult.user : (matchLog.filter(l => l.text.includes("GOOOL") || l.text.includes("GOL")).filter(l => l.type === 'goal').length)} 
                                        <span className="text-slate-600 text-xl sm:text-2xl mx-1">:</span> 
                                        {matchResult ? matchResult.cpu : (matchLog.filter(l => l.text.includes("GOL") || l.text.includes("Gol")).filter(l => l.type === 'bad').length)}
                                    </div>
                                    <div className="text-[10px] text-green-400 mt-1 font-bold uppercase tracking-widest">
                                        {isSimulating ? <span className="animate-pulse flex justify-center items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> AO VIVO</span> : "FIM DE JOGO"}
                                    </div>
                                </div>
                                <div className="w-full sm:w-1/3 text-center sm:text-right order-3">
                                    <h2 className="font-bold text-lg sm:text-2xl text-slate-400 truncate">{opponent ? opponent.name : 'CPU FC'}</h2>
                                    <p className="text-xs text-slate-500">Força: {opponent ? opponent.strength : '??'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Log de Eventos */}
                        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden min-h-[300px] flex flex-col">
                            <div className="bg-slate-900 p-3 border-b border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center">
                                <Activity size={14} className="mr-2" /> Relatório da Partida
                            </div>
                            <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto flex flex-col-reverse flex-1">
                                {matchLog.length === 0 && <p className="text-center text-slate-500 py-10 flex flex-col items-center gap-2"><PlayCircle size={32} className="opacity-20"/>A partida vai começar...</p>}
                                {matchLog.map((log, i) => (
                                    <div key={i} className={`text-sm p-3 rounded-lg border-l-4 animate-slide-in shadow-sm ${
                                        log.type === 'goal' ? 'bg-green-900/20 border-green-500 text-green-100' :
                                        log.type === 'bad' ? 'bg-red-900/20 border-red-500 text-red-100' :
                                        log.type === 'info' ? 'bg-blue-900/20 border-blue-500 text-blue-100' :
                                        log.type === 'miss' ? 'bg-yellow-900/20 border-yellow-500 text-yellow-100' :
                                        'bg-slate-700/30 border-slate-500 text-slate-300'
                                    }`}>
                                        <span className="font-mono font-bold mr-2 text-opacity-50 text-xs bg-black/20 px-1 rounded">{log.time}'</span>
                                        {log.text}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {!isSimulating && (
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <button onClick={() => setActiveTab('table')} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-lg font-bold transition flex justify-center items-center gap-2">
                                    <ClipboardList size={18} /> Classificação
                                </button>
                                <button onClick={() => setActiveTab('tactics')} className="flex-1 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold transition flex justify-center items-center gap-2">
                                    <ArrowRight size={18} /> Próximo Jogo
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </main>

            {/* Bottom Nav (Mobile Only) */}
            <nav className="md:hidden fixed bottom-0 w-full bg-slate-800 border-t border-slate-700 flex justify-around p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.3)]">
                <button onClick={() => setActiveTab('table')} className={`flex flex-col items-center transition ${activeTab === 'table' ? 'text-green-400' : 'text-slate-500'}`}>
                    <ClipboardList size={20} className="mb-1" /> <span className="text-[10px]">Tabela</span>
                </button>
                <button onClick={() => setActiveTab('tactics')} className={`flex flex-col items-center transition ${activeTab === 'tactics' ? 'text-green-400' : 'text-slate-500'}`}>
                    <Users size={20} className="mb-1" /> <span className="text-[10px]">Tática</span>
                </button>
                <button onClick={() => setActiveTab('match')} className={`flex flex-col items-center transition ${activeTab === 'match' ? 'text-green-400' : 'text-slate-500'}`}>
                    <Trophy size={20} className="mb-1" /> <span className="text-[10px]">Jogo</span>
                </button>
            </nav>
        </div>
    );
}