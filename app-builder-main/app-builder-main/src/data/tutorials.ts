import type { ComponentType } from './components';

export interface TutorialStep {
  id: number;
  title: string;
  description: string;
  action: string;
  componentType: ComponentType;
  tip: string;
}

export const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: 1,
    title: 'Instalar Ventiladores',
    description:
      'Lo primero es instalar los ventiladores en el gabinete. Estos asegurarán el flujo de aire necesario para mantener frescos todos los componentes.',
    action: 'Presiona "Instalar" en la tarjeta del Ventilador para continuar.',
    componentType: 'fan',
    tip: 'Instala ventiladores en la parte delantera como intake (entrada) y en la parte trasera como exhaust (salida) para crear un flujo de aire óptimo.',
  },
  {
    id: 2,
    title: 'Instalar la Placa Madre',
    description:
      'La placa madre es la base de todo. Se instala primero en el gabinete antes que los demás componentes principales.',
    action: 'Presiona "Instalar" en la tarjeta de la Placa Madre para continuar.',
    componentType: 'motherboard',
    tip: 'Recuerda instalar primero los separadores metálicos (standoffs) en el gabinete para evitar cortocircuitos entre la placa y el metal del gabinete.',
  },
  {
    id: 3,
    title: 'Instalar el Procesador (CPU)',
    description:
      'El CPU se instala en el socket de la placa madre. Es el paso más delicado: los pines son frágiles y no debe forzarse.',
    action: 'Presiona "Instalar" en la tarjeta del Procesador para continuar.',
    componentType: 'cpu',
    tip: 'Nunca forces el CPU en el socket. Si está correctamente alineado (con el triángulo dorado como guía), debe caer suavemente sin presión.',
  },
  {
    id: 4,
    title: 'Instalar la Memoria RAM',
    description:
      'La RAM se inserta en los slots de la placa madre. Para rendimiento óptimo, usa dos módulos en los slots correctos para activar el dual channel.',
    action: 'Presiona "Instalar" en la tarjeta de la Memoria RAM para continuar.',
    componentType: 'ram',
    tip: 'Consulta el manual de tu placa madre para saber qué slots usar en configuración dual channel (generalmente slots A2 y B2, no A1 y B1).',
  },
  {
    id: 5,
    title: 'Instalar la Tarjeta Gráfica (GPU)',
    description:
      'La GPU se instala en el slot PCIe x16 principal. Es el slot más largo y generalmente el más cercano al CPU.',
    action: 'Presiona "Instalar" en la tarjeta de la GPU para continuar.',
    componentType: 'gpu',
    tip: 'Asegúrate de conectar los cables de alimentación PCIe. Una GPU sin alimentación adecuada no funcionará o causará inestabilidad.',
  },
  {
    id: 6,
    title: 'Instalar el Almacenamiento (SSD)',
    description:
      'El SSD NVMe M.2 se instala directamente en la placa madre. Es muy rápido y no requiere cables de datos.',
    action: 'Presiona "Instalar" en la tarjeta del SSD para continuar.',
    componentType: 'storage',
    tip: 'Un SSD NVMe es mucho más rápido que un SATA tradicional. Asegúrate de instalarlo en el slot M.2 compatible con NVMe (no todos los slots M.2 son iguales).',
  },
  {
    id: 7,
    title: 'Instalar la Fuente de Poder (PSU)',
    description:
      'La PSU provee energía a todo el sistema. Se instala en la bahía inferior trasera del gabinete y sus cables llegan a todos los componentes.',
    action: 'Presiona "Instalar" en la tarjeta de la Fuente de Poder para continuar.',
    componentType: 'psu',
    tip: 'Usa una PSU con al menos 80+ Bronze de certificación. Una PSU de mala calidad puede dañar todos tus componentes con picos de voltaje.',
  },
  {
    id: 8,
    title: 'Conectar los Cables',
    description:
      'El último paso es conectar todos los cables internos: panel frontal, SATA, USB headers y los conectores de la PSU que aún no están conectados.',
    action: 'Presiona "Instalar" en la tarjeta de Cables para completar el ensamblaje.',
    componentType: 'cables',
    tip: 'El cable del panel frontal (JFP1) es el más complicado. El manual de la placa madre muestra exactamente cómo conectar cada pequeño conector (Power SW, Reset SW, LEDs).',
  },
];
