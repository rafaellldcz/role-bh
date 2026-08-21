# AGENTS.md

## Projeto

O Rolê BH é um produto digital em construção para o contexto de lazer e experiências em Belo
Horizonte. O repositório possui os bootstraps técnicos da landing page e da aplicação mobile; as
funcionalidades comerciais ainda não existem.

O estado do repositório e esta documentação são a fonte da verdade técnica. O Plano Mestre e as
instruções fornecidas pelo ChatGPT Work definem produto, etapas, escopo e critérios de aceite.

## Estado e estrutura atuais

- Monorepo pnpm com workspaces em `apps/*` e `packages/*`.
- `apps/landing` contém Next.js com App Router, TypeScript e Tailwind CSS.
- `apps/mobile` contém Expo SDK 57, React Native, Expo Router e TypeScript.
- `packages/design-tokens` contém o contrato semântico tipado compartilhado entre as aplicações.
- Cada aplicação mantém implementações próprias de `Button`, `Text`, `Container` e `Card`.
- A raiz concentra configurações de TypeScript, ESLint, Prettier e o verificador de segredos.
- O CI básico executa os gates do repositório no GitHub Actions.
- Não existem backend, Supabase, testes de produto, proteção de branch ou deploy.

Leia, nesta ordem:

1. [README.md](README.md)
2. [Quality Gates](docs/QUALITY_GATES.md)
3. [Arquitetura](docs/ARCHITECTURE.md)
4. [Segurança](docs/SECURITY.md)
5. [Stack técnica](docs/TECH_STACK.md)
6. [Design System](docs/DESIGN_SYSTEM.md)

## Ambiente e comandos

Use obrigatoriamente Node.js `24.19.0` e pnpm `11.22.0`. No Windows, abra um novo PowerShell e
entre no projeto com `cd C:\ProjetosPessoais\RoleBH`; a integração do `fnm` depende de `cd`.

Comandos existentes no `package.json`:

- Execução: `pnpm dev:landing`, `pnpm build:landing`, `pnpm start:landing`,
  `pnpm start:mobile` e `pnpm android:mobile`.
- Validação por aplicação: `pnpm lint:landing`, `pnpm typecheck:landing`,
  `pnpm lint:mobile`, `pnpm typecheck:mobile`, `pnpm check:expo` e `pnpm doctor:mobile`.
- Gates agregados: `pnpm check:root`, `pnpm check:landing`, `pnpm check:mobile` e
  `pnpm check`.
- Modificação: `pnpm format` e `pnpm lint:fix`.

Os atalhos da raiz delegam aos scripts internos dos workspaces por `pnpm --filter`. Não duplique
esses comandos nas aplicações.

Scripts internos equivalentes da landing:

- `pnpm --filter @rolebh/landing dev`
- `pnpm --filter @rolebh/landing build`
- `pnpm --filter @rolebh/landing start`
- `pnpm --filter @rolebh/landing lint`
- `pnpm --filter @rolebh/landing typecheck`

Scripts internos equivalentes do mobile:

- `pnpm --filter @rolebh/mobile start`
- `pnpm --filter @rolebh/mobile android`
- `pnpm --filter @rolebh/mobile lint`
- `pnpm --filter @rolebh/mobile typecheck`

Antes de encerrar uma tarefa, execute os gates aplicáveis. O mínimo atual para mudanças no
repositório é:

```powershell
pnpm check
git diff --check
```

`pnpm check` executa sequencialmente `check:root`, `check:landing` e `check:mobile`. Isso inclui
formatação, lint, typecheck, segredos, lint/typecheck/build da landing e lint/typecheck/matriz
Expo/Expo Doctor do mobile.

O workflow `CI` repete esses gates em `ubuntu-latest` para pushes em `main`, pull requests
destinados a `main` e execuções manuais. Ele possui somente `contents: read`, não usa secrets e
não implementa testes de produto, deploy ou proteção de branch.

Consulte [docs/QUALITY_GATES.md](docs/QUALITY_GATES.md) para o fluxo completo.

## Responsabilidades principais

- `package.json`: versões, scripts e dependências da raiz.
- `pnpm-workspace.yaml`: limites dos workspaces.
- `tsconfig.base.json`: regras TypeScript compartilháveis e estritas.
- `tsconfig.json`: validação das ferramentas Node da raiz.
- `eslint.config.mjs`: análise estática com zero warnings.
- `.prettierrc.json` e `.prettierignore`: formatação.
- `.gitignore` e `scripts/check-secrets.mjs`: proteção inicial contra material sensível.
- `.github/workflows/ci.yml`: CI básico dos Quality Gates com permissões somente leitura.
- `apps/landing/package.json`: dependências e scripts exclusivos da landing.
- `apps/landing/src/app/`: layout global, estilos Tailwind e rota `/`.
- `apps/landing/src/components/`: quatro componentes Web da fundação visual.
- `apps/mobile/package.json`: dependências e scripts exclusivos do mobile.
- `apps/mobile/src/app/`: layout do Expo Router e rota inicial mobile.
- `apps/mobile/src/components/`: quatro componentes React Native da fundação visual.
- `apps/mobile/app.json`: metadados e configurações do Expo.
- `packages/design-tokens/`: cores, tipografia, espaçamento, raios, elevação e interação
  compartilhados por contrato, sem implementação visual multiplataforma.
- `docs/`: arquitetura, segurança, stack e gates vigentes.

## Regras de execução

- Execute somente o escopo solicitado e preserve alterações preexistentes.
- Não inicie automaticamente a etapa seguinte, mesmo após concluir a atual.
- Não enfraqueça gates, ignores ou configurações para aprovar uma mudança.
- Não invente infraestrutura, comandos, versões ou funcionalidades.
- Não apresente tecnologia planejada como instalada ou implementada.
- Mudanças estruturais não previstas devem ser reportadas ao ChatGPT Work, não decididas
  unilateralmente.
- Ao finalizar, informe gates executados e resultados individuais, arquivos alterados, diff
  relevante, branch, HEAD, upstream e estado do Git.
