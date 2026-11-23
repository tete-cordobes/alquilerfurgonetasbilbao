export const reservation = 'https://www.iberfurgo.com/oficinas/alquiler-furgonetas-bilbao/';
export const booking = reservation + '#reserva-bilbao';
export const operator = 'https://www.iberfurgo.com/#organization';
export const branch = reservation + '#AutoRental';
export const office = {
  address: 'Av. Txorierri, 46, 48150 Basozabal (Sondika), Bizkaia',
  maps: 'https://www.google.com/maps?cid=18056671413343467253',
  phone: '+34697969378',
  displayPhone: '697 969 378',
};
export const fleet = [
  { name: 'Pequeña', slug: 'pequena', volume: 6, size: '2,50 × 1,62 × 1,40 m', payload: '900 kg', use: 'Cajas y herramientas' },
  { name: 'Mediana', slug: 'mediana', volume: 8, size: '3,10 × 1,87 × 1,70 m', payload: '900 kg', use: 'Muebles desmontados' },
  { name: 'Grande', slug: 'grande', volume: 12, size: '3,50 × 1,83 × 1,72 m', payload: '1.000 kg', use: 'Bultos voluminosos' },
];
export const municipalGuide = 'https://www.bilbao.eus/cs/Satellite?c=BIO_Procedimiento_FA&categoria=municipales&cid=1279101350787&language=es&menuAcordeonActivo=-1&pageid=1279126040662&pagename=Bilbaonet%2FBIO_Procedimiento_FA%2FBIO_ProcResumen&perfil=empresa';

export const site = {
  name: 'Guía de mudanzas en Bilbao',
  masthead: 'Guía de mudanzas',
  locality: 'Bilbao y Bizkaia',
  title: 'Alquiler de furgonetas en Bilbao para mudanzas',
  description: 'Prepara tu mudanza en Bilbao. Comprueba si cabe tu bulto más grande, estima los viajes y consulta el alquiler con recogida en Sondika.',
  toolTitle: 'Calcula el espacio y los viajes',
  toolDescription: 'Mide el bulto embalado y usa las medidas de la puerta y del interior del vehículo que te ofrezca la oficina.',
  resultNote: 'La estimación supone una carga rectangular. Los pasos de rueda, el embalaje y la maniobra reducen el espacio aprovechable.',
  blogTitle: 'Guías de mudanzas en Bilbao',
  blogDescription: 'Cómo medir muebles, organizar los viajes y preparar la recogida y devolución de una furgoneta en Sondika.',
};

export const fields = [
  ['Bulto más grande', [['itemLength', 'Largo (cm)'], ['itemWidth', 'Ancho (cm)'], ['itemHeight', 'Alto (cm)'], ['itemWeight', 'Peso (kg)', '0.01']]],
  ['Carga total de la mudanza', [['totalVolume', 'Volumen (m³)', '0.01'], ['totalWeight', 'Peso (kg)', '0.01']]],
  ['Vehículo que quieres comprobar', [['bayLength', 'Largo interior (cm)'], ['bayWidth', 'Ancho interior (cm)'], ['bayHeight', 'Alto interior (cm)'], ['payload', 'Carga útil disponible (kg)', '0.01'], ['doorWidth', 'Ancho de puerta (cm)'], ['doorHeight', 'Alto de puerta (cm)']]],
];

export const example = { itemLength: 185, itemWidth: 76, itemHeight: 66, itemWeight: 60, totalVolume: 9, totalWeight: 750, bayLength: 260, bayWidth: 165, bayHeight: 145, payload: 680, doorWidth: 140, doorHeight: 130 };
