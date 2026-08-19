# Arquitetura

## Estado vigente

O Rolê BH é um monorepo pnpm com uma raiz compartilhada. O arquivo
`pnpm-workspace.yaml` reconhece projetos diretamente abaixo de `apps/*` e `packages/*`.
`apps/landing` e `apps/mobile` são as aplicações vigentes; `packages/` ainda contém somente
`.gitkeep`.

```text
RoleBH/
├── apps/
│   ├── landing/
│   │   ├── src/app/
│   │   ├── eslint.config.mjs
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   ├── postcss.config.mjs
│   │   └── tsconfig.json
│   └── mobile/
│       ├── src/app/
│       ├── app.json
│       ├── eslint.config.mjs
│       ├── package.json
│       └── tsconfig.json
├── packages/
│   └── .gitkeep
├── docs/
├── scripts/
│   └── check-secrets.mjs
├── configurações compartilhadas
├── package.json
└── pnpm-lock.yaml
```

Não há orquestrador adicional de monorepo. A raiz fornece um único lockfile, scripts operacionais
e configurações de qualidade. Não existe lockfile interno nas aplicações.

## TypeScript em duas camadas

### Base compartilhada

`tsconfig.base.json` contém regras independentes de plataforma:

- modo estrito e verificações adicionais de segurança de tipos;
- consistência de nomes;
- ausência de emissão de JavaScript;
- `skipLibCheck` para bibliotecas.

A landing estende essa base e declara somente as opções necessárias ao Next.js. O mobile combina
`expo/tsconfig.base` com a base compartilhada da raiz e declara somente inclusões da plataforma.

### Ferramentas da raiz

`tsconfig.json` estende a base e configura o ambiente Node da raiz:

- alvo e biblioteca ES2024;
- módulos e resolução `NodeNext`;
- validação de JavaScript com `allowJs` e `checkJs`;
- tipos do Node;
- inclusão restrita a `eslint.config.mjs` e `scripts/**/*.mjs`.

Esse arquivo não é uma configuração pronta para web ou React Native. A landing estende diretamente
`tsconfig.base.json`, e o mobile estende `expo/tsconfig.base` e `tsconfig.base.json`; nenhuma
aplicação estende o `tsconfig.json` Node da raiz.

## Responsabilidades da raiz

| Arquivo ou diretório             | Responsabilidade vigente                                |
| -------------------------------- | ------------------------------------------------------- |
| `package.json`                   | Metadados, versões, scripts e dependências da fundação  |
| `pnpm-lock.yaml`                 | Resolução reproduzível das dependências atuais          |
| `pnpm-workspace.yaml`            | Descoberta de aplicações e pacotes de primeiro nível    |
| `tsconfig.base.json`             | Regras TypeScript compartilháveis                       |
| `tsconfig.json`                  | Typecheck das ferramentas Node da raiz                  |
| `eslint.config.mjs`              | ESLint Flat Config para JavaScript e TypeScript         |
| `.prettierrc.json`               | Estilo de formatação                                    |
| `.prettierignore`                | Saídas e artefatos excluídos do Prettier                |
| `.gitignore`                     | Dependências, segredos locais, builds e arquivos locais |
| `scripts/check-secrets.mjs`      | Verificação inicial de material sensível                |
| `apps/landing/package.json`      | Dependências e scripts internos da aplicação            |
| `apps/landing/src/app/`          | App Router, layout, estilo global e rota `/`            |
| `apps/landing/tsconfig.json`     | TypeScript web estendendo a base compartilhada          |
| `apps/landing/eslint.config.mjs` | Regras oficiais Next.js, React e TypeScript             |
| `apps/mobile/package.json`       | Expo, React Native, Expo Router e scripts internos      |
| `apps/mobile/src/app/`           | Layout e rota inicial pelo Expo Router                  |
| `apps/mobile/app.json`           | Metadados, scheme e plugin do Expo Router               |
| `apps/mobile/tsconfig.json`      | TypeScript Expo estendendo as duas bases                |
| `apps/mobile/eslint.config.mjs`  | Flat Config oficial do Expo com zero warnings           |
| `packages/`                      | Espaço reservado para código compartilhado, ainda vazio |

## Aplicação landing vigente

A landing usa Next.js com App Router e código sob `src/`. A rota `/` é uma página estática
mínima, sem API Routes, fontes remotas, backend ou conteúdo comercial. Tailwind CSS é processado
pelo plugin oficial de PostCSS.

Os scripts `dev`, `build`, `start`, `lint` e `typecheck` pertencem ao workspace
`@rolebh/landing`. Atalhos agregados na raiz ainda não existem.

## Aplicação mobile vigente

O mobile usa Expo SDK 57, React Native e Expo Router com código sob `src/`. A rota inicial é uma
tela mínima protegida por `SafeAreaView`, sem navegação de produto, dados ou integração externa.
O `scheme` `rolebh` atende ao requisito de linking em builds futuros.

Os scripts `start`, `android`, `lint` e `typecheck` pertencem ao workspace `@rolebh/mobile`.
Autolinking e Metro usam o suporte nativo a monorepos do Expo; não há configuração Metro própria.
Também não existem diretórios `android/` ou `ios/`, prebuild, EAS ou Development Build.

## Direção aprovada — parcialmente implementada

A direção arquitetural aprovada separa:

- uma aplicação mobile em `apps/mobile`;
- pacotes reutilizáveis em `packages/*`, somente quando surgir compartilhamento real.

Landing e mobile já existem como bootstraps técnicos. Pacotes compartilhados reais ainda não
existem.

Código potencialmente compartilhável inclui:

- tipos e contratos de domínio independentes de plataforma;
- validações e utilitários puros;
- constantes sem segredo;
- configurações de qualidade reutilizáveis;
- clientes ou adaptadores somente quando a fronteira entre plataformas estiver definida.

Componentes visuais, navegação e integrações específicas de web ou mobile devem permanecer na
aplicação correspondente, salvo decisão arquitetural posterior.

## Fonte da verdade técnica

O comportamento executável dos arquivos versionados é a fonte primária do estado atual:

- workspaces e dependências: `pnpm-workspace.yaml`, `package.json` e lockfile;
- compilação: arquivos `tsconfig`;
- lint e formatação: configurações de ESLint e Prettier;
- segurança inicial: `.gitignore` e `scripts/check-secrets.mjs`;
- operação: [README.md](../README.md), [Quality Gates](QUALITY_GATES.md),
  [Segurança](SECURITY.md) e [Stack técnica](TECH_STACK.md).

O Plano Mestre e as instruções do ChatGPT Work definem mudanças futuras e escopo. Se a
documentação divergir do código, reporte a divergência antes de decidir uma mudança estrutural.

## Componentes inexistentes

Ainda não existem:

- pacote compartilhado real;
- componentes reutilizáveis, navegação de produto ou rotas além das telas mínimas;
- API, backend, autenticação, banco, storage ou Supabase;
- schema, migrações, Edge Functions ou políticas RLS;
- testes de produto;
- CI, workflows, proteção de branch ou deploy;
- diretórios nativos Android/iOS pertencentes ao produto.

O Android SDK, o AVD e o Expo Go usados na validação pertencem ao ambiente local, não à
arquitetura versionada.
