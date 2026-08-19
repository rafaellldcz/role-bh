# AGENTS.md

## Projeto

O Rolê BH é um produto digital em construção para o contexto de lazer e experiências em Belo
Horizonte. A direção aprovada do MVP prevê uma landing page e uma aplicação mobile, mas nenhuma
aplicação ou funcionalidade de produto existe no repositório atualmente.

O estado do repositório e esta documentação são a fonte da verdade técnica. O Plano Mestre e as
instruções fornecidas pelo ChatGPT Work definem produto, etapas, escopo e critérios de aceite.

## Estado e estrutura atuais

- Monorepo pnpm com workspaces em `apps/*` e `packages/*`.
- `apps/` e `packages/` contêm somente arquivos `.gitkeep`.
- A raiz concentra configurações de TypeScript, ESLint, Prettier e o verificador de segredos.
- Não existem landing, mobile, backend, Supabase, CI, testes de produto ou deploy.

Leia, nesta ordem:

1. [README.md](README.md)
2. [Quality Gates](docs/QUALITY_GATES.md)
3. [Arquitetura](docs/ARCHITECTURE.md)
4. [Segurança](docs/SECURITY.md)
5. [Stack técnica](docs/TECH_STACK.md)

## Ambiente e comandos

Use obrigatoriamente Node.js `24.19.0` e pnpm `11.22.0`. No Windows, abra um novo PowerShell e
entre no projeto com `cd C:\ProjetosPessoais\RoleBH`; a integração do `fnm` depende de `cd`.

Comandos existentes no `package.json`:

- Validação: `pnpm format:check`, `pnpm lint`, `pnpm typecheck`,
  `pnpm check:secrets` e `pnpm check`.
- Modificação: `pnpm format` e `pnpm lint:fix`.

Antes de encerrar uma tarefa, execute os gates aplicáveis. O mínimo atual para mudanças no
repositório é:

```powershell
pnpm check
git diff --check
```

Consulte [docs/QUALITY_GATES.md](docs/QUALITY_GATES.md) para o fluxo completo.

## Responsabilidades principais

- `package.json`: versões, scripts e dependências da raiz.
- `pnpm-workspace.yaml`: limites dos workspaces.
- `tsconfig.base.json`: regras TypeScript compartilháveis e estritas.
- `tsconfig.json`: validação das ferramentas Node da raiz.
- `eslint.config.mjs`: análise estática com zero warnings.
- `.prettierrc.json` e `.prettierignore`: formatação.
- `.gitignore` e `scripts/check-secrets.mjs`: proteção inicial contra material sensível.
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
