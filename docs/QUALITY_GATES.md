# Quality Gates

## Finalidade

Os Quality Gates protegem a consistência da fundação técnica antes de qualquer entrega. Gates
falhos bloqueiam a conclusão da tarefa; não devem ser ignorados ou enfraquecidos para produzir um
resultado verde.

## Gates ativos

| Gate                 | Comando                                                  | Escopo e critério                                        |
| -------------------- | -------------------------------------------------------- | -------------------------------------------------------- |
| Frozen install       | `pnpm install --frozen-lockfile --ignore-scripts`        | Lockfile e políticas pnpm vigentes, sem lifecycle script |
| Formatação           | `pnpm format:check`                                      | Prettier não encontra arquivos fora do padrão            |
| Lint                 | `pnpm lint`                                              | ESLint aprova com zero warnings                          |
| Typecheck            | `pnpm typecheck`                                         | TypeScript aprova as ferramentas Node da raiz            |
| Segredos             | `pnpm check:secrets`                                     | Nenhum indício coberto pelo verificador é encontrado     |
| Gate da raiz         | `pnpm check:root`                                        | Executa formatação, lint, typecheck e segredos           |
| Gate da landing      | `pnpm check:landing`                                     | Executa lint, typecheck e build da landing               |
| Gate do mobile       | `pnpm check:mobile`                                      | Executa lint, typecheck, versões Expo e Expo Doctor      |
| Gate completo        | `pnpm check`                                             | Executa raiz, landing e mobile sequencialmente           |
| Lint da landing      | `pnpm --filter @rolebh/landing lint`                     | Regras Next.js aprovam com zero warnings                 |
| Typecheck da landing | `pnpm --filter @rolebh/landing typecheck`                | TypeScript web aprova sem emissão                        |
| Build da landing     | `pnpm --filter @rolebh/landing build`                    | Build de produção e rota estática são gerados            |
| Lint do mobile       | `pnpm --filter @rolebh/mobile lint`                      | Regras Expo aprovam com zero warnings                    |
| Typecheck do mobile  | `pnpm --filter @rolebh/mobile typecheck`                 | TypeScript React Native aprova sem emissão               |
| Versões Expo         | `pnpm --filter @rolebh/mobile exec expo install --check` | Dependências estão alinhadas ao SDK instalado            |
| Expo Doctor          | `pnpm dlx expo-doctor@1.20.2 .` em `apps/mobile`         | Diagnóstico oficial fixado aprova o projeto              |
| Integridade do diff  | `git diff --check`                                       | Nenhum erro de whitespace no diff                        |

O frozen install valida o lockfile e as políticas vigentes do pnpm ao restaurar ou validar
dependências, mas não faz parte de `pnpm check`. `git diff --check` e o self-test de segredos
também devem ser executados separadamente.

## Verificação e modificação

Estes comandos são somente leitura:

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm check:secrets`
- `pnpm check:root`
- `pnpm check:landing`
- `pnpm check:mobile`
- `pnpm check`
- `pnpm --filter @rolebh/landing lint`
- `pnpm --filter @rolebh/landing typecheck`
- `pnpm --filter @rolebh/landing build`
- `pnpm --filter @rolebh/mobile lint`
- `pnpm --filter @rolebh/mobile typecheck`
- `pnpm --filter @rolebh/mobile exec expo install --check`
- `pnpm dlx expo-doctor@1.20.2 .` em `apps/mobile`
- `git diff --check`

Estes comandos alteram arquivos:

- `pnpm format`: aplica Prettier em todo o repositório não ignorado.
- `pnpm lint:fix`: aplica correções do ESLint e ainda exige zero warnings.

Comandos modificadores só podem ser usados quando seus arquivos-alvo estiverem no escopo da
tarefa. Depois deles, revise `git diff --name-only`.

## Regras confirmadas

### ESLint

`pnpm lint` usa `--max-warnings=0`; portanto qualquer warning reprova o gate. Diretivas de
desativação não utilizadas também são erros.

A landing executa ESLint diretamente com `eslint-config-next/core-web-vitals` e
`eslint-config-next/typescript`. Ela fixa ESLint `9.39.5`, pois a dependência
`eslint-plugin-react@7.37.5` usada pelo Next.js não suporta ESLint 10 em runtime. A raiz mantém
ESLint `10.8.1`; ambos os comandos exigem zero warnings.

Quando o lint parte da raiz, o config da landing reutiliza a configuração raiz para manter a
análise de todos os fontes compatível com ESLint 10. O lint interno da landing aplica
separadamente as regras completas do Next.js com ESLint 9; nenhum arquivo-fonte é ignorado.

O mobile também fixa ESLint `9.39.5` e usa `eslint-config-expo@57.0.1`. O plugin React resolvido
por essa configuração não é compatível em runtime com ESLint 10; por isso o ESLint `10.8.1` da
raiz permanece preservado e o lint completo do mobile é executado isoladamente com ESLint 9.

### TypeScript

`tsconfig.base.json` habilita `strict`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch`,
`noImplicitReturns` e `forceConsistentCasingInFileNames`. O `tsconfig.json` da raiz aplica
essas regras às configurações e aos scripts Node atuais, sem emitir arquivos.

`apps/landing/tsconfig.json` estende a base, preserva as verificações estritas e adiciona as
opções exigidas pelo Next.js, DOM, JSX e alias `@/*`.

`apps/mobile/tsconfig.json` estende simultaneamente `expo/tsconfig.base` e a base compartilhada da
raiz. Assim, preserva as opções necessárias ao React Native e as verificações estritas do projeto.

### Build da landing

Next.js 16 não executa lint durante `next build`. Por isso lint, typecheck e build são gates
separados e obrigatórios para mudanças na landing.

### Validação do mobile

Lint, typecheck, alinhamento das versões Expo e Expo Doctor são gates separados e obrigatórios
para mudanças no mobile. A validação funcional Android — renderização, terminal, logs e Fast
Refresh — complementa esses gates, mas não substitui nenhum deles. Não há build nativo como gate
nesta etapa.

### Proteção inicial contra segredos

`pnpm check:secrets` examina candidatos rastreados e não rastreados que não estejam ignorados
pelo Git. A cobertura é deliberadamente limitada; consulte [SECURITY.md](SECURITY.md).

O self-test do verificador pode ser executado sem exibir os materiais de teste:

```powershell
pnpm check:secrets --self-test
```

Ele complementa o gate normal, mas não é executado por `pnpm check`.

## Execução antes de encerrar uma tarefa

1. Confirme Node `24.19.0` e pnpm `11.22.0`.
2. Execute o frozen install se dependências precisaram ser restauradas ou validadas.
3. Execute o gate completo, o self-test do verificador e a integridade do diff:

```powershell
pnpm check
pnpm check:secrets --self-test
git diff --check
```

4. Confirme o escopo com `git diff --name-only` e `git status --short`.
5. Registre o resultado individual de formatação, lint, typecheck, segredos e diff.

Um `pnpm check` interrompido no primeiro erro não comprova os gates posteriores. Corrija a causa
dentro do escopo e execute novamente o comando completo.

### Composição sequencial

`pnpm check` não usa paralelismo:

1. `check:root`: formatação, lint da raiz, typecheck da raiz e segredos;
2. `check:landing`: lint, typecheck e build da landing;
3. `check:mobile`: lint, typecheck, `expo install --check` e Expo Doctor `1.20.2`.

Os aliases da raiz delegam aos scripts existentes dos workspaces por `pnpm --filter`; não
duplicam implementações internas nas aplicações.

## CI básico

O workflow `.github/workflows/ci.yml`, chamado `CI`, executa em push para `main`, pull request
destinado a `main` e `workflow_dispatch`. Seu único job `quality` usa `ubuntu-latest`, timeout de
30 minutos e executa, nesta ordem:

1. checkout sem persistir credenciais;
2. configuração fixada do pnpm `11.22.0` e Node.js `24.19.0` com cache;
3. exibição das versões;
4. frozen install sem lifecycle scripts;
5. `pnpm check`;
6. self-test do verificador de segredos;
7. `git diff --check` e `git diff --exit-code`.

Esse CI não implementa testes de produto. O workflow possui somente `contents: read`, não usa
secrets, matriz, deploy ou artefatos. A proteção da branch `main` e checks obrigatórios remotos
ainda não estão configurados. A execução real será comprovada somente após commit e push.

## Alteração dos próprios gates

Mudanças em `package.json`, configurações, ignores, lockfile ou no verificador de segredos exigem
escopo e justificativa explícitos. É proibido:

- reduzir a severidade de regras para aprovar uma alteração;
- aumentar o limite de warnings;
- excluir arquivos relevantes da análise sem decisão aprovada;
- atualizar o lockfile incidentalmente;
- omitir um gate falho no relatório.

Quando a ferramenta ou o ambiente falhar, reporte o bloqueio separadamente de uma falha real de
código.

## Critérios de bloqueio

Uma tarefa não pode ser considerada concluída quando:

- qualquer gate obrigatório falha ou não pode ser executado;
- há warning do ESLint, erro do TypeScript ou divergência de formatação;
- o verificador encontra material sensível;
- `git diff --check` encontra erro;
- o diff contém arquivo fora do escopo;
- versões, lockfile ou dependências mudam sem autorização;
- a documentação descreve recurso planejado como implementado.

## Gates futuros — ainda não implementados

Não existem atualmente:

- testes unitários, de integração ou de produto;
- thresholds de cobertura;
- build nativo mobile;
- testes E2E web;
- Playwright, Maestro ou testes de carga;
- auditoria dedicada de dependências;
- scanner avançado de segredos;
- checks obrigatórios remotos e proteção de branch.

Esses itens só se tornam gates após implementação e aprovação em etapa própria.
