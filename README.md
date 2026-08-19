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
- `packages/` permanece como placeholder vazio.
- Nenhum teste de produto foi criado.
- Não existem CI, proteção de branch, Supabase ou deploy.
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

| Comando              | Tipo        | Finalidade                                   |
| -------------------- | ----------- | -------------------------------------------- |
| `pnpm format`        | Modificador | Formata arquivos com Prettier.               |
| `pnpm format:check`  | Validação   | Verifica a formatação sem alterar arquivos.  |
| `pnpm lint`          | Validação   | Executa o ESLint sem permitir warnings.      |
| `pnpm lint:fix`      | Modificador | Aplica correções oferecidas pelo ESLint.     |
| `pnpm typecheck`     | Validação   | Valida as ferramentas Node da raiz.          |
| `pnpm check:secrets` | Validação   | Procura indícios de segredos nos candidatos. |
| `pnpm check`         | Validação   | Executa os quatro gates locais agregados.    |

Os comandos modificadores devem ser usados somente dentro do escopo autorizado. Veja a composição
dos gates e suas limitações em [docs/QUALITY_GATES.md](docs/QUALITY_GATES.md).

### Landing

| Comando                                   | Finalidade                           |
| ----------------------------------------- | ------------------------------------ |
| `pnpm --filter @rolebh/landing dev`       | Inicia o servidor de desenvolvimento |
| `pnpm --filter @rolebh/landing build`     | Cria o build de produção             |
| `pnpm --filter @rolebh/landing start`     | Executa um build já criado           |
| `pnpm --filter @rolebh/landing lint`      | Executa o ESLint com zero warnings   |
| `pnpm --filter @rolebh/landing typecheck` | Executa TypeScript sem emissão       |

Para executar localmente:

```powershell
pnpm --filter @rolebh/landing dev
```

Abra `http://localhost:3000`. Não existe atalho na raiz para esse comando.

### Mobile

| Comando                                                  | Finalidade                                |
| -------------------------------------------------------- | ----------------------------------------- |
| `pnpm --filter @rolebh/mobile start`                     | Inicia o servidor de desenvolvimento Expo |
| `pnpm --filter @rolebh/mobile android`                   | Abre o projeto no Android                 |
| `pnpm --filter @rolebh/mobile lint`                      | Executa o ESLint com zero warnings        |
| `pnpm --filter @rolebh/mobile typecheck`                 | Executa TypeScript sem emissão            |
| `pnpm --filter @rolebh/mobile exec expo install --check` | Valida versões compatíveis com o Expo     |
| `pnpm dlx expo-doctor@1.20.2 .` em `apps/mobile`         | Executa o diagnóstico oficial fixado      |

Para iniciar no AVD Android configurado:

```powershell
pnpm --filter @rolebh/mobile android
```

A rota inicial exibe `Rolê BH — Mobile funcionando.`. O bootstrap foi validado no AVD
`RoleBH_API_36`, API 36 e `x86_64`, incluindo Fast Refresh. O iPhone físico não foi validado com
SDK 57 nesta etapa.

## Estrutura

```text
RoleBH/
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
6. Execute os gates específicos do workspace alterado.
7. No mobile, execute lint, typecheck, `expo install --check` e Expo Doctor.
8. Execute `pnpm check` e `git diff --check`.
9. Revise o diff, os arquivos alterados e o estado do Git antes de encerrar.

## Documentação

- [Quality Gates](docs/QUALITY_GATES.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Segurança](docs/SECURITY.md)
- [Stack técnica](docs/TECH_STACK.md)
- [Instruções para agentes](AGENTS.md)

## Limitações conhecidas

- A landing contém somente o bootstrap técnico; não há conteúdo comercial, formulário ou imagens.
- O mobile contém somente o bootstrap técnico; não há fluxo de produto, dados ou integração.
- Não existem testes automatizados de produto nem CI remoto.
- A proteção contra segredos é local, baseada em poucos padrões de alta confiança e não substitui
  um scanner dedicado.
- O Android foi validado com Expo Go no AVD local; não existem diretórios nativos versionados.
- O fluxo em iPhone físico com Expo SDK 57 não foi validado e permanece um bloqueio externo.
