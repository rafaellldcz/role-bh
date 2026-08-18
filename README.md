# Rolê BH

Monorepo do Rolê BH.

## Estrutura

- `apps/`: aplicações do produto.
- `packages/`: pacotes compartilhados entre as aplicações.

As aplicações e os pacotes serão criados em etapas posteriores.

## Ambiente

- Node.js 24.19.0
- pnpm 11.22.0
- pnpm Workspaces

Abra um novo PowerShell e entre no projeto com `cd C:\ProjetosPessoais\RoleBH`. A
integração do `fnm` usa o comando `cd` para ativar automaticamente as versões do projeto.

## Qualidade

| Comando              | Tipo        | Finalidade                                       |
| -------------------- | ----------- | ------------------------------------------------ |
| `pnpm format`        | Modificador | Formata os arquivos com Prettier.                |
| `pnpm format:check`  | Validação   | Verifica a formatação sem alterar arquivos.      |
| `pnpm lint`          | Validação   | Executa o ESLint sem permitir warnings.          |
| `pnpm lint:fix`      | Modificador | Aplica correções seguras oferecidas pelo ESLint. |
| `pnpm typecheck`     | Validação   | Valida as ferramentas Node com TypeScript.       |
| `pnpm check:secrets` | Validação   | Procura indícios de segredos nos arquivos.       |
| `pnpm check`         | Validação   | Executa todos os gates locais somente leitura.   |

Execute `pnpm check` antes de criar commits. Os comandos de validação não alteram arquivos;
somente `format` e `lint:fix` são modificadores explícitos.

A verificação de segredos é uma proteção inicial baseada em padrões de alta confiança. Ela não
substitui um scanner dedicado, que poderá ser adotado futuramente.

## Estado atual

Repositório local com a base de qualidade configurada. As aplicações ainda não existem.
