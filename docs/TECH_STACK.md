# Stack técnica

Este documento separa ferramentas efetivamente adotadas, recursos externos já validados e
tecnologias reservadas para etapas futuras.

## Adotadas no repositório

| Tecnologia               | Versão  | Função atual                                               |
| ------------------------ | ------- | ---------------------------------------------------------- |
| Node.js                  | 24.19.0 | Runtime das ferramentas da raiz                            |
| pnpm                     | 11.22.0 | Gerenciador de pacotes e workspaces                        |
| TypeScript               | 6.0.3   | Verificação estrita das ferramentas Node                   |
| `@types/node`            | 26.2.0  | Tipos do ambiente Node                                     |
| ESLint da raiz           | 10.8.1  | Análise estática da fundação com Flat Config               |
| `@eslint/js`             | 10.0.1  | Regras recomendadas para JavaScript                        |
| `typescript-eslint`      | 8.67.0  | Regras e parser TypeScript, incluindo análise com tipos    |
| `globals`                | 17.11.0 | Globais do Node para lint                                  |
| Prettier                 | 3.9.6   | Formatação determinística                                  |
| `eslint-config-prettier` | 10.1.8  | Evita conflito entre regras de ESLint e Prettier           |
| Git                      | —       | Histórico e controle de versão                             |
| GitHub                   | —       | Repositório remoto privado                                 |
| GitHub Actions           | —       | CI básico dos Quality Gates em `ubuntu-latest`             |
| Verificador de segredos  | local   | Varredura inicial baseada em padrões, implementada em Node |

### Landing instalada

| Tecnologia             | Versão  | Função atual                                   |
| ---------------------- | ------- | ---------------------------------------------- |
| Next.js                | 16.3.1  | App Router, servidor local e build de produção |
| React                  | 19.2.8  | Renderização da interface                      |
| React DOM              | 19.2.8  | Integração do React com o DOM                  |
| Tailwind CSS           | 4.3.3   | Classes utilitárias da página mínima           |
| `@tailwindcss/postcss` | 4.3.3   | Integração do Tailwind com PostCSS             |
| PostCSS                | 8.5.26  | Processamento do CSS                           |
| ESLint da landing      | 9.39.5  | Execução compatível com os plugins do Next.js  |
| `eslint-config-next`   | 16.3.1  | Regras Next.js, React, hooks e TypeScript      |
| `@types/react`         | 19.2.18 | Tipos do React para TypeScript                 |
| `@types/react-dom`     | 19.2.4  | Tipos do React DOM para TypeScript             |

A landing também declara TypeScript `6.0.3` e `@types/node` `26.2.0`, alinhados com a raiz.
As declarações permanecem no pacote para respeitar o isolamento de dependências do pnpm.

As versões de dependências são exatas no `package.json` e no `pnpm-lock.yaml`.

### Mobile instalado

| Tecnologia                       | Versão  | Função atual                                        |
| -------------------------------- | ------- | --------------------------------------------------- |
| Expo                             | 57.0.15 | Runtime gerenciado e ferramentas de desenvolvimento |
| React Native                     | 0.86.2  | Renderização nativa da tela mínima                  |
| React                            | 19.2.3  | Modelo de componentes do mobile                     |
| Expo Router                      | 57.0.15 | Roteamento baseado em arquivos sob `src/app`        |
| `expo-constants`                 | 57.0.13 | Constantes do ambiente Expo                         |
| `expo-linking`                   | 57.0.7  | Integração de URLs usada pelo roteamento            |
| `expo-status-bar`                | 57.0.1  | Configuração da barra de status                     |
| `react-native-safe-area-context` | 5.7.0   | Respeito às áreas seguras da tela                   |
| `react-native-screens`           | 4.26.0  | Infraestrutura nativa de telas do Router            |
| `react-native-gesture-handler`   | 2.32.0  | Infraestrutura de gestos compatível com o SDK       |
| `react-native-reanimated`        | 4.5.1   | Infraestrutura de animação compatível com o SDK     |
| `react-native-worklets`          | 0.10.1  | Runtime de worklets compatível com o Expo           |
| TypeScript                       | 6.0.3   | Verificação estrita do código mobile                |
| `@types/react`                   | 19.2.18 | Tipos do React para TypeScript                      |
| ESLint do mobile                 | 9.39.5  | Execução compatível com os plugins do Expo          |
| `eslint-config-expo`             | 57.0.1  | Flat Config oficial para Expo e React Native        |

O mobile usa versões exatas e alinhadas à matriz nativa do Expo SDK 57. O ESLint `9.39.5` é
isolado no workspace porque o plugin React usado pela configuração do Expo é incompatível em
runtime com ESLint 10; o ESLint `10.8.1` da raiz permanece inalterado.

### Funções principais

- **pnpm Workspaces:** descobre projetos em `apps/*` e `packages/*`, compartilhando lockfile e
  dependências da raiz.
- **Node.js:** executa scripts de qualidade e o verificador de segredos. Não executa backend de
  produto atualmente.
- **TypeScript:** aplica regras estritas à fundação e oferece uma base compartilhável para
  aplicações futuras.
- **ESLint:** detecta problemas estáticos; warnings são proibidos.
- **Prettier:** formata arquivos separadamente do lint.
- **Git e GitHub:** mantêm o histórico local e seu espelho privado em `origin/main`.
- **GitHub Actions:** executa os gates técnicos em push, pull request e acionamento manual, sem
  testes de produto ou deploy.
- **Verificador de segredos:** reduz o risco de versionar alguns formatos sensíveis, sem substituir
  scanner dedicado.
- **Next.js e React:** fornecem somente a rota estática `/` pelo App Router; não há backend ou API
  Route.
- **Tailwind CSS e PostCSS:** comprovam o pipeline de estilos sem estabelecer identidade visual
  definitiva.
- **Expo, React Native e Expo Router:** fornecem somente a rota inicial mobile gerenciada, sem
  diretórios nativos ou integração de produto.
- **Safe Area Context:** mantém o conteúdo dentro das áreas seguras do dispositivo.

## Ferramentas externas validadas no ambiente

Estas ferramentas pertencem à máquina de desenvolvimento, não ao repositório:

| Ferramenta                  | Estado validado                                       |
| --------------------------- | ----------------------------------------------------- |
| Windows 11 Pro x64          | Ambiente local atual                                  |
| Git for Windows             | 2.48.1.windows.1                                      |
| fnm                         | 1.39.0; ativa Node do projeto ao entrar com `cd`      |
| Eclipse Temurin Java        | 21.0.12 LTS                                           |
| Android SDK Platform        | API 36 / Android 16                                   |
| Android Build-Tools         | 36.0.0                                                |
| Android Platform-Tools      | 37.0.1                                                |
| Android Emulator            | 37.1.11                                               |
| Android Command-line Tools  | 22.0                                                  |
| Imagem do emulador          | Google APIs API 36 `x86_64`                           |
| AVD                         | `RoleBH_API_36`, perfil Pixel 8, boot e app validados |
| Expo Go                     | 57.0.9 / SDK 57 executado no AVD Android              |
| Windows Hypervisor Platform | Habilitada para o emulador                            |

O bootstrap mobile foi validado no AVD API 36 `x86_64`: renderização da tela, reload completo,
Fast Refresh e logs sem erros. Não existem diretórios nativos versionados. NDK, CMake, AEHD e
HAXM não fazem parte da fundação validada.

O fluxo em iPhone físico permanece não validado com Expo SDK 57 por indisponibilidade de cliente
compatível na condição autorizada. Não houve downgrade, tunnel, conta Expo, EAS Build, Apple
Developer ou Development Build.

## Planejadas — ainda não implementadas

As tecnologias abaixo representam direção aprovada, sem instalação, configuração ou versão
definida neste repositório:

| Área            | Tecnologias planejadas                          |
| --------------- | ----------------------------------------------- |
| Backend e dados | Supabase, autenticação, banco, storage e RLS    |
| Automação       | Proteção da branch principal                    |
| Testes          | Testes unitários, integração, E2E web e Maestro |
| Entrega         | Deploy da landing, EAS Build e builds mobile    |

Nenhuma dessas tecnologias planejadas deve aparecer em comandos de instalação ou execução até que
a etapa correspondente autorize sua adoção e fixe versões compatíveis.

Também não fazem parte do estado atual Turborepo, Nx, Changesets, Playwright, k6 ou um scanner
avançado de segurança.
