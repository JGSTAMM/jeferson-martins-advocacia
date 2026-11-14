export interface BookLink {
  label: string;
  format: 'Impresso' | 'E-book';
  url: string;
  linklistId: string;
}

export interface PublishedBook {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  category: string;
  publisher: string;
  year: string;
  pages?: string;
  isbnPrinted?: string;
  isbnEbook?: string;
  coverTone: 'crimson' | 'obsidian' | 'gold';
  synopsis: string;
  highlights: string[];
  links: BookLink[];
}

export interface PracticeArea {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  summary: string;
  details: string[];
  whatsappText: string;
  iconName: 'scale' | 'heart-pulse' | 'users' | 'landmark';
}

export interface ServiceComparisonRow {
  modality: string;
  scope: string;
  coverage: string;
  initialResponse: string;
  audience: string;
}

export interface AcademicCredential {
  period: string;
  title: string;
  institution: string;
  focus: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleData {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  readingTime: string;
  excerpt: string;
  keyTakeaways: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    subheadings?: {
      heading: string;
      paragraphs: string[];
    }[];
  }[];
  comparisonTable: {
    headers: string[];
    rows: string[][];
  };
  faq: FaqItem[];
}

export const SITE_CONFIG = {
  brandName: 'Jeferson Gonçalves Martins Advocacia',
  shortBrandName: 'Jeferson Martins | Advocacia',
  lawyerName: 'Jeferson Gonçalves Martins',
  displayName: 'Jeferson Martins',
  oab: 'OAB/SC 75.973',
  oabNumeric: '75973',
  roleSummary: 'Advogado (OAB/SC 75.973), Pesquisador e Escritor',
  phoneDisplay: '+55 48 92001-7268',
  phoneRaw: '5548920017268',
  whatsappUrl: 'https://wa.me/5548920017268?text=Ol%C3%A1%2C%20Dr.%20Jeferson%20Martins!%20Gostaria%20de%20agendar%20um%20atendimento%20jur%C3%ADdico.',
  telUrl: 'tel:+5548920017268',
  instagramUrl: 'https://www.instagram.com/jefmartinss/',
  instagramHandle: '@jefmartinss',
  threadsUrl: 'https://www.threads.net/@jefmartinss',
  linklistUrl: 'https://linklist.ai/jefmartinss',
  vcardUrl: '/jeferson-martins.vcf',
  city: 'Passo de Torres',
  state: 'SC',
  stateName: 'Santa Catarina',
  country: 'BR',
  countryName: 'Brasil',
  postalCode: '88980-000',
  openingHoursLabel: 'Aberta 24 horas',
  latitude: -29.3175,
  longitude: -49.7197,
  googleMapsUrl: 'https://maps.google.com/?q=Passo+de+Torres,+SC,+88980-000,+Brasil',
  creatorName: 'Pixirica Tecnologias',
  creatorSignature: 'Desenvolvido com excelência por Pixirica Tecnologias',
  defaultSiteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'https://jefersonmartinsadvocacia.vercel.app'),
} as const;

export const PAGE_METADATA = {
  home: {
    title: 'Jeferson Martins Advocacia | Advogado Passo de Torres SC',
    description:
      'Advogado em Passo de Torres, SC (OAB/SC 75.973) e Mestrando em Direito. Especialista em Direito das Famílias, Sucessões, Saúde, Civil e Público 24h.',
  },
  bio: {
    title: 'Jeferson Martins | Links, Livros e Advocacia OAB/SC 75973',
    description:
      'Acesse os links oficiais, livros publicados e atendimento jurídico 24h do advogado e escritor Jeferson Gonçalves Martins (OAB/SC 75.973) em SC.',
  },
} as const;

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'familias-sucessoes',
    title: 'Direito das Famílias e Sucessões',
    shortTitle: 'Famílias & Sucessões',
    badge: 'Especialista ABDConst',
    iconName: 'users',
    summary:
      'Atuação estratégica e humanizada em inventários judiciais e extrajudiciais, divórcios, guarda, pensão alimentícia, união estável e planejamento sucessório.',
    details: [
      'Inventário e partilha de bens com foco em agilidade e redução de conflitos patrimoniais',
      'Planejamento sucessório, testamentos e diretivas patrimoniais preventivas',
      'Guarda, convivência familiar, revisão de alimentos e reconhecimento de união estável',
    ],
    whatsappText:
      'Olá, Dr. Jeferson! Preciso de orientação jurídica em Direito das Famílias e Sucessões.',
  },
  {
    id: 'saude-biodireito',
    title: 'Direito Médico, Saúde e Biodireito Constitucional',
    shortTitle: 'Saúde & Biodireito',
    badge: 'Pós-Graduado & Autor',
    iconName: 'heart-pulse',
    summary:
      'Defesa firme do direito à saúde e à dignidade humana: liminares para medicamentos de alto custo, cirurgias, exames, home care e testamentos vitais.',
    details: [
      'Tutelas de urgência contra negativas abusivas de planos de saúde e entes públicos (SUS)',
      'Assessoria em Diretivas Antecipadas de Vontade (Testamento Vital) e autonomia do paciente',
      'Atuação baseada em pesquisa constitucional aprofundada sobre bioética e direitos fundamentais',
    ],
    whatsappText:
      'Olá, Dr. Jeferson! Gostaria de atendimento urgente sobre Direito à Saúde ou Biodireito.',
  },
  {
    id: 'civil-processo',
    title: 'Direito Civil e Processo Civil Estratégico',
    shortTitle: 'Civil & Contratos',
    badge: 'Pós-Graduado em Processo Civil',
    iconName: 'scale',
    summary:
      'Consultoria contratual, responsabilidade civil, indenizações, proteção patrimonial e condução técnica de demandas judiciais em primeira e segunda instâncias.',
    details: [
      'Elaboração, revisão e rescisão segura de contratos civis, imobiliários e empresariais',
      'Ações indenizatórias por danos materiais e morais com rigor probatório',
      'Recursos cíveis, cumprimento de sentença e defesa processual técnica',
    ],
    whatsappText:
      'Olá, Dr. Jeferson! Preciso de consultoria em Direito Civil, Contratos ou Processo Civil.',
  },
  {
    id: 'publico-eleitoral',
    title: 'Direito Público, Constitucional e Eleitoral',
    shortTitle: 'Público & Eleitoral',
    badge: 'Mestrando em Direitos Humanos',
    iconName: 'landmark',
    summary:
      'Assessoria jurídica para cidadãos, agentes públicos e candidaturas em demandas administrativas, concursos públicos, improbidade e direito eleitoral.',
    details: [
      'Mandados de segurança e controle de legalidade de atos administrativos',
      'Consultoria em Direito Eleitoral, prestação de contas e elegibilidade',
      'Pareceres jurídico-constitucionais fundamentados em direitos humanos e garantias fundamentais',
    ],
    whatsappText:
      'Olá, Dr. Jeferson! Gostaria de conversar sobre uma demanda de Direito Público ou Eleitoral.',
  },
];

export const SERVICE_COMPARISON_TABLE: ServiceComparisonRow[] = [
  {
    modality: 'Plantão Jurídico & Urgências 24h',
    scope: 'Tutelas de urgência em saúde, liminares, bloqueios e medidas protetivas imediatas',
    coverage: 'Passo de Torres, SC, Litoral Norte RS e PJe Nacional',
    initialResponse: 'Atendimento imediato via WhatsApp',
    audience: 'Pacientes, famílias e demandas inadiáveis',
  },
  {
    modality: 'Advocacia em Famílias e Sucessões',
    scope: 'Inventários, divórcios, pensão, guarda, partilha e planejamento sucessório',
    coverage: 'Extrajudicial (cartórios) e Judicial em todo o Brasil',
    initialResponse: 'Diagnóstico em até 24h úteis',
    audience: 'Famílias, herdeiros e cônjuges',
  },
  {
    modality: 'Consultoria Cível, Contratual & Pareceres',
    scope: 'Análise de riscos, contratos, testamento vital e responsabilidade civil',
    coverage: 'Presencial em Passo de Torres ou 100% digital',
    initialResponse: 'Parecer estruturado em prazo acordado',
    audience: 'Pessoas físicas, profissionais e empresas',
  },
  {
    modality: 'Direito Público & Eleitoral',
    scope: 'Defesas administrativas, mandados de segurança e assessoria eleitoral',
    coverage: 'Santa Catarina, Rio Grande do Sul e Tribunais Superiores',
    initialResponse: 'Análise preliminar no mesmo dia',
    audience: 'Servidores, candidatos e cidadãos',
  },
];

export const ACADEMIC_CREDENTIALS: AcademicCredential[] = [
  {
    period: 'Em andamento',
    title: 'Mestrando em Direito — Direitos Humanos e Constitucionalismo',
    institution: 'UNESC — Programa de Pós-Graduação em Direito (PPGD)',
    focus: 'Pesquisa avançada em direitos fundamentais, bioética, hermenêutica constitucional e dignidade humana.',
  },
  {
    period: 'Especialização Concluída',
    title: 'Especialista em Direito das Famílias e Sucessões',
    institution: 'ABDConst — Academia Brasileira de Direito Constitucional',
    focus: 'Planejamento patrimonial familiar, inventários, autonomia privada e relações sucessórias contemporâneas.',
  },
  {
    period: 'Pós-Graduações Latos Sensu',
    title: 'Direito Processual Civil, Direito Médico e Direito Eleitoral',
    institution: 'Formação Especializada Multidisciplinar',
    focus: 'Domínio técnico do rito processual civil, judicialização da saúde, bioética clínica e legislação eleitoral.',
  },
  {
    period: 'Formação Humanística e Econômica',
    title: 'Bacharel em Direito (UNESC) e Graduando em História (UNIVALI) e Ciências Econômicas (UNISUL)',
    institution: 'UNESC • UNIVALI • UNISUL',
    focus: 'Visão interdisciplinar que une rigor jurídico, compreensão histórica institucional e análise econômico-patrimonial.',
  },
];

export const PUBLISHED_BOOKS: PublishedBook[] = [
  {
    id: 'morte-digna',
    title: 'Ensaios Jurídico-Constitucionais sobre Morte Digna, Eutanásia e Decisões de Fim de Vida',
    shortTitle: 'Morte Digna & Biodireito',
    subtitle: 'Bioética, Hermenêutica Constitucional e Testamento Vital',
    category: 'Obra Jurídica',
    publisher: 'Editora Dialética',
    year: '2026',
    coverTone: 'crimson',
    synopsis:
      'Obra acadêmica estruturada em dois ensaios constitucionais que investigam a colisão entre o direito à vida, a dignidade da pessoa humana e a autonomia privada, analisando a eutanásia ativa voluntária e a validade jurídica do testamento vital diante de conflitos familiares.',
    highlights: [
      'Teoria dos limites dos limites dos direitos fundamentais aplicada ao Biodireito',
      'Análise constitucional das Diretivas Antecipadas de Vontade (Testamento Vital)',
      'Referência para juristas, profissionais da saúde e pesquisadores de bioética',
    ],
    links: [
      {
        label: 'Adquirir Obra (Link Oficial)',
        format: 'Impresso',
        url: 'https://linklist.ai/jvdwwap-v7',
        linklistId: '2649959',
      },
    ],
  },
  {
    id: 'autobiografia-uri',
    title: 'A Autobiografia de Uri',
    shortTitle: 'A Autobiografia de Uri',
    subtitle: 'Ficção & Drama Psicológico sobre Poder, Verdade e Família',
    category: 'Romance / Drama',
    publisher: 'Editora Dialética (Selo Dialética Literária)',
    year: '2022',
    pages: '124 páginas',
    isbnPrinted: '978-6553550865',
    isbnEbook: '978-6553550827',
    coverTone: 'obsidian',
    synopsis:
      'Uri Mendes enfrenta disputas de poder dentro de uma empresa familiar enquanto tenta desvendar os grandes mistérios de sua história: a morte do irmão, os motivos por trás da perda da mãe e o desaparecimento do pai que nunca chegou a conhecer.',
    highlights: [
      'Explora dualidades humanas profundas entre verdade e mentira, amor e poder',
      'Publicado pelo selo Dialética Literária com edição impressa e digital (ISBN oficial)',
      'Narrativa envolvente sobre laços familiares, luto e reconstrução de identidade',
    ],
    links: [
      {
        label: 'A Autobiografia de Uri (Impresso)',
        format: 'Impresso',
        url: 'https://linklist.ai/pxUa1dth4p',
        linklistId: '1087459',
      },
      {
        label: 'A Autobiografia de Uri (e-book)',
        format: 'E-book',
        url: 'https://linklist.ai/ed4sivfcwi',
        linklistId: '1579795',
      },
    ],
  },
  {
    id: 'inacabavelmente-confuso',
    title: 'Inacabavelmente Confuso',
    shortTitle: 'Inacabavelmente Confuso',
    subtitle: 'Poesia Contemporânea sobre Sentimentos e Travessias',
    category: 'Poesia',
    publisher: 'Produção Independente / UICLAP',
    year: '2023',
    coverTone: 'gold',
    synopsis:
      'Coletânea poética que reúne versos compostos pelo autor desde os 15 anos de idade, transformando inquietações cotidianas, amor, paixão, medo, alegria e insegurança em literatura sensível e reflexiva.',
    highlights: [
      'Poemas escritos ao longo de anos de amadurecimento pessoal e intelectual',
      'Disponível em edição física sob demanda e formato e-book digital',
      'Expressão literária complementar à trajetória jurídica e humanística do autor',
    ],
    links: [
      {
        label: 'Inacabavelmente Confuso (Impresso)',
        format: 'Impresso',
        url: 'https://linklist.ai/tt2az12yrl',
        linklistId: '1579798',
      },
      {
        label: 'Inacabavelmente Confuso (e-book)',
        format: 'E-book',
        url: 'https://linklist.ai/frx8rsrbsm',
        linklistId: '1579800',
      },
    ],
  },
];

// Todos os 5 links oficiais preservados exatamente do perfil https://linklist.ai/jefmartinss
export const BIO_OFFICIAL_BOOK_LINKS = [
  {
    id: '2649959',
    title: 'Ensaios Jurídico-Constitucionais sobre Morte Digna, Eutanásia e Decisões de Fim de Vida',
    tag: 'Lançamento Jurídico • Editora Dialética',
    format: 'Livro Jurídico',
    url: 'https://linklist.ai/jvdwwap-v7',
    tone: 'crimson' as const,
  },
  {
    id: '1579800',
    title: 'Inacabavelmente Confuso (e-book)',
    tag: 'Poesia • Leitura Digital Instantânea',
    format: 'E-book',
    url: 'https://linklist.ai/frx8rsrbsm',
    tone: 'gold' as const,
  },
  {
    id: '1579798',
    title: 'Inacabavelmente Confuso',
    tag: 'Poesia • Edição Física Impressa',
    format: 'Livro Impresso',
    url: 'https://linklist.ai/tt2az12yrl',
    tone: 'gold' as const,
  },
  {
    id: '1087459',
    title: 'A Autobiografia de Uri',
    tag: 'Ficção & Drama • Editora Dialética (124 pág.)',
    format: 'Livro Impresso',
    url: 'https://linklist.ai/pxUa1dth4p',
    tone: 'obsidian' as const,
  },
  {
    id: '1579795',
    title: 'A Autobiografia de Uri (e-book)',
    tag: 'Ficção & Drama • Edição Digital',
    format: 'E-book',
    url: 'https://linklist.ai/ed4sivfcwi',
    tone: 'obsidian' as const,
  },
];

export const HOME_FAQ: FaqItem[] = [
  {
    question: 'Como funciona o atendimento jurídico 24 horas em Passo de Torres e região?',
    answer:
      'O escritório do Dr. Jeferson Gonçalves Martins (OAB/SC 75.973) realiza atendimento presencial mediante agendamento em Passo de Torres (SC) e plantão digital 24 horas via WhatsApp (+55 48 92001-7268) para urgências médicas, liminares, prisões, medidas protetivas e consultorias em todo o Brasil.',
  },
  {
    question: 'O advogado atende apenas em Passo de Torres ou em outras cidades e estados?',
    answer:
      'Embora a sede esteja localizada em Passo de Torres (SC, CEP 88980-000), na divisa com Torres (RS), a advocacia atua de forma presencial no Sul de Santa Catarina e Litoral Norte do Rio Grande do Sul, além de atuar integralmente por meio do Processo Judicial Eletrônico (PJe/eproc) em todo o território nacional.',
  },
  {
    question: 'Quais documentos são necessários para iniciar um inventário ou divórcio?',
    answer:
      'De forma inicial, são solicitados documentos pessoais das partes (RG, CPF, certidão de casamento ou nascimento), certidão de óbito (no caso de inventário) e relação básica dos bens e eventuais dívidas. Na primeira consulta, o escritório entrega um checklist personalizado para agilizar a via extrajudicial ou judicial.',
  },
  {
    question: 'É possível obter medicamentos de alto custo ou cirurgias negadas pelo plano de saúde com rapidez?',
    answer:
      'Sim. Com laudo médico detalhado comprovando a necessidade e a urgência do tratamento, é possível ingressar com ação judicial com pedido de tutela de urgência (liminar), buscando decisão célere para obrigar o plano de saúde ou o Poder Público (SUS) a custear o procedimento ou medicamento.',
  },
  {
    question: 'O que é o Testamento Vital e ele tem validade jurídica no Brasil?',
    answer:
      'O Testamento Vital (Diretivas Antecipadas de Vontade) é o documento em que a pessoa capaz manifesta previamente quais tratamentos médicos aceita ou recusa caso não possa expressar sua vontade no futuro. Fundamentado na dignidade da pessoa humana e na Resolução CFM 1.995/2012, possui sólida proteção constitucional, tema aprofundado na obra jurídica publicada pelo Dr. Jeferson Martins.',
  },
  {
    question: 'Onde comprar os livros escritos pelo Dr. Jeferson Gonçalves Martins?',
    answer:
      'Todas as obras — "Ensaios Jurídico-Constitucionais sobre Morte Digna, Eutanásia e Decisões de Fim de Vida", "A Autobiografia de Uri" e "Inacabavelmente Confuso" — estão disponíveis tanto na página oficial de Link na Bio (/bio) quanto na seção de Obras Publicadas da página inicial, em formatos impresso e e-book.',
  },
];

export const BIO_FAQ: FaqItem[] = [
  {
    question: 'Os links desta página são os mesmos do linklist.ai/jefmartinss?',
    answer:
      'Sim. Esta página /bio reúne integralmente os 5 links oficiais das obras publicadas que constam no Linklist oficial do Dr. Jeferson Martins, adicionando acesso direto ao WhatsApp 24h, cartão de contato vCard e site institucional.',
  },
  {
    question: 'Como falar diretamente com o Dr. Jeferson Martins para uma consulta?',
    answer:
      'Basta clicar no botão "Atendimento Jurídico 24h (WhatsApp)" nesta página ou enviar mensagem para +55 48 92001-7268 informando brevemente o seu caso.',
  },
  {
    question: 'Qual é o número da OAB e a localização do escritório?',
    answer:
      'O Dr. Jeferson Gonçalves Martins está inscrito sob a OAB/SC 75.973, com escritório sediado em Passo de Torres, Santa Catarina (CEP 88980-000), atendendo presencialmente na região e online em todo o Brasil.',
  },
];

export const ARTICLES: ArticleData[] = [
  {
    slug: 'testamento-vital-diretrizes-antecipadas-vontade-biodireito',
    seoTitle: 'Testamento Vital e Biodireito | Jeferson Martins Advogado',
    seoDescription:
      'Entenda a validade jurídica do testamento vital, diretrizes antecipadas de vontade e autonomia privada sob a ótica do Biodireito Constitucional.',
    h1: 'Testamento Vital e Diretrizes Antecipadas de Vontade no Biodireito Constitucional',
    category: 'Biodireito & Direito Médico',
    publishedAt: '2026-09-15',
    updatedAt: '2026-11-10',
    readingTime: '6 min de leitura',
    excerpt:
      'Análise constitucional sobre a eficácia do testamento vital, a primazia da autonomia privada do paciente e os limites de intervenção familiar em decisões de fim de vida.',
    keyTakeaways: [
      'Fundamento constitucional direto no princípio da dignidade da pessoa humana (art. 1º, III, CF/88) e na autonomia privada',
      'Diferença prática entre Testamento Vital, Mandato Duradouro e procuração para cuidados de saúde',
      'Proteção da vontade prévia do paciente mesmo diante de eventual divergência entre familiares',
      'Segurança jurídica para médicos, hospitais e famílias por meio de registro formal adequado',
    ],
    sections: [
      {
        heading: 'Fundamentos Constitucionais da Autonomia em Fim de Vida',
        paragraphs: [
          'O debate contemporâneo sobre morte digna e decisões de fim de vida exige o equilíbrio rigoroso entre a proteção do direito à vida e o respeito à autonomia existencial do indivíduo. Sob a perspectiva do Biodireito Constitucional, a vida tutelada pela Constituição Federal de 1988 não se reduz à dimensão puramente biológica, mas compreende a existência digna segundo os valores do próprio titular.',
          'Nesse cenário, as Diretivas Antecipadas de Vontade — popularmente conhecidas como Testamento Vital — consolidam-se como instrumento legítimo para que a pessoa capaz registre, de maneira lúcida e informada, quais tratamentos invasivos ou medidas de suporte artificial deseja aceitar ou recusar diante de quadro clínico terminal e irreversível.',
        ],
        subheadings: [
          {
            heading: 'Validade Jurídica e Conflitos Familiares',
            paragraphs: [
              'Uma das dúvidas mais frequentes na prática médica e jurídica diz respeito à possibilidade de familiares contestarem ou anularem as diretivas deixadas pelo paciente. Conforme desenvolvido na obra "Ensaios Jurídico-Constitucionais sobre Morte Digna, Eutanásia e Decisões de Fim de Vida", a vontade prévia expressa por pessoa plenamente capaz possui primazia jurídica e ética, não podendo ser arbitrariamente substituída por terceiros sem vício de consentimento.',
            ],
          },
        ],
      },
      {
        heading: 'Como Formalizar o Testamento Vital com Segurança Jurídica',
        paragraphs: [
          'Embora a legislação brasileira ainda não disponha de um código único específico para o tema, a conjugação da Constituição Federal, do Código Civil (art. 15) e da Resolução CFM nº 1.995/2012 confere plena operatividade ao documento. A lavratura por escritura pública em Tabelionato de Notas, precedida de orientação jurídica especializada e diálogo com médico assistente, maximiza a força probatória do ato.',
        ],
      },
    ],
    comparisonTable: {
      headers: ['Instrumento', 'Finalidade Principal', 'Forma Recomendada', 'Momento de Produção de Efeitos'],
      rows: [
        [
          'Testamento Vital',
          'Aceitação ou recusa prévia de tratamentos e cuidados médicos',
          'Escritura pública ou termo assinado com testemunhas e laudo',
          'Quando o paciente perde a capacidade de expressar vontade',
        ],
        [
          'Mandato Duradouro',
          'Nomeação de procurador de confiança para decidir pelo paciente',
          'Instrumento público ou particular específico de saúde',
          'Durante incapacidade temporária ou definitiva do outorgante',
        ],
        [
          'Testamento Patrimonial',
          'Destinação de bens e disposições patrimoniais pós-morte',
          'Testamento público, cerrado ou particular (Código Civil)',
          'Após o falecimento do testador',
        ],
      ],
    },
    faq: [
      {
        question: 'Posso alterar ou revogar meu testamento vital depois de pronto?',
        answer:
          'Sim. Por ser um ato personalíssimo e ligado à autonomia existencial, o testamento vital pode ser alterado ou revogado a qualquer momento, bastando que o declarante esteja em pleno gozo de suas faculdades mentais.',
      },
      {
        question: 'Qual a diferença entre ortotanásia, eutanásia e testamento vital?',
        answer:
          'A ortotanásia consiste na não utilização de meios artificiais desproporcionais para prolongar artificialmente o processo de morte natural (permitida e amparada pelo testamento vital). A eutanásia envolve intervenção ativa para abreviar a vida, tema discutido no plano teórico-constitucional e distinto dos cuidados paliativos previstos nas diretivas antecipadas.',
      },
    ],
  },
  {
    slug: 'planejamento-sucessorio-inventario-direito-familias',
    seoTitle: 'Inventário e Direito das Famílias | Dr. Jeferson Martins',
    seoDescription:
      'Guia completo sobre inventário extrajudicial, partilha de bens e planejamento sucessório familiar com segurança jurídica em Santa Catarina e Brasil.',
    h1: 'Inventário Extrajudicial, Partilha de Bens e Planejamento Sucessório Familiar',
    category: 'Direito das Famílias e Sucessões',
    publishedAt: '2026-09-28',
    updatedAt: '2026-11-10',
    readingTime: '5 min de leitura',
    excerpt:
      'Como escolher entre inventário em cartório ou judicial, evitar multas tributárias de ITCMD e estruturar o patrimônio familiar com previsibilidade.',
    keyTakeaways: [
      'Prazo legal de 60 dias a partir do óbito para abertura do inventário sem incidência de multas estaduais',
      'Possibilidade de inventário extrajudicial ágil em Cartório de Notas quando há consenso e acompanhamento de advogado',
      'Ferramentas lícitas de planejamento sucessório que evitam litígios longos entre herdeiros',
      'Atuação estratégica em Santa Catarina e Rio Grande do Sul com cálculo tributário prévio',
    ],
    sections: [
      {
        heading: 'Inventário Extrajudicial vs. Inventário Judicial: Qual Escolher?',
        paragraphs: [
          'Após o falecimento de um familiar, a regularização do patrimônio exige atenção imediata aos prazos legais e à harmonia entre os sucessores. Quando há consenso quanto à partilha de bens, a via extrajudicial em Tabelionato de Notas oferece conclusão em uma fração do tempo de um processo judicial tradicional, sempre com a assistência obrigatória de advogado.',
          'Já nos casos em que existe divergência entre herdeiros, bens litigiosos ou necessidade de alvarás específicos mais complexos, o inventário judicial conduzido de forma técnica garante a preservação do patrimônio e a definição segura das cotas hereditárias.',
        ],
      },
      {
        heading: 'Planejamento Sucessório Preventivo e Economia Patrimonial',
        paragraphs: [
          'Planejar a sucessão em vida não significa abrir mão do controle sobre os próprios bens. Por meio de doações com reserva de usufruto, testamentos bem redigidos, pactos antenupciais e estruturação societária familiar, é possível reduzir drasticamente custos futuros e proteger os vínculos afetivos contra disputas desgastantes.',
        ],
      },
    ],
    comparisonTable: {
      headers: ['Modalidade', 'Requisitos Principais', 'Prazo Médio Estimado', 'Custo e Tributação'],
      rows: [
        [
          'Inventário Extrajudicial',
          'Consenso entre os herdeiros e assistência de advogado',
          '30 a 90 dias após documentação completa',
          'ITCMD estadual + emolumentos de cartório',
        ],
        [
          'Inventário Judicial Consensual',
          'Acordo entre as partes com homologação judicial',
          '6 a 14 meses conforme comarca',
          'ITCMD + custas processuais judiciais',
        ],
        [
          'Inventário Judicial Litigioso',
          'Divergência na partilha ou contestação de bens',
          '18 meses ou mais conforme complexidade',
          'ITCMD + custas + eventuais perícias',
        ],
      ],
    },
    faq: [
      {
        question: 'É obrigatório contratar advogado para fazer inventário em cartório?',
        answer:
          'Sim. A lei exige a participação de advogado ou defensor público na escritura pública de inventário e partilha para garantir a legalidade dos cálculos, da meação e dos quinhões hereditários.',
      },
      {
        question: 'O que acontece se o inventário não for aberto em 60 dias?',
        answer:
          'A legislação tributária estadual (como em SC e RS) prevê a aplicação de multa progressiva sobre o valor do ITCMD (Imposto de Transmissão Causa Mortis e Doação), encarecendo a regularização dos bens.',
      },
    ],
  },
  {
    slug: 'direito-saude-fornecimento-medicamentos-tratamentos',
    seoTitle: 'Direito à Saúde e Medicamentos | Jeferson Martins OAB/SC',
    seoDescription:
      'Saiba como garantir judicialmente medicamentos de alto custo, cirurgias e tratamentos médicos negados por planos de saúde ou pelo SUS no Brasil.',
    h1: 'Direito à Saúde: Como Garantir Medicamentos, Cirurgias e Tratamentos Negados',
    category: 'Direito Médico e da Saúde',
    publishedAt: '2026-10-12',
    updatedAt: '2026-11-10',
    readingTime: '5 min de leitura',
    excerpt:
      'Entenda os requisitos probatórios para obter decisões liminares rápidas contra negativas de cobertura por operadoras de planos de saúde e entes públicos.',
    keyTakeaways: [
      'A negativa de procedimento prescrito pelo médico assistente pode ser abusiva e reversível via tutela de urgência',
      'Importância central do relatório médico circunstanciado demonstrando a imprescindibilidade e urgência clínica',
      'Possibilidade de pedido de multa diária e bloqueio de valores em caso de descumprimento pela operadora ou ente público',
      'Atendimento de plantão 24 horas para casos médicos urgentes em Santa Catarina e todo o Brasil',
    ],
    sections: [
      {
        heading: 'Quando a Negativa do Plano de Saúde ou do SUS é Ilegal?',
        paragraphs: [
          'É comum que pacientes em situação de vulnerabilidade recebam negativas sob a justificativa de que determinado medicamento ou exame "não consta no rol da ANS", possui uso off-label ou tem alto custo. Contudo, a jurisprudência consolidada dos tribunais brasileiros reconhece que a operadora de saúde não pode substituir a indicação técnica do médico assistente quando há comprovação científica e ausência de alternativa terapêutica equivalente.',
          'Da mesma maneira, o fornecimento de fármacos de alto custo pelo Sistema Único de Saúde (SUS) obedece a critérios definidos pelos Tribunais Superiores, exigindo petição tecnicamente instruída para evitar indeferimentos processuais.',
        ],
      },
      {
        heading: 'Checklist Documental para Pedido de Liminar em Saúde',
        paragraphs: [
          'A velocidade da concessão de uma liminar (tutela provisória de urgência) depende diretamente da qualidade da documentação reunida no primeiro atendimento. Quanto mais objetivo for o relatório médico indicando o CID, os tratamentos anteriores já tentados e o risco de agravamento clínico pela demora, maiores são as chances de decisão favorável em poucas horas ou dias.',
        ],
      },
    ],
    comparisonTable: {
      headers: ['Tipo de Demanda', 'Polo Passivo Usual', 'Documento Essencial', 'Medida Judicial Aplicada'],
      rows: [
        [
          'Negativa de Cirurgia / Internação',
          'Operadora de Plano de Saúde',
          'Laudo médico com risco imediato + negativa escrita',
          'Tutela de urgência para custeio integral imediato',
        ],
        [
          'Medicamento de Alto Custo (Plano)',
          'Plano de Saúde',
          'Prescrição detalhada + registro ANVISA + negativa',
          'Obrigação de fornecimento sob pena de multa diária',
        ],
        [
          'Medicamento / Terapia (SUS)',
          'Estado / Município / União',
          'Laudo SUS/particular + prova de hipossuficiência',
          'Liminar com sequestro de verba pública se descumprida',
        ],
      ],
    },
    faq: [
      {
        question: 'Quanto tempo demora para sair uma liminar de saúde?',
        answer:
          'Em casos de urgência clínica comprovada (risco de morte, internação, quimioterapia ou cirurgia inadiável), o pedido é analisado inclusive em regime de plantão judicial, podendo resultar em decisão no mesmo dia ou em poucas horas.',
      },
      {
        question: 'Preciso ter a negativa do plano de saúde por escrito?',
        answer:
          'Sim, a operadora é obrigada pela ANS a fornecer a negativa formal por escrito em até 24 horas quando solicitada. Protocolos de atendimento telefônico, prints do aplicativo e e-mails também ajudam a comprovar a recusa.',
      },
    ],
  },
];
