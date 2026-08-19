# Quality Gates

## Finalidade

Os Quality Gates protegem a consistência da fundação técnica antes de qualquer entrega. Gates
falhos bloqueiam a conclusão da tarefa; não devem ser ignorados ou enfraquecidos para produzir um
resultado verde.

## Gates ativos

| Gate                | Comando                                           | Escopo e critério                                        |
| ------------------- | ------------------------------------------------- | -------------------------------------------------------- |
| Frozen install      | `pnpm install --frozen-lockfile --ignore-scripts` | Lockfile compatível, sem atualização ou lifecycle script |
| Formatação          | `pnpm format:check`                               | Prettier não encontra arquivos fora do padrão            |
| Lint                | `pnpm lint`                                       | ESLint aprova com zero warnings                          |
| Typecheck           | `pnpm typecheck`                                  | TypeScript aprova as ferramentas Node da raiz            |
| Segredos            | `pnpm check:secrets`                              | Nenhum indício coberto pelo verificador é encontrado     |
| Gate agregado       | `pnpm check`                                      | Executa formatação, lint, typecheck e segredos           |
| Integridade do diff | `git diff --check`                                | Nenhum erro de whitespace no diff                        |

O frozen install é necessário ao restaurar ou validar dependências, mas não faz parte de
`pnpm check`. `git diff --check` também deve ser executado separadamente.

## Verificação e modificação

Estes comandos são somente leitura:

- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
- `pnpm check:secrets`
- `pnpm check`
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

### TypeScript

`tsconfig.base.json` habilita `strict`, `noUncheckedIndexedAccess`,
`exactOptionalPropertyTypes`, `noImplicitOverride`, `noFallthroughCasesInSwitch`,
`noImplicitReturns` e `forceConsistentCasingInFileNames`. O `tsconfig.json` da raiz aplica
essas regras às configurações e aos scripts Node atuais, sem emitir arquivos.

### Proteção inicial contra segredos

`pnpm check:secrets` examina candidatos rastreados e não rastreados que não estejam ignorados
pelo Git. A cobertura é deliberadamente limitada; consulte [SECURITY.md](SECURITY.md).

O self-test do verificador pode ser executado sem exibir os materiais de teste:

```powershell
pnpm check:secrets -- --self-test
```

Ele complementa o gate normal, mas não é executado por `pnpm check`.

## Execução antes de encerrar uma tarefa

1. Confirme Node `24.19.0` e pnpm `11.22.0`.
2. Execute o frozen install se dependências precisaram ser restauradas ou validadas.
3. Execute os gates agregados e a integridade do diff:

```powershell
pnpm check
git diff --check
```

4. Confirme o escopo com `git diff --name-only` e `git status --short`.
5. Registre o resultado individual de formatação, lint, typecheck, segredos e diff.

Um `pnpm check` interrompido no primeiro erro não comprova os gates posteriores. Corrija a causa
dentro do escopo e execute novamente o comando completo.

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
- build de landing ou mobile;
- testes E2E web;
- Playwright, Maestro ou testes de carga;
- auditoria dedicada de dependências;
- scanner avançado de segredos;
- CI do GitHub Actions ou checks obrigatórios remotos.

Esses itens só se tornam gates após implementação e aprovação em etapa própria.
