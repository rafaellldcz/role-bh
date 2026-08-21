# Segurança

## Estado atual

O repositório privado possui uma defesa inicial contra versionamento acidental de segredos:

- padrões sensíveis são ignorados pelo Git;
- `scripts/check-secrets.mjs` verifica candidatos não ignorados;
- `pnpm check` inclui a verificação de segredos;
- nenhuma aplicação, backend, banco ou credencial de runtime existe.

Essa base reduz erros comuns, mas não constitui auditoria ou scanner de segurança completo.

## Política de idade mínima das dependências

O pnpm 11 aplica uma idade mínima de publicação às dependências. Versões recém-publicadas
necessárias para compatibilidade podem gerar exclusões exatas, sempre limitadas a pacote e versão
em `pnpm-workspace.yaml`; exclusões amplas não são permitidas. Lifecycle scripts continuam
desabilitados durante instalações por meio de `--ignore-scripts`.

## Política de secrets

- Segredos nunca devem ser gravados em código, documentação, fixtures, logs, commits ou URLs.
- Credenciais devem ficar em mecanismo apropriado ao ambiente e somente quando uma etapa autorizar
  sua criação.
- Arquivos de exemplo podem documentar apenas nomes de variáveis e valores claramente não
  sensíveis; `.env.example` é permitido pelo Git.
- Credenciais administrativas, chaves de serviço e equivalentes nunca podem ser expostas a
  clientes web ou mobile.
- O fato de o repositório ser privado não autoriza versionar segredos.

## Proteção do .gitignore

O `.gitignore` vigente exclui:

- `.env` e qualquer `.env.*`, exceto `.env.example`;
- keystores, certificados, chaves privadas e perfis de provisionamento por extensões conhecidas;
- `credentials.local.json` e `service-account*.json`;
- dependências, logs, caches, builds, cobertura e diretórios nativos gerados;
- arquivos locais de editor e sistema operacional.

O ignore evita novos arquivos não rastreados, mas não remove conteúdo já versionado nem detecta
um segredo inserido em arquivo permitido.

## Verificador inicial de segredos

`scripts/check-secrets.mjs` usa apenas APIs nativas do Node. Ele:

- obtém arquivos rastreados e não rastreados não ignorados por meio do Git;
- sinaliza um arquivo de ambiente sensível se ele entrar no conjunto de candidatos;
- procura cabeçalhos de chave privada e formatos de alta confiança de tokens GitHub e npm;
- informa somente caminho, linha e categoria, sem imprimir o valor encontrado;
- ignora extensões binárias conhecidas, arquivos maiores que 1 MiB e conteúdo provavelmente
  binário;
- limita a saída recebida do Git a 16 MiB;
- possui self-test executável com `pnpm check:secrets -- --self-test`.

Limitações relevantes:

- arquivos ignorados pelo Git, inclusive `.env` local, não entram na lista normal de candidatos;
- formatos genéricos, credenciais de outros provedores e segredos ofuscados podem não ser
  detectados;
- arquivos grandes, binários ou com extensão excluída não têm conteúdo textual analisado;
- não há análise de histórico Git, entropia, dependências, infraestrutura ou repositório remoto;
- não existe execução em CI.

Portanto, um resultado aprovado significa apenas que nenhum padrão coberto foi encontrado nos
candidatos analisados.

## Arquivos que não podem ser versionados

Não versione:

- arquivos `.env` reais e variantes locais;
- chaves privadas, certificados, keystores e perfis de provisionamento;
- arquivos de conta de serviço ou credenciais locais;
- tokens de acesso, senhas, cookies, sessões ou URLs autenticadas;
- credenciais administrativas de banco, Supabase, cloud, deploy ou CI;
- backups, exports ou logs que contenham dados sensíveis.

Se uma tecnologia futura exigir outro arquivo sensível, atualize a política em etapa autorizada
antes de armazená-lo localmente.

## Menor privilégio

Cada processo, pessoa e aplicação deve receber somente as permissões necessárias pelo menor tempo
possível. Clientes públicos devem usar apenas credenciais publicáveis e escopos limitados.
Operações administrativas devem permanecer exclusivamente em ambientes confiáveis e nunca no
bundle do cliente.

## Supabase e RLS — política futura, não implementada

Supabase ainda não está configurado. Não existem projeto, banco, autenticação, storage, schema,
migrações ou Row Level Security.

Quando essa etapa for autorizada:

- RLS deverá ser habilitada e validada nas tabelas expostas;
- políticas devem começar negando acesso e liberar apenas casos de uso aprovados;
- chaves administrativas não poderão chegar à landing ou ao aplicativo mobile;
- acesso anônimo e autenticado deverá ser testado separadamente;
- operações privilegiadas deverão permanecer no servidor.

Esses requisitos expressam política futura e não comprovam qualquer proteção de banco hoje.

## Resposta a um segredo encontrado

1. Pare a mudança e não crie commit, push, log ou captura contendo o valor.
2. Remova o material do arquivo e do índice de forma segura.
3. Se houve exposição fora do ambiente local, revogue ou rotacione a credencial imediatamente pelo
   provedor responsável.
4. Avalie commits, branches, PRs, logs e artefatos que possam conter o valor.
5. Informe o incidente sem reproduzir o segredo e solicite orientação antes de reescrever
   histórico.
6. Execute novamente `pnpm check:secrets`, `pnpm check` e a revisão do diff.

Reescrita de histórico, force push ou remoção de recurso remoto exigem autorização explícita.

## Lacunas conhecidas

- Não há scanner dedicado, auditoria de dependências ou monitoramento contínuo.
- Não há CI, proteção de branch ou secret scanning remoto documentado como gate.
- Não há aplicação para validação de autenticação, autorização ou tratamento de dados.
- Não há Supabase nem RLS.
- O verificador local cobre apenas um conjunto pequeno de assinaturas.

Essas lacunas devem ser tratadas somente nas etapas correspondentes, sem enfraquecer as proteções
atuais.
