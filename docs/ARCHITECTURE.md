# Arquitetura

## Estado vigente

O Rolê BH é um monorepo pnpm com uma raiz compartilhada. O arquivo
`pnpm-workspace.yaml` reconhece projetos diretamente abaixo de `apps/*` e `packages/*`.
Atualmente, os dois diretórios contêm somente `.gitkeep`: não há aplicação nem pacote real.

```text
RoleBH/
├── apps/
│   └── .gitkeep
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
e configurações de qualidade.

## TypeScript em duas camadas

### Base compartilhada

`tsconfig.base.json` contém regras independentes de plataforma:

- modo estrito e verificações adicionais de segurança de tipos;
- consistência de nomes;
- ausência de emissão de JavaScript;
- `skipLibCheck` para bibliotecas.

Futuras aplicações podem estender essa base e declarar suas próprias opções de plataforma.

### Ferramentas da raiz

`tsconfig.json` estende a base e configura o ambiente Node da raiz:

- alvo e biblioteca ES2024;
- módulos e resolução `NodeNext`;
- validação de JavaScript com `allowJs` e `checkJs`;
- tipos do Node;
- inclusão restrita a `eslint.config.mjs` e `scripts/**/*.mjs`.

Esse arquivo não é uma configuração pronta para web ou React Native. Aplicações futuras devem
estender `tsconfig.base.json`, em vez de herdar opções Node incompatíveis.

## Responsabilidades da raiz

| Arquivo ou diretório        | Responsabilidade vigente                                |
| --------------------------- | ------------------------------------------------------- |
| `package.json`              | Metadados, versões, scripts e dependências da fundação  |
| `pnpm-lock.yaml`            | Resolução reproduzível das dependências atuais          |
| `pnpm-workspace.yaml`       | Descoberta de aplicações e pacotes de primeiro nível    |
| `tsconfig.base.json`        | Regras TypeScript compartilháveis                       |
| `tsconfig.json`             | Typecheck das ferramentas Node da raiz                  |
| `eslint.config.mjs`         | ESLint Flat Config para JavaScript e TypeScript         |
| `.prettierrc.json`          | Estilo de formatação                                    |
| `.prettierignore`           | Saídas e artefatos excluídos do Prettier                |
| `.gitignore`                | Dependências, segredos locais, builds e arquivos locais |
| `scripts/check-secrets.mjs` | Verificação inicial de material sensível                |
| `apps/`                     | Espaço reservado para aplicações, ainda vazio           |
| `packages/`                 | Espaço reservado para código compartilhado, ainda vazio |

## Direção aprovada — ainda não implementada

A direção arquitetural aprovada separa:

- uma landing page em `apps/landing`;
- uma aplicação mobile em `apps/mobile`;
- pacotes reutilizáveis em `packages/*`, somente quando surgir compartilhamento real.

Essa estrutura é planejamento, não estado atual. Os diretórios `apps/landing` e `apps/mobile`
não existem e nenhuma dependência de aplicação foi instalada.

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

- landing, aplicação mobile ou pacote compartilhado real;
- componentes de interface, rotas ou navegação;
- API, backend, autenticação, banco, storage ou Supabase;
- schema, migrações, Edge Functions ou políticas RLS;
- testes de produto ou configuração de build;
- CI, workflows, proteção de branch ou deploy;
- diretórios nativos Android/iOS pertencentes ao produto.

O Android SDK e o AVD validados pertencem ao ambiente local, não à arquitetura versionada.
