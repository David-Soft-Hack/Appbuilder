export type ComponentType =
  | 'motherboard'
  | 'cpu'
  | 'ram'
  | 'gpu'
  | 'storage'
  | 'psu'
  | 'fan'
  | 'cables';

export interface PCComponent {
  id: string;
  type: ComponentType;
  name: string;
  shortDesc: string;
  whatIs: string;
  function: string;
  howToInstall: string;
  specs: { label: string; value: string }[];
  color: string;
  iconBg: string;
  step: number;
  compatibleWith: ComponentType[];
  brand: string;
  model: string;
}

export interface SlotDefinition {
  id: string;
  type: ComponentType;
  label: string;
  required: boolean;
  order: number;
}

export const SLOTS: SlotDefinition[] = [
  { id: 'slot-fan', type: 'fan', label: 'Ventiladores', required: false, order: 1 },
  { id: 'slot-motherboard', type: 'motherboard', label: 'Placa Madre', required: true, order: 2 },
  { id: 'slot-cpu', type: 'cpu', label: 'Procesador (CPU)', required: true, order: 3 },
  { id: 'slot-ram', type: 'ram', label: 'Memoria RAM', required: true, order: 4 },
  { id: 'slot-gpu', type: 'gpu', label: 'Tarjeta Gráfica (GPU)', required: false, order: 5 },
  { id: 'slot-storage', type: 'storage', label: 'Almacenamiento', required: true, order: 6 },
  { id: 'slot-psu', type: 'psu', label: 'Fuente de Poder (PSU)', required: true, order: 7 },
  { id: 'slot-cables', type: 'cables', label: 'Cables Internos', required: true, order: 8 },
];

export const TUTORIAL_ORDER: ComponentType[] = [
  'fan',
  'motherboard',
  'cpu',
  'ram',
  'gpu',
  'storage',
  'psu',
  'cables',
];

export const PC_COMPONENTS: PCComponent[] = [
  {
    id: 'fan-1',
    type: 'fan',
    name: 'Ventilador de 120mm',
    brand: 'CoolerMaster',
    model: 'SickleFlow 120',
    shortDesc: 'Mantiene el gabinete fresco con flujo de aire optimizado',
    whatIs:
      'Un ventilador de caso es un dispositivo electromecánico que mueve aire dentro y fuera del gabinete de la computadora para mantener temperaturas de operación seguras en todos los componentes.',
    function:
      'Su función principal es disipar el calor generado por los componentes como el CPU, GPU y motherboard. Sin ventilación adecuada, los componentes pueden sobrecalentarse y dañarse permanentemente. Los ventiladores se instalan como intake (entrada de aire frío) o exhaust (salida de aire caliente).',
    howToInstall:
      '1. Identifica los orificios de montaje en el gabinete. 2. Decide si será intake (frente/base) o exhaust (parte trasera/superior). 3. Alinea los 4 tornillos del ventilador con los agujeros del gabinete. 4. Aprieta los tornillos suavemente en patrón cruzado. 5. Conecta el conector del ventilador al header SYS_FAN de la motherboard.',
    specs: [
      { label: 'Tamaño', value: '120mm' },
      { label: 'Velocidad', value: '500-1800 RPM' },
      { label: 'Nivel de ruido', value: '6-27 dBA' },
      { label: 'Conector', value: '4-pin PWM' },
    ],
    color: '#06B6D4',
    iconBg: '#ECFEFF',
    step: 1,
    compatibleWith: ['motherboard'],
  },
  {
    id: 'motherboard-1',
    type: 'motherboard',
    name: 'Placa Madre ATX',
    brand: 'ASUS',
    model: 'ROG Strix B550-F',
    shortDesc: 'La columna vertebral que conecta todos los componentes',
    whatIs:
      'La placa madre (motherboard) es el circuito impreso principal de la computadora. Es una placa de circuito compleja que aloja y conecta todos los componentes del sistema, permitiéndoles comunicarse entre sí.',
    function:
      'Actúa como el sistema nervioso central de la PC. Provee los sockets para el CPU y RAM, ranuras PCIe para la GPU, conectores SATA para almacenamiento, puertos USB, audio y red. Distribuye la energía desde la PSU a todos los componentes y gestiona la comunicación entre ellos mediante buses de datos.',
    howToInstall:
      '1. Instala los separadores metálicos (standoffs) en el gabinete según el factor de forma (ATX/mATX). 2. Inserta el bracket I/O en la apertura trasera del gabinete. 3. Alinea la motherboard sobre los standoffs. 4. Atornilla la motherboard desde el centro hacia afuera. 5. Conecta el conector ATX 24-pin y el conector CPU 8-pin de la PSU.',
    specs: [
      { label: 'Socket', value: 'AM4' },
      { label: 'Chipset', value: 'B550' },
      { label: 'Factor de forma', value: 'ATX' },
      { label: 'Slots RAM', value: '4x DDR4' },
      { label: 'Slots PCIe', value: '2x PCIe 4.0' },
    ],
    color: '#3B82F6',
    iconBg: '#EFF6FF',
    step: 2,
    compatibleWith: ['cpu', 'ram', 'gpu', 'storage', 'psu', 'fan'],
  },
  {
    id: 'cpu-1',
    type: 'cpu',
    name: 'Procesador AMD Ryzen 5',
    brand: 'AMD',
    model: 'Ryzen 5 5600X',
    shortDesc: 'El cerebro de la computadora que procesa todas las instrucciones',
    whatIs:
      'El CPU (Central Processing Unit o Procesador Central) es el componente más importante de una computadora. Es un chip de silicio extremadamente complejo que contiene miles de millones de transistores capaces de ejecutar instrucciones a alta velocidad.',
    function:
      'El CPU ejecuta las instrucciones de los programas. Realiza cálculos matemáticos y lógicos, gestiona el flujo de datos entre componentes, y coordina todas las operaciones del sistema. Los procesadores modernos tienen múltiples núcleos que permiten ejecutar varias tareas simultáneamente (multitarea).',
    howToInstall:
      '1. Levanta el brazo de la palanca del socket ZIF en la motherboard. 2. Alinea el triángulo dorado del CPU con el triángulo del socket. 3. Coloca el CPU suavemente sin ejercer presión (los pines deben encajar solos). 4. Baja la palanca y asegúrala bajo el clip. 5. Aplica pasta térmica en el centro del CPU (gota del tamaño de un arroz). 6. Instala el cooler del CPU y conéctalo al header CPU_FAN.',
    specs: [
      { label: 'Núcleos / Hilos', value: '6C / 12T' },
      { label: 'Velocidad base', value: '3.7 GHz' },
      { label: 'Boost máximo', value: '4.6 GHz' },
      { label: 'Socket', value: 'AM4' },
      { label: 'TDP', value: '65W' },
      { label: 'Caché L3', value: '32 MB' },
    ],
    color: '#EF4444',
    iconBg: '#FEF2F2',
    step: 3,
    compatibleWith: ['motherboard'],
  },
  {
    id: 'ram-1',
    type: 'ram',
    name: 'Memoria RAM DDR4',
    brand: 'Corsair',
    model: 'Vengeance LPX 16GB',
    shortDesc: 'Almacenamiento temporal de alta velocidad para datos activos',
    whatIs:
      'La RAM (Random Access Memory o Memoria de Acceso Aleatorio) es un tipo de memoria volátil de alta velocidad que almacena temporalmente los datos e instrucciones que el CPU necesita acceder rápidamente durante la ejecución de programas.',
    function:
      'La RAM almacena los datos de los programas que están actualmente en ejecución. Cuando abres una aplicación, sus datos se cargan desde el disco duro a la RAM para que el CPU pueda accederlos con velocidad máxima. Los datos en RAM se pierden cuando se apaga la computadora. Más RAM permite tener más programas abiertos simultáneamente sin ralentización.',
    howToInstall:
      '1. Consulta el manual de la motherboard para conocer los slots recomendados (generalmente A2 y B2 para configuración dual channel). 2. Abre los clips de retención en ambos lados del slot. 3. Alinea la muesca del módulo RAM con la muesca del slot. 4. Presiona firmemente desde ambos extremos hasta escuchar un "clic" y los clips se cierren. 5. Verifica que ambos clips queden bloqueados.',
    specs: [
      { label: 'Capacidad', value: '16 GB (2x8GB)' },
      { label: 'Tipo', value: 'DDR4' },
      { label: 'Velocidad', value: '3200 MHz' },
      { label: 'Latencia', value: 'CL16' },
      { label: 'Voltaje', value: '1.35V' },
    ],
    color: '#10B981',
    iconBg: '#ECFDF5',
    step: 4,
    compatibleWith: ['motherboard'],
  },
  {
    id: 'gpu-1',
    type: 'gpu',
    name: 'Tarjeta Gráfica RTX',
    brand: 'NVIDIA',
    model: 'GeForce RTX 3060',
    shortDesc: 'Procesa y renderiza todos los gráficos de la pantalla',
    whatIs:
      'La GPU (Graphics Processing Unit o Tarjeta Gráfica) es un procesador especializado diseñado para manejar cálculos gráficos. Contiene miles de núcleos pequeños optimizados para procesar múltiples operaciones en paralelo, lo que la hace ideal para renderizado 3D, efectos visuales y cálculos de IA.',
    function:
      'La GPU se encarga de generar las imágenes que ves en pantalla. Procesa geometría 3D, aplica texturas, calcula iluminación y efectos de post-procesado. En videojuegos, determina la calidad visual y la tasa de fotogramas. También se usa para minería de criptomonedas, entrenamiento de IA y renderizado de video. Tiene su propia memoria dedicada (VRAM).',
    howToInstall:
      '1. Retira el bracket de expansión donde se instalará la GPU. 2. Inserta la GPU en el slot PCIe x16 principal (el más cercano al CPU). 3. Presiona firmemente hasta que el clip de retención del slot haga "clic". 4. Atornilla el bracket de la GPU al gabinete. 5. Conecta los cables de alimentación PCIe de 6 u 8 pines de la PSU. 6. Conecta el monitor al puerto HDMI/DisplayPort de la GPU (no de la motherboard).',
    specs: [
      { label: 'VRAM', value: '12 GB GDDR6' },
      { label: 'Núcleos CUDA', value: '3584' },
      { label: 'Memoria bus', value: '192-bit' },
      { label: 'TDP', value: '170W' },
      { label: 'Conector', value: '1x 12-pin (PCIe 8-pin)' },
    ],
    color: '#84CC16',
    iconBg: '#F7FEE7',
    step: 5,
    compatibleWith: ['motherboard', 'psu'],
  },
  {
    id: 'storage-1',
    type: 'storage',
    name: 'SSD NVMe M.2',
    brand: 'Samsung',
    model: '970 EVO Plus 1TB',
    shortDesc: 'Almacenamiento permanente ultrarrápido para el sistema operativo',
    whatIs:
      'Un SSD NVMe M.2 (Solid State Drive con interfaz NVMe en formato M.2) es un dispositivo de almacenamiento permanente de alta velocidad. A diferencia de los HDD tradicionales, no tiene partes móviles; usa chips de memoria flash NAND para guardar datos.',
    function:
      'Guarda permanentemente el sistema operativo, programas, archivos y datos del usuario. Al ser NVMe, usa el bus PCIe para velocidades de lectura/escritura muy superiores a los SATA. Los datos persisten aunque la computadora se apague. Un SSD NVMe hace que el sistema arranque en segundos y que los programas carguen casi instantáneamente.',
    howToInstall:
      '1. Localiza el slot M.2 en la motherboard. 2. Retira el tornillo de retención del slot M.2. 3. Inserta el SSD en el slot en ángulo de 30 grados. 4. Presiona el SSD hacia abajo y asegúralo con el tornillo. 5. Si hay disipador M.2 en la motherboard, instálalo sobre el SSD aplicando la almohadilla térmica incluida.',
    specs: [
      { label: 'Capacidad', value: '1 TB' },
      { label: 'Interfaz', value: 'NVMe PCIe 3.0 x4' },
      { label: 'Lectura seq.', value: '3,500 MB/s' },
      { label: 'Escritura seq.', value: '3,300 MB/s' },
      { label: 'Factor de forma', value: 'M.2 2280' },
    ],
    color: '#F97316',
    iconBg: '#FFF7ED',
    step: 6,
    compatibleWith: ['motherboard'],
  },
  {
    id: 'psu-1',
    type: 'psu',
    name: 'Fuente de Poder 650W',
    brand: 'EVGA',
    model: 'SuperNOVA 650 G5',
    shortDesc: 'Provee energía eléctrica estable a todos los componentes',
    whatIs:
      'La PSU (Power Supply Unit o Fuente de Poder) es el componente que convierte la corriente alterna (CA/AC) de tu toma de corriente en corriente directa (CD/DC) regulada a los voltajes que necesitan los componentes de la PC (12V, 5V, 3.3V).',
    function:
      'Sin la PSU, ningún componente puede funcionar. Distribuye energía mediante cables a la motherboard (conector 24-pin), CPU (8-pin), GPU (6/8-pin), discos duros (SATA power) y otros dispositivos. Una PSU de calidad garantiza voltajes estables y protecciones contra sobrevoltaje, cortocircuitos y sobrecalentamiento que protegen tus componentes.',
    howToInstall:
      '1. Monta la PSU en la bahía inferior trasera del gabinete (ventilador hacia abajo si hay ventilación en la base, o hacia arriba en gabinetes sin ventilación en base). 2. Atornilla la PSU con 4 tornillos. 3. Conecta el cable ATX 24-pin al conector principal de la motherboard. 4. Conecta el cable CPU 8-pin (EPS) al conector CPU/EATX12V. 5. Conecta los cables PCIe a la GPU. 6. Conecta los cables SATA power al almacenamiento.',
    specs: [
      { label: 'Potencia', value: '650W' },
      { label: 'Eficiencia', value: '80 Plus Gold' },
      { label: 'Modularidad', value: 'Totalmente modular' },
      { label: 'Rails 12V', value: 'Single Rail 54A' },
      { label: 'Certificación', value: '80+ Gold' },
    ],
    color: '#8B5CF6',
    iconBg: '#F5F3FF',
    step: 7,
    compatibleWith: ['motherboard', 'gpu', 'storage'],
  },
  {
    id: 'cables-1',
    type: 'cables',
    name: 'Kit de Cables Internos',
    brand: 'Genérico',
    model: 'Bundle RGB',
    shortDesc: 'Conecta todos los componentes para completar el ensamblaje',
    whatIs:
      'Los cables internos de una PC son los conductores eléctricos que transmiten datos y energía entre los distintos componentes. Incluyen cables de datos (SATA, USB interno), cables de alimentación, cables de panel frontal y cables de extensión para gestión.',
    function:
      'Los cables cumplen dos funciones: transmitir datos (cables SATA para comunicar la motherboard con discos, headers USB para los puertos del gabinete) y transmitir energía (cables de alimentación desde la PSU). Un buen ruteo de cables también mejora el flujo de aire en el gabinete, lo que reduce temperaturas de operación.',
    howToInstall:
      '1. Conecta los cables de panel frontal (Power SW, Reset SW, Power LED, HDD LED) a los headers JFP1 de la motherboard según el diagrama del manual. 2. Conecta los cables USB 3.0 del gabinete al header USB del motherboard. 3. Conecta el cable de audio del frontal al header AAFP. 4. Conecta los cables SATA de datos entre motherboard y almacenamiento. 5. Rutea los cables por detrás del panel lateral para mayor orden y flujo de aire.',
    specs: [
      { label: 'Cables de datos', value: 'SATA 6Gbps, USB 3.0' },
      { label: 'Panel frontal', value: 'Power, Reset, LED, Audio' },
      { label: 'Extensiones', value: 'RGB, Fan headers' },
      { label: 'Material', value: 'Cobre con aislamiento PVC' },
    ],
    color: '#EC4899',
    iconBg: '#FDF2F8',
    step: 8,
    compatibleWith: ['motherboard', 'psu', 'storage', 'fan', 'gpu'],
  },
];

export const COMPONENT_TYPE_LABELS: Record<ComponentType, string> = {
  motherboard: 'Placa Madre',
  cpu: 'Procesador',
  ram: 'Memoria RAM',
  gpu: 'Tarjeta Gráfica',
  storage: 'Almacenamiento',
  psu: 'Fuente de Poder',
  fan: 'Ventilador',
  cables: 'Cables',
};
