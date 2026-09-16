export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string | string[];
  category: "ADHD e neurodivergenze" | "Adolescenti e giovani adulti" | "Genitorialità e scuola" | "Ansia, autostima e relazioni" | "Psicologia e benessere";
  date: string;
  readTime: string;
  author: string;
  image?: string;
}

export const blogCategories = [
  "Tutte le categorie",
  "ADHD e neurodivergenze",
  "Adolescenti e giovani adulti",
  "Genitorialità e scuola",
  "Ansia, autostima e relazioni",
  "Psicologia e benessere",
] as const;

export const blogPosts: BlogPost[] = [
  {
    slug: "adhd-negli-adulti-non-e-mancanza-di-volonta",
    title: "ADHD negli adulti: quando la difficoltà non è mancanza di volontà",
    excerpt: "Spesso considerata solo una condizione infantile, la neurodivergenza da deficit di attenzione negli adulti viene scambiata per disattenzione o pigrizia. Comprendere il funzionamento neurobiologico è il primo passo per liberarsi dal senso di colpa.",
    category: "ADHD e neurodivergenze",
    date: "28 Febbraio 2026",
    readTime: "5 min di lettura",
    author: "Dott.ssa Giovanna Padalino",
    content: [
      "Quante volte ti sei sentito ripetere — o hai ripetuto a te stesso — frasi come: 'Se solo ti impegnassi di più', 'Hai mille idee ma non ne porti a termine una', 'Ti distrai con niente'? Nel mondo adulto, la neurodivergenza attentiva viene troppo spesso confusa con una carenza di disciplina o di forza di volontà.",
      "In realtà, il cervello con funzionamento ADHD processa gli stimoli e la dopamina in modo differente: non manca l'attenzione, manca la capacità di regolarla in modo uniforme in assenza di forte interesse o urgenza. Questo porta a cicli di iperfocalizzazione alternati a stanchezza cronica e sensazione di sopraffazione.",
      "Nel mio lavoro clinico a Bologna e nei percorsi online, osservo costantemente il sollievo che nasce nel momento in cui una persona scopre che le proprie difficoltà non derivano da un difetto di carattere. Dare un nome al proprio funzionamento permette di costruire strategie concrete su misura, valorizzando la creatività, l'intuizione e il pensiero divergente.",
      "Come nella metafora del Kintsugi, non dobbiamo forzarci a rientrare in stampi rigidi pensati per menti neurotipiche. Si tratta piuttosto di accogliere le nostre particolarità, dotandosi di strumenti funzionali e di un ambiente che rispetti i nostri ritmi naturali."
    ]
  },
  {
    slug: "mio-figlio-non-si-impegna-o-sta-facendo-fatica",
    title: "Mio figlio non si impegna o sta facendo fatica? Come distinguere pigrizia, difficoltà e sovraccarico",
    excerpt: "Dietro il rifiuto di fare i compiti o i continui cali di rendimento scolastico si nascondono spesso fatiche attentive, difficoltà evolutive o sovraccarico emotivo. Come aiutare genitori e scuola a osservare oltre l'apparenza.",
    category: "Genitorialità e scuola",
    date: "14 Febbraio 2026",
    readTime: "6 min di lettura",
    author: "Dott.ssa Giovanna Padalino",
    content: [
      "Nelle riunioni tra genitori e insegnanti, l'etichetta di 'pigro' o 'svogliato' è una delle più frequenti e, purtroppo, tra le più dannose. Nessun bambino o ragazzo sceglie volontariamente di sentirsi inadeguato o di fallire davanti ai propri compagni.",
      "La mia esperienza pluriennale come educatrice scolastica specializzata e Tecnico ABA mi ha insegnato che quando un alunno evita un compito, non sta fuggendo dallo sforzo in sé, ma dall'angoscia di non riuscire o dalla fatica insostenibile richiesta dalle sue funzioni esecutive.",
      "I disturbi evolutivi specifici (DSA), l'ADHD, ma anche stati ansiosi legati al clima scolastico, possono manifestarsi attraverso comportamenti di opposizione, lentezza esasperante o isolamento. Distinguere la reale difficoltà dal capriccio richiede un'osservazione sistematica e non giudicante dei contesti.",
      "Costruire un'alleanza solida tra famiglia, scuola ed équipe specialistica è la chiave per restituire al ragazzo la fiducia in se stesso, passando dalla logica della colpa a quella della comprensione condivisa."
    ]
  },
  {
    slug: "quando-autostima-si-costruisce-sul-confronto",
    title: "Quando l'autostima si costruisce sul confronto con gli altri",
    excerpt: "Tra aspettative sociali e modelli irraggiungibili, misurare il proprio valore guardando i successi altrui alimenta un senso perenne di inadeguatezza. Riscoprire le proprie risorse attraverso uno sguardo più autentico e compassionevole.",
    category: "Ansia, autostima e relazioni",
    date: "2 Febbraio 2026",
    readTime: "4 min di lettura",
    author: "Dott.ssa Giovanna Padalino",
    content: [
      "Viviamo in una società che premia la performance visibile e la costante ostentazione del successo. Per molti giovani adulti e professionisti, questo si traduce in un giudice interiore inflessibile, pronto a paragonare il proprio retroscena quotidiano con la vetrina scintillante degli altri.",
      "Il risultato è una sensazione sotterranea di sindrome dell'impostore, dove nessun traguardo sembra mai abbastanza e l'ansia anticipatoria guida ogni scelta.",
      "Nel percorso psicologico impariamo a disinnescare la trappola del confronto. Il valore personale non è una classifica: ognuno porta con sé una storia stratificata, ferite risanate e risorse uniche.",
      "Utilizzo spesso la scrittura riflessiva e le metafore narrative per aiutare la persona a riappropriarsi della propria voce autentica, imparando a misurare i propri passi in relazione ai propri desideri e non alle proiezioni del mondo esterno."
    ]
  },
  {
    slug: "adolescenti-e-ritiro-sociale-ascoltare-il-silenzio",
    title: "Adolescenti e chiusura relazionale: dare spazio alle emozioni senza forzature",
    excerpt: "L'adolescenza è una terra di confine complessa. Quando un ragazzo si chiude nella propria stanza o manifesta rabbia improvvisa, è fondamentale saper leggere il silenzio come una richiesta di protezione e di ascolto profondo.",
    category: "Adolescenti e giovani adulti",
    date: "18 Gennaio 2026",
    readTime: "5 min di lettura",
    author: "Dott.ssa Giovanna Padalino",
    content: [
      "Il passaggio dall'infanzia all'età adulta comporta una ridefinizione radicale del proprio sé e delle relazioni familiari. Spesso i genitori si trovano spiazzati di fronte a un figlio che improvvisamente si allontana, risponde a monosillabi o sembra respingere ogni tentativo di vicinanza.",
      "La chiusura e la rabbia non sono necessariamente manifestazioni di ostilità: frequentemente sono l'unica corazza che un adolescente trova per difendere una vulnerabilità che sente troppo fragile per essere esposta.",
      "Integro nel colloquio con i ragazzi canali espressivi differenti, dalle metafore del cinema alla musica, per facilitare l'espressione di emozioni che a parole faticherebbero a emergere.",
      "Aiutare l'adolescente significa offrirgli uno spazio neutro, confidenziale e non giudicante in cui sperimentare chi è veramente, lontano dalle pressioni del rendimento e del giudizio."
    ]
  },
  {
    slug: "l-arte-del-kintsugi-emotivo-dare-valore-alle-crepe",
    title: "L'arte del Kintsugi emotivo: dare valore alle proprie crepe per ritrovare equilibrio",
    excerpt: "La metafora dell'antica arte giapponese ci insegna che le ferite della vita non vanno nascoste né cancellate, ma valorizzate come testimonianza di resilienza e trasformazione autentica.",
    category: "Psicologia e benessere",
    date: "5 Gennaio 2026",
    readTime: "4 min di lettura",
    author: "Dott.ssa Giovanna Padalino",
    content: [
      "Nella cultura occidentale siamo abituati a considerare un oggetto rotto come privo di valore, qualcosa da scartare o riparare nascondendo con cura la linea di frattura.",
      "La saggezza orientale del Kintsugi ribalta completamente questa prospettiva: le stoviglie spezzate vengono ricongiunte con lacca urushi e polvere d'oro purissimo. La crepa non è più una vergogna da celare, ma diventa la parte più preziosa, luminosa e caratterizzante dell'opera.",
      "In ambito psicologico accade lo stesso. Le esperienze di sofferenza, i lutti, i fallimenti scolastici o lavorativi e le crisi relazionali non ci rendono 'difettosi'. Fanno parte della nostra storia.",
      "Quando impariamo a non vergognarci delle nostre crepe, possiamo riempirle di significato e consapevolezza. Il mio obiettivo terapeutico è camminare al tuo fianco in questo processo di cura, affinché tu possa scoprire che le tue fragilità sono il terreno più fertile per una rinascita autentica."
    ]
  }
];
