# Rolê BH

O Rolê BH é um produto digital em construção para o contexto de lazer e experiências em Belo
Horizonte. A direção aprovada do MVP prevê uma presença web inicial e uma experiência mobile,
desenvolvidas em etapas independentes sobre uma base compartilhada.

Este repositório contém apenas a fundação técnica do monorepo. Ainda não existem landing page,
aplicação mobile, backend, autenticação, banco de dados ou infraestrutura de deploy.

## Estado atual

- Monorepo pnpm inicializado e sincronizado com um repositório privado no GitHub.
- Node.js e pnpm fixados para o projeto.
- TypeScript estrito, ESLint, Prettier e proteção inicial contra segredos configurados.
- `apps/` e `packages/` são placeholders vazios.
- Nenhum código ou teste de produto foi criado.
- Não existem CI, proteção de branch, Supabase ou deploy.

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

Esse comando instala somente a fundação de qualidade já declarada. Não há aplicação para iniciar.

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

## Estrutura

```text
RoleBH/
├── apps/                       # placeholder para aplicações
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
6. Execute `pnpm check` e `git diff --check`.
7. Revise o diff, os arquivos alterados e o estado do Git antes de encerrar.

## Documentação

- [Quality Gates](docs/QUALITY_GATES.md)
- [Arquitetura](docs/ARCHITECTURE.md)
- [Segurança](docs/SECURITY.md)
- [Stack técnica](docs/TECH_STACK.md)
- [Instruções para agentes](AGENTS.md)

## Limitações conhecidas

- Landing, mobile e backend ainda não existem; portanto não há comando de execução ou build.
- Não existem testes automatizados de produto nem CI remoto.
- A proteção contra segredos é local, baseada em poucos padrões de alta confiança e não substitui
  um scanner dedicado.
- O Android Toolchain foi validado fora do repositório, mas ainda não existe projeto Android.
- O fluxo em iPhone físico não foi validado e depende futuramente de projeto compatível e rede
  privada confiável.
