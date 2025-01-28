import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Fakerjs',
  path: '/fakerjs',
  description: '',
  keywords: ['fakerjs', 'airline'],
  component: () => import('./fakerjs.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2025-01-09'),
});