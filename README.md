# Rolê BH

O Rolê BH é um produto digital em construção para o contexto de lazer e experiências em Belo
Horizonte. A direção aprovada do MVP prevê uma presença web inicial e uma experiência mobile,
desenvolvidas em etapas independentes sobre uma base compartilhada.

Este repositório contém a fundação técnica do monorepo e os bootstraps da landing page e da
aplicação mobile. As duas aplicações renderizam telas mínimas para validar suas stacks; ainda não
implementam funcionalidades comerciais.

## Estado atual

- Monorepo pnpm inicializado e sincronizado com um repositório privado no GitHub.
- Landing técnica em `apps/landing`, com App Router e rota `/`.
- Aplicação técnica em `apps/mobile`, com Expo SDK 57, React Native e rota inicial do Expo Router.
- Node.js e pnpm fixados para o projeto.
- TypeScript estrito, ESLint, Prettier e proteção inicial contra segredos configurados.
- CI básico configurado no GitHub Actions para executar os Quality Gates.
- `packages/` permanece como placeholder vazio.
- Nenhum teste de produto foi criado.
- Não existem proteção de branch, Supabase ou deploy.
- Backend, autenticação e banco de dados ainda não existem.

## Requisitos locais

- Windows com PowerShell e integração do `fnm`.
- Node.js `24.19.0`.
- pnpm `11.22.0`.
- Git.

No Windows, abra um novo PowerShell e entre no projeto com `cd`. A integração oficial do
`fnm` intercepta esse comando, mas não o cmdlet explícito `Set-Location`.

```powershell
cd 'C:\ProjetosPessoais\RoleBH'
node --version
pnpm --version
```

As versões esperadas são `v24.19.0` e `11.22.0`.

## Instalação

Com as versões corretas ativas, restaure exatamente as dependências do lockfile sem executar
scripts de ciclo de vida:

```powershell
pnpm install --frozen-lockfile --ignore-scripts
```

Esse comando restaura os três projetos com manifesto (`RoleBH`, `@rolebh/landing` e
`@rolebh/mobile`) pelo lockfile único, sem executar scripts de ciclo de vida.

## Comandos disponíveis

| Comando              | Tipo        | Finalidade                                             |
| -------------------- | ----------- | ------------------------------------------------------ |
| `pnpm format`        | Modificador | Formata arquivos com Prettier.                         |
| `pnpm format:check`  | Validação   | Verifica a formatação sem alterar arquivos.            |
| `pnpm lint`          | Validação   | Executa o ESLint da raiz sem permitir warnings.        |
| `pnpm lint:fix`      | Modificador | Aplica correções oferecidas pelo ESLint.               |
| `pnpm typecheck`     | Validação   | Valida as ferramentas Node da raiz.                    |
| `pnpm check:secrets` | Validação   | Procura indícios de segredos nos candidatos.           |
| `pnpm check:root`    | Validação   | Executa formatação, lint, typecheck e segredos.        |
| `pnpm check:landing` | Validação   | Executa lint, typecheck e build da landing.            |
| `pnpm check:mobile`  | Validação   | Executa lint, typecheck e diagnósticos Expo do mobile. |
| `pnpm check`         | Validação   | Executa raiz, landing e mobile sequencialmente.        |

Os comandos modificadores devem ser usados somente dentro do escopo autorizado. Veja a composição
dos gates e suas limitações em [docs/QUALITY_GATES.md](docs/QUALITY_GATES.md).

### Landing

| Atalho da raiz           | Comando delegado                          | Finalidade                           |
| ------------------------ | ----------------------------------------- | ------------------------------------ |
| `pnpm dev:landing`       | `pnpm --filter @rolebh/landing dev`       | Inicia o servidor de desenvolvimento |
| `pnpm build:landing`     | `pnpm --filter @rolebh/landing build`     | Cria o build de produção             |
| `pnpm start:landing`     | `pnpm --filter @rolebh/landing start`     | Executa um build já criado           |
| `pnpm lint:landing`      | `pnpm --filter @rolebh/landing lint`      | Executa o ESLint com zero warnings   |
| `pnpm typecheck:landing` | `pnpm --filter @rolebh/landing typecheck` | Executa TypeScript sem emissão       |
| `pnpm check:landing`     | lint, typecheck e build em sequência      | Valida toda a landing                |

Para executar localmente:

```powershell
pnpm dev:landing
```

Abra `http://localhost:3000`.

### Mobile

| Atalho da raiz          | Comando delegado                                   | Finalidade                                |
| ----------------------- | -------------------------------------------------- | ----------------------------------------- |
| `pnpm start:mobile`     | `pnpm --filter @rolebh/mobile start`               | Inicia o servidor de desenvolvimento Expo |
| `pnpm android:mobile`   | `pnpm --filter @rolebh/mobile android`             | Abre o projeto no Android                 |
| `pnpm lint:mobile`      | `pnpm --filter @rolebh/mobile lint`                | Executa o ESLint com zero warnings        |
| `pnpm typecheck:mobile` | `pnpm --filter @rolebh/mobile typecheck`           | Executa TypeScript sem emissão            |
| `pnpm check:expo`       | `expo install --check` filtrado para o mobile      | Valida versões compatíveis com o Expo     |
| `pnpm doctor:mobile`    | Expo Doctor `1.20.2` executado em `apps/mobile`    | Executa o diagnóstico oficial fixado      |
| `pnpm check:mobile`     | lint, typecheck, matriz Expo e Doctor em sequência | Valida todo o mobile                      |

Para iniciar no AVD Android configurado:

```powershell
pnpm android:mobile
```

A rota inicial exibe `Rolê BH — Mobile funcionando.`. O bootstrap foi validado no AVD
`RoleBH_API_36`, API 36 e `x86_64`, incluindo Fast Refresh. O iPhone físico não foi validado com
SDK 57 nesta etapa.

## Estrutura

```text
RoleBH/
├── .github/workflows/
│   └── ci.yml                   # CI básico dos Quality Gates
├── apps/
│   ├── landing/               # bootstrap técnico Next.js
│   └── mobile/                # bootstrap técnico Expo/React Native
├── packages/                   # placeholder para código compartilhado
├── docs/                       # documentação operacional
├── scripts/
│   └── check-secrets.mjs       # proteção inicial contra segredos
├── AGENTS.md                   # mapa operacional para agentes
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── tsconfig.json
```

Configurações editoriais e de versionamento também ficam na raiz. A estrutura completa e as
responsabilidades estão em [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Fluxo básico de desenvolvimento

1. Entre no projeto com `cd` e confirme Node e pnpm.
2. Confirme o escopo, a branch e o estado da working tree.
3. Execute o frozen install quando precisar restaurar dependências.
4. Faça apenas a alteração autorizada.
5. Use comandos modificadores somente sobre arquivos no escopo.
6. Execute `pnpm check`, que valida raiz, landing e mobile sequencialmente.
7. Execute `git diff --check`.
8. Revise o diff, os arquivos alterados e o estado do Git antes de encerrar.

## CI básico

O workflow `CI` executa em pushes para `main`, pull requests destinados a `main` e acionamento
manual. O único job, `quality`, usa `ubuntu-latest`, instala o lockfile sem lifecycle scripts e
executa `pnpm check`, o self-test de segredos e a integridade do diff.

O workflow possui somente `contents: read`, não recebe secrets e não executa testes de produto,
deploy ou upload de artefatos. A proteção da branch `main` ainda não está configurada.

## Documentação

- [Quality Gates](docs/QUALITY_GATES.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Segurança](docs/SECURITY.md)
- [Stack técnica](docs/TECH_STACK.md)
- [Instruções para agentes](AGENTS.md)

## Limitações conhecidas

- A landing contém somente o bootstrap técnico; não há conteúdo comercial, formulário ou imagens.
- O mobile contém somente o bootstrap técnico; não há fluxo de produto, dados ou integração.
- Não existem testes automatizados de produto; o CI executa somente os gates técnicos existentes.
- A proteção contra segredos é local, baseada em poucos padrões de alta confiança e não substitui
  um scanner dedicado.
- O Android foi validado com Expo Go no AVD local; não existem diretórios nativos versionados.
- O fluxo em iPhone físico com Expo SDK 57 não foi validado e permanece um bloqueio externo.
