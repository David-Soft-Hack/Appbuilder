export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  condition: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-component',
    title: 'Primer Paso',
    description: 'Instalaste tu primer componente',
    icon: 'star',
    color: '#F59E0B',
    condition: 'install_first',
  },
  {
    id: 'motherboard-installed',
    title: 'Base Sólida',
    description: 'Instalaste la placa madre correctamente',
    icon: 'circuit',
    color: '#3B82F6',
    condition: 'install_motherboard',
  },
  {
    id: 'cpu-installed',
    title: 'Cerebro Activo',
    description: 'Instalaste el procesador en el socket',
    icon: 'memory',
    color: '#EF4444',
    condition: 'install_cpu',
  },
  {
    id: 'ram-installed',
    title: 'Mente Rápida',
    description: 'Instalaste la memoria RAM',
    icon: 'speed',
    color: '#10B981',
    condition: 'install_ram',
  },
  {
    id: 'gpu-installed',
    title: 'Poder Visual',
    description: 'Instalaste la tarjeta gráfica',
    icon: 'monitor',
    color: '#84CC16',
    condition: 'install_gpu',
  },
  {
    id: 'storage-installed',
    title: 'Guardián de Datos',
    description: 'Instalaste el almacenamiento',
    icon: 'storage',
    color: '#F97316',
    condition: 'install_storage',
  },
  {
    id: 'psu-installed',
    title: 'Fuente de Vida',
    description: 'Instalaste la fuente de poder',
    icon: 'power',
    color: '#8B5CF6',
    condition: 'install_psu',
  },
  {
    id: 'pc-complete',
    title: 'Ensamblador Pro',
    description: 'Completaste el ensamblaje de la PC',
    icon: 'trophy',
    color: '#F59E0B',
    condition: 'complete_build',
  },
  {
    id: 'quiz-first',
    title: 'Estudiante Aplicado',
    description: 'Respondiste tu primera pregunta correctamente',
    icon: 'school',
    color: '#0EA5E9',
    condition: 'first_quiz',
  },
  {
    id: 'quiz-master',
    title: 'Maestro del Hardware',
    description: 'Respondiste todas las preguntas correctamente',
    icon: 'emoji_events',
    color: '#F59E0B',
    condition: 'all_quiz',
  },
  {
    id: 'tutorial-complete',
    title: 'Graduado',
    description: 'Completaste el modo tutorial',
    icon: 'school',
    color: '#10B981',
    condition: 'complete_tutorial',
  },
  {
    id: 'doc-reader',
    title: 'Ávido Lector',
    description: 'Leíste la documentación de 5 componentes',
    icon: 'menu_book',
    color: '#0EA5E9',
    condition: 'read_5_docs',
  },
];
