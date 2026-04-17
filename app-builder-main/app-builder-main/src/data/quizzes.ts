import type { ComponentType } from './components';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  componentType: ComponentType;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    componentType: 'cpu',
    question: '¿Cuál es la función principal del CPU?',
    options: [
      'Almacenar datos permanentemente',
      'Ejecutar instrucciones y realizar cálculos',
      'Generar imágenes en pantalla',
      'Proveer energía a los componentes',
    ],
    correctIndex: 1,
    explanation:
      'El CPU (Procesador Central) es el cerebro de la computadora. Ejecuta instrucciones de los programas y realiza todos los cálculos matemáticos y lógicos necesarios.',
  },
  {
    id: 'q2',
    componentType: 'ram',
    question: '¿Qué significa RAM?',
    options: [
      'Random Access Memory',
      'Read And Memorize',
      'Rapid Application Module',
      'Relational Array Memory',
    ],
    correctIndex: 0,
    explanation:
      'RAM significa Random Access Memory (Memoria de Acceso Aleatorio). Se llama así porque permite acceder a cualquier posición de memoria en el mismo tiempo, sin importar la ubicación.',
  },
  {
    id: 'q3',
    componentType: 'motherboard',
    question: '¿Qué componente conecta todos los demás componentes de la PC?',
    options: ['La fuente de poder', 'El procesador', 'La placa madre', 'El disco duro'],
    correctIndex: 2,
    explanation:
      'La placa madre es el circuito principal que interconecta todos los componentes: CPU, RAM, GPU, almacenamiento, etc. Es la "columna vertebral" del sistema.',
  },
  {
    id: 'q4',
    componentType: 'psu',
    question: '¿Qué hace la fuente de poder (PSU)?',
    options: [
      'Almacena energía como una batería',
      'Convierte corriente alterna en corriente directa regulada',
      'Enfría el procesador',
      'Gestiona la comunicación entre componentes',
    ],
    correctIndex: 1,
    explanation:
      'La PSU convierte la corriente alterna (AC) de la toma eléctrica en corriente directa (DC) a los voltajes requeridos por los componentes (12V, 5V, 3.3V).',
  },
  {
    id: 'q5',
    componentType: 'gpu',
    question: '¿Para qué sirve principalmente la tarjeta gráfica?',
    options: [
      'Aumentar la velocidad del CPU',
      'Ampliar la memoria RAM',
      'Procesar y renderizar imágenes y gráficos',
      'Conectarse a internet',
    ],
    correctIndex: 2,
    explanation:
      'La GPU está especializada en procesar gráficos. Tiene miles de núcleos pequeños para cálculos paralelos, ideal para renderizar imágenes 3D, videos y efectos visuales.',
  },
  {
    id: 'q6',
    componentType: 'storage',
    question: '¿Cuál es la ventaja principal de un SSD NVMe sobre un HDD?',
    options: [
      'Mayor capacidad de almacenamiento',
      'Menor precio por GB',
      'Velocidades de lectura/escritura muy superiores',
      'Consume menos energía',
    ],
    correctIndex: 2,
    explanation:
      'Un SSD NVMe puede alcanzar velocidades de 3000-7000 MB/s, mientras un HDD rara vez supera los 200 MB/s. Esto hace que el sistema y los programas carguen mucho más rápido.',
  },
  {
    id: 'q7',
    componentType: 'fan',
    question: '¿Qué es un ventilador "intake" en un gabinete de PC?',
    options: [
      'Un ventilador que extrae el aire caliente',
      'Un ventilador que introduce aire frío al gabinete',
      'El ventilador del CPU',
      'Un ventilador silencioso de alta velocidad',
    ],
    correctIndex: 1,
    explanation:
      'Los ventiladores intake introducen aire frío del exterior al gabinete. Los exhaust sacan el aire caliente. Una buena configuración con ambos tipos crea un flujo de aire efectivo.',
  },
  {
    id: 'q8',
    componentType: 'cables',
    question: '¿Cuántos pines tiene el conector principal de alimentación ATX para la motherboard?',
    options: ['8 pines', '16 pines', '24 pines', '12 pines'],
    correctIndex: 2,
    explanation:
      'El conector principal ATX tiene 24 pines. Este cable lleva la energía desde la PSU a la placa madre para alimentar todos los componentes conectados a ella.',
  },
];
