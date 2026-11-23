const number = new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 });
const format = (value) => number.format(value);

function dimensions(values, prefix, axes) {
  return axes.map((axis) => values[prefix + axis]);
}

function rotations([length, width, height]) {
  return [
    [length, width, height], [length, height, width],
    [width, length, height], [width, height, length],
    [height, length, width], [height, width, length],
  ];
}

function movingEstimate(values) {
  const cargo = dimensions(values, 'item', ['Length', 'Width', 'Height']);
  const bay = dimensions(values, 'bay', ['Length', 'Width', 'Height']);
  const door = dimensions(values, 'door', ['Width', 'Height']);
  const cubicMetres = (sides) => sides.reduce((product, side) => product * side, 1) / 1_000_000;
  if (values.totalWeight < values.itemWeight || values.totalVolume + 1e-9 < cubicMetres(cargo)) {
    return ['Revisa el inventario', 'El peso y el volumen totales deben incluir el bulto principal.'];
  }
  const orientation = rotations(cargo).find(([length, width, height]) =>
    length <= bay[0] && width <= bay[1] && height <= bay[2] &&
    width <= door[0] && height <= door[1]
  );
  if (!orientation) {
    return ['Comprueba una furgoneta mayor', 'El bulto no cabe en línea recta a través de la puerta y hasta el interior con las medidas indicadas.'];
  }
  if (values.itemWeight > values.payload) {
    return ['El bulto supera la carga útil', 'Comprueba el peso del bulto o elige un vehículo con mayor carga disponible.'];
  }
  const rectangular = cubicMetres(bay);
  const capacity = values.usableVolume ? Math.min(rectangular, values.usableVolume) : rectangular;
  if (cubicMetres(cargo) > capacity + 1e-9) {
    return ['El bulto supera el volumen disponible por viaje', 'Comprueba el volumen útil indicado o elige otra furgoneta. Un bulto indivisible debe caber en un solo viaje.'];
  }
  const byWeight = Math.ceil(values.totalWeight / values.payload);
  const byVolume = Math.ceil(values.totalVolume / capacity);
  const trips = Math.max(byWeight, byVolume);
  return [
    'Mínimo teórico de viajes: ' + format(trips),
    'El bulto cabe según estas medidas. Orientación de entrada si el objeto admite esa posición (largo × ancho × alto): ' + orientation.map(format).join(' × ') + ' cm.',
    'Por peso: ' + format(values.totalWeight) + ' kg ÷ ' + format(values.payload) + ' kg por viaje → ' + format(byWeight) + '.',
    'Por volumen: ' + format(values.totalVolume) + ' m³ ÷ ' + format(capacity) + ' m³ por viaje → ' + format(byVolume) + '.',
    values.usableVolume ? 'Volumen por viaje limitado por el interior rectangular y el volumen útil o nominal indicado.' : 'La capacidad es el máximo rectangular. Confirma huecos, salientes y sujeción antes de reservar.',
  ];
}

const form = document.querySelector('[data-calculator]');
if (form) {
  const result = document.querySelector('[data-result]');
  const copy = document.querySelector('[data-copy]');
  const copyStatus = document.querySelector('[data-copy-status]');
  let summary = '';
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = Object.fromEntries([...new FormData(form)].map(([key, value]) => [key, Number(value)]));
    const lines = movingEstimate(values);
    result.replaceChildren(...lines.map((line) => {
      const span = document.createElement('span');
      span.textContent = line;
      return span;
    }));
    summary = lines.join('\n');
    copy.hidden = false;
    copyStatus.textContent = '';
    result.focus();
  });
  form.addEventListener('input', () => {
    summary = '';
    copy.hidden = true;
    copyStatus.textContent = '';
    result.textContent = 'Pulsa Calcular para actualizar la estimación.';
  });
  form.querySelector('[data-example]').addEventListener('click', () => {
    form.reset();
    const example = JSON.parse(form.dataset.example);
    for (const [key, value] of Object.entries(example)) form.elements[key].value = value;
    form.requestSubmit();
  });
  copy.addEventListener('click', async () => {
    if (!summary) return;
    try {
      await navigator.clipboard.writeText(summary);
      copyStatus.textContent = 'Estimación copiada.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(result);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      copyStatus.textContent = 'Texto seleccionado. Usa la opción Copiar de tu dispositivo.';
    }
  });
}
