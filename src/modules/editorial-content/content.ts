export interface EditorialContent {
  brand: {
    name: string;
    tagline: string;
    subheadline: string;
  };
  whatIs: {
    title: string;
    description: string;
    highlights: Array<{ icon: string; title: string; text: string }>;
  };
  howItWorks: Array<{ step: number; title: string; description: string; icon: string }>;
  about: {
    title: string;
    summary: string;
    mission: string;
  };
  privacyNotice: string;
  googleAttributionNotice: string;
}

export const EDITORIAL_CONTENT: EditorialContent = {
  brand: {
    name: 'PlanCity',
    tagline: 'Tu ciudad tiene más planes de los que imaginas.',
    subheadline:
      'Descubre eventos, restaurantes, lugares increíbles y experiencias cerca de ti. Encuentra qué hacer y vive tu ciudad de otra manera.',
  },
  whatIs: {
    title: '¿Qué es PlanCity?',
    description:
      'PlanCity es una plataforma digital de descubrimiento urbano que conecta a las personas con eventos, lugares, experiencias, gastronomía y actividades de su ciudad mediante información seleccionada y organizada para que siempre encuentren algo nuevo por vivir.',
    highlights: [
      {
        icon: 'fa-solid fa-compass',
        title: 'Curaduría Editorial Real',
        text: 'Eventos y experiencias investigados y verificados directamente por el equipo PlanCity.',
      },
      {
        icon: 'fa-solid fa-location-dot',
        title: 'Descubrimiento por Cercanía',
        text: 'Encuentra puntos de interés gastronómicos y culturales a pocos minutos de tu ubicación.',
      },
      {
        icon: 'fa-solid fa-shield-halved',
        title: 'Sin Fricción ni Registro',
        text: 'Acceso inmediato y libre. No necesitas crear cuentas ni entregar tus datos para explorar.',
      },
    ],
  },
  howItWorks: [
    {
      step: 1,
      title: 'Explora',
      description: 'Descubre planes, eventos culturales, restaurantes y experiencias urbanas seleccionadas.',
      icon: 'fa-solid fa-magnifying-glass-location',
    },
    {
      step: 2,
      title: 'Encuentra',
      description: 'Filtra por tu categoría favorita, elige tu ciudad o activa la búsqueda por cercanía.',
      icon: 'fa-solid fa-sliders',
    },
    {
      step: 3,
      title: 'Vive',
      description: 'Consulta los horarios, precios o cómo llegar directamente para disfrutar tu próximo plan.',
      icon: 'fa-solid fa-champagne-glasses',
    },
  ],
  about: {
    title: 'Sobre PlanCity',
    summary:
      'PlanCity nace para ayudar a las personas a descubrir lo que sucede en sus ciudades y dar visibilidad a experiencias, espacios y actividades locales.',
    mission:
      'Creemos que cada semana hay planes extraordinarios ocurriendo a nuestro alrededor que pasan desapercibidos. Nuestra misión es organizarlos con diseño intuitivo y tecnología accesible.',
  },
  privacyNotice:
    'Tu privacidad es fundamental: PlanCity no rastrea ni almacena tus coordenadas personales. La ubicación se solicita únicamente cuando tú lo decides para calcular lugares cercanos en el momento.',
  googleAttributionNotice:
    'Los puntos de interés y negocios son provistos a través de Google Maps Platform y Google Places. PlanCity no garantiza horarios o servicios de terceros ajenos a su curaduría editorial.',
};
