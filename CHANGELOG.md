# 📋 Changelog

## [1.5.0]
### ✨ Adicionado
- **Variante de Tema (`Ozurac Soft`):**
  - Adicionado o tema **Ozurac Soft** (`themes/Ozurac-Soft.json`), substituindo o preto absoluto por superfícies em grafite-esverdeado profundo para reduzir fadiga visual e *halation* em ambientes iluminados, mantendo 100% da paleta de sintaxe do tema principal.
- **Novas Pastas Temáticas (`ozurac-icons/`):**
  - Adicionados **3 novos pares de pastas temáticas** (estados fechado e aberto): `ci` (`workflows`, `.workflows`, `.ci`, `pipelines`, `.pipelines`, `.circleci`, `.buildkite`, `actions`), `cypress` (`.cypress`) e `storybook` (`.storybook`, `stories`), totalizando **43 pares** e **mais de 170 nomes de diretórios**.
- **Novos Ícones de Frameworks e Ferramentas:**
  - Adicionados **7 novos ícones**: `astro`, `cypress`, `monorepo` (`turbo.json`, `nx.json`, `lerna.json`, `pnpm-workspace.yaml`), `playwright`, `storybook`, `svelte` e `terraform` (`.tf`, `.tfvars`, `.hcl`).
- **Automação e Auditoria (`scripts/` e CI):**
  - Adicionados os scripts `scripts/validate-icons.js` (`npm run validate`) e `scripts/build-soft-theme.js` (`npm run build:soft`), integrados ao GitHub Actions para validar integridade referencial de SVGs, detectar arquivos órfãos, conferir simetria entre pastas abertas/fechadas e verificar sincronia de versão.

### 🎨 Alterado
- **Ícones (`ozurac-icons/`):**
  - Ícones redesenhados: `dll`, `file`, `font`, `pdf`, `template`, `txt`, `xml`, `yaml` e `zip`.

### 📝 Documentação e Marketplace
- Atualizada a contagem total para **177 ícones dedicados** no `README.md` e adicionada a keyword `Soft Dark` no `package.json`.

## [1.4.0]
### ✨ Adicionado
- **Pastas Temáticas (`ozurac-icons/`):**
  - Adicionados **40 pares de pastas temáticas** (estados fechado e aberto), cobrindo **mais de 160 nomes de diretórios**: `src`, `components`, `assets`, `test`, `docs`, `config`, `.github`, `api`, `utils`, `types`, `hooks`, `pages`, `theme`, `i18n`, `database`, `secure`, `scripts`, `infra`, `packages`, `svg`, `.vscode`, `.git`, `controller`, `upload`, `update`, `routes`, `windows`, `linux`, `font`, `app`, `video`, `audio`, `admin`, `dist`, `public`, `services`, `android`, `ios`, `docker` e `logs`.
- **Novos Ícones de Linguagens e Ferramentas:**
  - Adicionados **15 novos ícones**: `c`, `controller`, `cpp`, `csharp`, `dart`, `database`, `eslint`, `jest`, `kotlin`, `lua`, `nextjs`, `prisma`, `rust`, `tsconfig` e `vite`.

### 🎨 Alterado
- **Ícones Base de Pasta (`folder`, `folder-open`, `folder-root`, `folder-root-open`):**
  - Geometria e preenchimento unificados com o novo padrão visual das pastas temáticas.
- **Documentação e Marketplace:**
  - Atualizada a contagem total para **164 ícones dedicados** no `README.md` e adicionada a keyword `Folder Icons` no `package.json`.

## [1.3.2]
### 🎨 Melhorias e Correções
- **Tema de Cores (`Ozurac.json`):**
  - Corrigida a cor quase invisível (`#000080`) do escopo `header` e removido o sublinhado excessivo em `entity.name.type`.
  - Unificada a cor de `enumMember` (`#56b6c2`) entre destaque semântico e TextMate, evitando troca de cor ao carregar o Language Server.
  - Removidas regras duplicadas de comentários e `keyword.control`, além de harmonizar tags/atributos HTML com a paleta do tema.
  - Melhorado o contraste de fundo do *Peek View* (`#0e1714`) e ajustada a cor de conflitos do Git (`#ff7b86`).
  - Adicionado suporte a recursos modernos do VS Code: *Sticky Scroll*, *Inlay Hints*, *Ghost Text* (Copilot/inline completions), *Quick Input* (`Ctrl+P`) e guias ativas de pares de colchetes.
- **Tema de Ícones (`ozurac-icons.json`):**
  - Corrigidos os mapeamentos de `.dockerignore` e `.containerignore`, removidas entradas inválidas com barra (`.config/...`) em `fileNames`, corrigidos `javascriptreact`/`typescriptreact` para o ícone `react` e padronizado `package-lock.json` para o ícone `lock`.
- **Documentação e Marketplace:**
  - Expandidas as `keywords` no `package.json`, atualizada a contagem de ícones no `README.md` e padronizada a formatação do `CHANGELOG.md`.

## [1.3.1]
### 🎨 Alterado
- Ícones redesenhados: `certificate`, `license`.
- Cores de sintaxe revisadas (variáveis, propriedades, keywords, números, classes, constantes, funções, métodos, strings, operadores, funções especiais e comentários), seguindo a identidade verde do tema e reaproveitando os acentos já usados nos pares de colchetes (amarelo, ciano, laranja).
- Paleta ANSI do terminal atualizada (vermelho, amarelo, azul, ciano, magenta), harmonizando com o restante do tema.
- Cada regra de `tokenColors` agora tem um campo `name` descritivo, facilitando a manutenção do arquivo.

## [1.3.0]
### ✨ Adicionado
- Novos ícones: 3D, Android, Chrome, Disc, Django, Docker, Draw.io, EditorConfig, .env, EPUB, EXE, Figma, Font, Go, GraphQL, PHP, Prettier, TOML, Vue, WebAssembly e Template.
- Ícones de pasta raiz (`folder-root` e `folder-root-open`), restaurando a distinção visual da pasta raiz do workspace.
### 🎨 Alterado
- Ícones redesenhados: `dll`, `folder-open`, `folder`, `illustrator`, `json`, `key`, `license`, `nodejs`, `photoshop`, `powerpoint`, `python`, `react`, `svg`, `tailwindcss`, `txt`, `typescript`, `xml`, `yaml`.

## [1.2.0]
### ✨ Adicionado
- Novos ícones de extensão: Angular, Áudio, Console (scripts de shell/terminal), DLL, E-mail, Illustrator, npm, Photoshop, React, URL, Vídeo e ZIP (+ formatos de compactação relacionados).
### 🎨 Alterado
- Ícones redesenhados: `certificate`, `changelog`, `excel`, `file`, `image`, `key`, `lock`, `markdown`, `pdf`, `powerpoint`, `powershell`, `readme`, `settings`, `txt`, `word`, `xml`, `yaml`.

## [1.1.1]
### 🎨 Alterado
- Novo ícone da extensão (prompt de terminal `$_` em verde), substituindo o anterior.

## [1.1.0]
### ✨ Adicionado
- File Icon Theme "Ozurac Icons" (`ozurac-icons/`), com +30 ícones cobrindo pastas, arquivo genérico e dezenas de extensões/nomes de arquivo (JS/TS, JSON, HTML, CSS, Markdown, Python, PowerShell, YAML, XML, SVG, imagens, PDF, Word, licença, lock-files, chaves/certificados, configs, Node.js, Java, Tailwind CSS, README, CHANGELOG, entre outros).
- Cores ANSI do terminal alinhadas à paleta do tema (antes usavam o padrão default do VS Code).

## [1.0.4]
### 🎨 Melhorias
- Corrigida cor órfã (marrom) do `listFilterWidget.background`, que destoava da paleta preto+verde.
- Adicionadas cores de bracket pair colorization alinhadas ao tema (antes usava azul/laranja/roxo padrão do VS Code).
- Status bar em modo debug agora tem cor distinta, restaurando o aviso visual de "depuração ativa".
- `terminal.background` definido explicitamente.
### 📦 Alterado
- Versão mínima do VS Code reduzida de `^1.103.0` para `^1.75.0`, ampliando a compatibilidade.

## [1.0.3]
### 🎨 Melhorias
- Ajustado e refinado o uso da cor verde para melhor destaque visual e consistência na interface.

## [1.0.2]
### 🎨 Alterações
- Adaptação da paleta de cores.
- Melhoria no contraste e destaque visual dos elementos principais.

## [1.0.1]
### ✨ Adicionado
- Inclusão da licença MIT.
- Criação do repositório oficial do projeto.
- Adição de badges informativos no README.
### 🎨 Alterado
- Atualização da paleta de cores.

## [1.0.0]
### 🚀 Lançamento
- Versão inicial
```[cite: 23]