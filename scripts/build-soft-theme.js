const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BASE_THEME_PATH = path.join(ROOT, 'themes', 'Ozurac.json');
const SOFT_THEME_PATH = path.join(ROOT, 'themes', 'Ozurac-Soft.json');

// Mapeamento direto das superfícies escuras base -> grafite-esverdeado suave
const DIRECT_SURFACE_MAP = {
  '#000000': '#0d1210',
  '#050505': '#0f1512',
  '#080808': '#111714',
  '#0a0a0a': '#131916',
  '#0c0c0c': '#151c18',
  '#0d0d0d': '#161d19',
  '#0e1714': '#17231f',
  '#0f0f0f': '#171f1b',
  '#111111': '#19211d',
  '#121212': '#1a231f',
  '#141414': '#1c2521',
  '#161616': '#1e2823',
  '#181818': '#202b26',
  '#1a1a1a': '#222d28',
  '#1e1e1e': '#25322c',
  '#222222': '#293731',
  '#262626': '#2d3c35'
};

function transformHexColor(value) {
  if (typeof value !== 'string') return value;

  const match = value.match(/^(#[0-9a-fA-F]{6})([0-9a-fA-F]{2})?$/);
  if (!match) return value;

  const baseHex = match[1].toLowerCase();
  const alpha = match[2] || '';

  if (DIRECT_SURFACE_MAP[baseHex]) {
    return `${DIRECT_SURFACE_MAP[baseHex]}${alpha}`;
  }

  // Fallback para qualquer outro cinza neutro escuro (R === G === B e valor <= 0x2a)
  const r = parseInt(baseHex.slice(1, 3), 16);
  const g = parseInt(baseHex.slice(3, 5), 16);
  const b = parseInt(baseHex.slice(5, 7), 16);

  if (r === g && g === b && r <= 0x2a) {
    const newR = Math.min(255, r + 9);
    const newG = Math.min(255, g + 15);
    const newB = Math.min(255, b + 12);
    const toHex = (n) => n.toString(16).padStart(2, '0');
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}${alpha}`;
  }

  return value;
}

function mapObjectColors(node) {
  if (Array.isArray(node)) return node.map(mapObjectColors);
  if (node && typeof node === 'object') {
    const result = {};
    for (const [k, v] of Object.entries(node)) {
      result[k] = mapObjectColors(v);
    }
    return result;
  }
  return transformHexColor(node);
}

const baseTheme = JSON.parse(fs.readFileSync(BASE_THEME_PATH, 'utf8'));

const softTheme = {
  ...baseTheme,
  name: 'Ozurac Soft',
  colors: mapObjectColors(baseTheme.colors || {})
};

fs.writeFileSync(SOFT_THEME_PATH, JSON.stringify(softTheme, null, 2) + '\n', 'utf8');
console.log('✅ Tema gerado com sucesso em themes/Ozurac-Soft.json');