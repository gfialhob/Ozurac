const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT, 'ozurac-icons');
const SVG_DIR = path.join(ICONS_DIR, 'svg');
const ICONS_JSON_PATH = path.join(ICONS_DIR, 'ozurac-icons.json');
const PACKAGE_JSON_PATH = path.join(ROOT, 'package.json');
const CHANGELOG_PATH = path.join(ROOT, 'CHANGELOG.md');

const errors = [];
const warnings = [];

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (err) {
    errors.push(`Erro de sintaxe JSON em ${path.relative(ROOT, filePath)}: ${err.message}`);
    return null;
  }
}

const iconsConfig = readJson(ICONS_JSON_PATH);
const pkg = readJson(PACKAGE_JSON_PATH);

if (!iconsConfig || !pkg) {
  console.error(errors.join('\n'));
  process.exit(1);
}

// 1. Sincronia de versão entre package.json e CHANGELOG.md
if (fs.existsSync(CHANGELOG_PATH)) {
  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const topVersionMatch = changelog.match(/^## \[(\d+\.\d+\.\d+)\]/m);
  if (!topVersionMatch) {
    errors.push('CHANGELOG.md não possui cabeçalho no formato "## [x.y.z]".');
  } else if (topVersionMatch[1] !== pkg.version) {
    errors.push(
      `Versão dessincronizada: package.json (${pkg.version}) != CHANGELOG.md (${topVersionMatch[1]}).`
    );
  }
}

// 2. Verificar existência física de cada iconPath e detectar SVGs órfãos
const definitions = iconsConfig.iconDefinitions || {};
const referencedSvgFiles = new Set();

for (const [iconId, def] of Object.entries(definitions)) {
  if (!def || typeof def.iconPath !== 'string') {
    errors.push(`iconDefinitions["${iconId}"] não possui "iconPath" válido.`);
    continue;
  }

  const resolvedPath = path.resolve(ICONS_DIR, def.iconPath);
  if (!fs.existsSync(resolvedPath)) {
    errors.push(`Arquivo ausente para "${iconId}": ${def.iconPath}`);
  } else {
    referencedSvgFiles.add(path.basename(resolvedPath));
  }
}

if (fs.existsSync(SVG_DIR)) {
  const actualSvgs = fs.readdirSync(SVG_DIR).filter((f) => f.endsWith('.svg'));
  for (const file of actualSvgs) {
    if (!referencedSvgFiles.has(file)) {
      errors.push(`SVG órfão em ozurac-icons/svg/${file} (não declarado em iconDefinitions).`);
    }
  }
}

// 3. Verificar integridade referencial em todos os mapas
const usedIconIds = new Set();
const rootFallbacks = ['file', 'folder', 'folderExpanded', 'rootFolder', 'rootFolderExpanded'];

for (const key of rootFallbacks) {
  const id = iconsConfig[key];
  if (!id || !definitions[id]) {
    errors.push(`Fallback raiz "${key}" aponta para ícone inexistente: "${id}".`);
  } else {
    usedIconIds.add(id);
  }
}

const mapSections = [
  'fileExtensions',
  'fileNames',
  'languageIds',
  'folderNames',
  'folderNamesExpanded',
  'rootFolderNames',
  'rootFolderNamesExpanded'
];

for (const section of mapSections) {
  const map = iconsConfig[section] || {};
  for (const [entryKey, iconId] of Object.entries(map)) {
    if (!definitions[iconId]) {
      errors.push(`${section}["${entryKey}"] referencia ícone inexistente: "${iconId}".`);
    } else {
      usedIconIds.add(iconId);
    }

    if (entryKey.includes('/')) {
      errors.push(`${section}["${entryKey}"] contém "/" (não suportado pelo VS Code).`);
    }
  }
}

if (iconsConfig.highContrast) {
  for (const sub of ['fileExtensions', 'fileNames']) {
    const map = iconsConfig.highContrast[sub] || {};
    for (const [entryKey, iconId] of Object.entries(map)) {
      if (!definitions[iconId]) {
        errors.push(`highContrast.${sub}["${entryKey}"] referencia ícone inexistente: "${iconId}".`);
      } else {
        usedIconIds.add(iconId);
      }
    }
  }
}

// 4. Detectar definições não utilizadas
for (const iconId of Object.keys(definitions)) {
  if (!usedIconIds.has(iconId)) {
    warnings.push(`Ícone definido mas nunca mapeado: "${iconId}".`);
  }
}

// 5. Verificar simetria entre pastas fechadas e abertas
const folderClosed = iconsConfig.folderNames || {};
const folderOpen = iconsConfig.folderNamesExpanded || {};

for (const [dirName, closedIcon] of Object.entries(folderClosed)) {
  if (!folderOpen[dirName]) {
    errors.push(`folderNames["${dirName}"] não possui par correspondente em folderNamesExpanded.`);
  } else if (folderOpen[dirName] !== `${closedIcon}-open`) {
    warnings.push(
      `Par assimétrico para "${dirName}": fechado="${closedIcon}", aberto="${folderOpen[dirName]}".`
    );
  }
}

for (const dirName of Object.keys(folderOpen)) {
  if (!folderClosed[dirName]) {
    errors.push(`folderNamesExpanded["${dirName}"] não possui entrada correspondente em folderNames.`);
  }
}

// 6. Validar formato de fileExtensions (sem ponto inicial)
for (const ext of Object.keys(iconsConfig.fileExtensions || {})) {
  if (ext.startsWith('.')) {
    errors.push(`fileExtensions["${ext}"] não deve começar com ponto (".").`);
  }
}

// Resultado
if (warnings.length > 0) {
  console.warn('⚠️  Avisos:\n' + warnings.map((w) => `  - ${w}`).join('\n') + '\n');
}

if (errors.length > 0) {
  console.error('❌ Falha na validação do Ozurac:\n' + errors.map((e) => `  - ${e}`).join('\n'));
  process.exit(1);
}

console.log(
  `✅ Validação concluída com sucesso: ${Object.keys(definitions).length} ícones, ` +
  `${Object.keys(folderClosed).length} pastas mapeadas, versão ${pkg.version}.`
);