# Design System inicial

## Direção visual

O design system inicial do Rolê BH combina fundo preto, superfícies grafite, amarelo de marca e
textos off-white. A linguagem é urbana, moderna, jovem, energética e simples, com contraste forte,
áreas limpas e arredondamento moderado. O amarelo identifica chamadas para ação, foco e destaques;
não deve dominar grandes áreas de conteúdo.

A interface deve permanecer profissional sem parecer corporativa genérica, infantil, gamer,
carnavalesca, neon ou editorial premium. Letras orgânicas ficam reservadas à marca futura. A UI usa
fontes de sistema altamente legíveis e não carrega fontes remotas.

## Tokens compartilhados

`@rolebh/design-tokens` é um pacote TypeScript privado, consumido diretamente pelo Next.js e pelo
Expo sem etapa de build e sem dependências externas. Os nomes públicos são semânticos; escalas
primitivas de cor permanecem internas.

### Cores

| Grupo     | Tokens                                                              | Uso                                                 |
| --------- | ------------------------------------------------------------------- | --------------------------------------------------- |
| Fundos    | `background`, `backgroundElevated`, `surface`, `surfaceInteractive` | Tela, elevação e áreas interativas                  |
| Marca     | `brand`, `brandHover`, `brandPressed`                               | CTA, destaque e estados da marca                    |
| Texto     | `textPrimary`, `textSecondary`, `textMuted`, `textOnBrand`          | Hierarquia e texto sobre amarelo                    |
| Estado    | `focus`, `disabled`, `danger`, `success`, `warning`                 | Feedback e estados sem substituir semântica textual |
| Estrutura | `border`                                                            | Divisores e contornos                               |

### Tipografia

As variantes `display`, `heading`, `title`, `body`, `bodySmall`, `label` e `caption` declaram
família semântica, tamanho, peso e altura de linha. Web usa Arial/Helvetica e Mobile usa a fonte de
sistema nativa. `display` e `heading` introduzem páginas e seções; `title` nomeia blocos;
`body`/`bodySmall` sustentam leitura; `label` identifica controles; `caption` apresenta apoio.

### Espaçamento, raio e elevação

- Espaçamento: `xs` 4, `sm` 8, `md` 16, `lg` 24, `xl` 32 e `2xl` 48 px/dp.
- Raios: `sm` 6, `md` 12, `lg` 18 e `full` 999 px/dp.
- Elevação: níveis mínimos `card` e `interactive`, traduzidos para sombra CSS ou propriedades
  nativas.
- Interação: contratos para `hover`, `pressed`, `focus`, `disabled`, `error` e alvo de toque mínimo
  de 48 × 48 dp.

## Componentes Web

Existem exatamente quatro tipos em `apps/landing/src/components/`:

| Componente  | Variantes e estados                                                 | Regra de uso                                                      |
| ----------- | ------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `Button`    | `primary`, `secondary`; default, hover, pressed, focus e disabled   | Renderiza `<button>`, preserva teclado e foco visível             |
| `Text`      | Sete variantes tipográficas; tons primary, secondary, muted e brand | Mantém hierarquia HTML explícita                                  |
| `Container` | Responsivo                                                          | Limita largura e aplica respiro lateral, sem grid próprio         |
| `Card`      | Superfície única                                                    | Agrupa conteúdo relacionado com borda, raio e elevação semânticos |

## Componentes Mobile

Existem exatamente quatro tipos em `apps/mobile/src/components/`:

| Componente  | Variantes e estados                                 | Regra de uso                                                     |
| ----------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `Button`    | `primary`, `secondary`; default, pressed e disabled | Usa `Pressable`, alvo mínimo 48, role e estado de acessibilidade |
| `Text`      | Sete variantes e tons semânticos                    | Usa `Text` nativo e fonte do sistema                             |
| `Container` | Área segura e rolagem                               | Controla fundo, respiro e conteúdo em telas menores              |
| `Card`      | Superfície única                                    | Usa `View`, borda, raio e elevação nativos                       |

Os componentes Web e Mobile compartilham significado e tokens, não implementação. Nenhum
componente React DOM é importado pelo React Native e nenhuma primitiva nativa é importada pela
landing.

## Acessibilidade

- Conteúdo textual normal atende WCAG AA nas combinações documentadas; a auditoria usa a fórmula
  WCAG 2.x de luminância relativa sRGB e `(Lmais-claro + 0,05) / (Lmais-escuro + 0,05)`.
- O botão Web é HTML semântico, funciona por teclado e mostra contorno de foco amarelo de 3 px.
- Estados disabled usam o atributo/comportamento nativo, opacidade e cursor, não apenas troca de
  cor.
- O botão Mobile expõe `accessibilityRole="button"`, `accessibilityState` e bloqueia interação
  quando disabled.
- Alvos interativos Mobile têm no mínimo 48 × 48 dp.
- Estados de erro, sucesso e aviso devem sempre incluir texto ou semântica adicional quando forem
  usados em produto.

Principais razões de contraste verificadas: `textPrimary/background` 18,82:1,
`textSecondary/surface` 11,91:1, `textMuted/surface` 6,72:1, `brand/background` 13,75:1 e
`textOnBrand/brand` 13,75:1.

## Demonstrações temporárias

A rota `/` da landing e a rota inicial do mobile exibem somente uma demonstração temporária da
fundação: hierarquia tipográfica, cores essenciais, botões, container e cards. Elas validam
comportamento responsivo e estados, mas não são landing comercial nem home real do aplicativo.

## Fora do estado atual

Não existem tema claro, múltiplos temas, alternador de tema, grid compartilhado, iconografia,
fonte de marca, Input, Modal, Tabs, Dropdown, Toast, Accordion, Navbar, Dialog, Drawer, Carousel,
Storybook, biblioteca externa de UI, Figma integrado, navegação de produto, conteúdo real ou
testes artificiais de componentes.
