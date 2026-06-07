import type { Feature } from './about.type';

export const features: Feature[] = [
  {
    icon: 'i-lucide-code-xml',
    title: 'main.about.cards.growth.title',
    description: 'main.about.cards.growth.description',
    scatter: {
      x: -80,
      y: -60,
      rotate: -20,
      scale: 0.6,
    },
  },
  {
    icon: 'i-lucide-users',
    title: 'main.about.cards.collaboration.title',
    description: 'main.about.cards.collaboration.description',
    scatter: {
      x: 80,
      y: -60,
      rotate: 20,
      scale: 0.6,
    },
  },
  {
    icon: 'i-lucide-server-cog',
    title: 'main.about.cards.experience.title',
    description: 'main.about.cards.experience.description',
    scatter: {
      x: -80,
      y: 60,
      rotate: -15,
      scale: 0.6,
    },
  },
  {
    icon: 'i-lucide-lightbulb',
    title: 'main.about.cards.idea.title',
    description: 'main.about.cards.idea.description',
    scatter: {
      x: 80,
      y: 60,
      rotate: 15,
      scale: 0.6,
    },
  },
];
