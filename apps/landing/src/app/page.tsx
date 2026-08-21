import { colors, spacing, typography } from '@rolebh/design-tokens';
import type { CSSProperties } from 'react';

import { Button } from '@/components/Button/Button';
import { Card } from '@/components/Card/Card';
import { Container } from '@/components/Container/Container';
import { Text } from '@/components/Text/Text';

type DesignSystemProperties = CSSProperties & Record<`--ds-${string}`, string>;

const pageStyle: DesignSystemProperties = {
  '--ds-background': colors.background,
  '--ds-brand': colors.brand,
  '--ds-border': colors.border,
  '--ds-text-primary': colors.textPrimary,
};

const swatches = [
  { label: 'Marca', value: colors.brand, text: colors.textOnBrand },
  { label: 'Superfície', value: colors.surface, text: colors.textPrimary },
  { label: 'Interativa', value: colors.surfaceInteractive, text: colors.textPrimary },
  { label: 'Sucesso', value: colors.success, text: colors.textOnBrand },
] as const;

export default function Home() {
  return (
    <main className="ds-page" style={pageStyle}>
      <Container>
        <header className="ds-header">
          <div className="ds-eyebrow">
            <Text tone="brand" variant="label">
              Fundação visual 01
            </Text>
          </div>
          <Text
            style={{
              fontSize: `clamp(40px, 10vw, ${typography.display.fontSize}px)`,
              lineHeight: 1.12,
            }}
            variant="display"
          >
            Rolê BH, com presença e ritmo.
          </Text>
          <Text tone="secondary" variant="body">
            Uma base urbana em preto, amarelo e off-white para experiências diretas, acessíveis e
            consistentes entre Web e Mobile.
          </Text>
        </header>

        <div className="ds-grid">
          <Card as="section">
            <div className="ds-stack">
              <Text tone="brand" variant="label">
                Tipografia
              </Text>
              <div className="ds-typography">
                <Text variant="heading">Hierarquia clara</Text>
                <Text variant="title">Título de interface</Text>
                <Text tone="secondary" variant="body">
                  Texto de leitura confortável para apresentar informações essenciais sem ruído.
                </Text>
                <Text tone="muted" variant="bodySmall">
                  Apoio secundário com contraste preservado.
                </Text>
                <Text tone="muted" variant="caption">
                  Legenda e metadados
                </Text>
              </div>

              <hr className="ds-divider" />

              <Text tone="brand" variant="label">
                Ações
              </Text>
              <div className="ds-actions">
                <Button>Explorar agora</Button>
                <Button variant="secondary">Ver detalhes</Button>
                <Button disabled>Indisponível</Button>
              </div>
            </div>
          </Card>

          <div className="ds-stack">
            <Card as="section">
              <div className="ds-stack">
                <Text tone="brand" variant="label">
                  Paleta semântica essencial
                </Text>
                <div className="ds-palette">
                  {swatches.map((swatch) => (
                    <div
                      className="ds-swatch"
                      key={swatch.label}
                      style={{ backgroundColor: swatch.value, color: swatch.text }}
                    >
                      <span style={{ color: swatch.text, fontSize: 14, fontWeight: 700 }}>
                        {swatch.label}
                      </span>
                      <span style={{ color: swatch.text, fontSize: 12, fontWeight: 700 }}>
                        {swatch.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <div style={{ paddingInline: spacing.sm }}>
              <Text tone="muted" variant="caption">
                Demonstração temporária da Etapa 10 — sem conteúdo comercial ou navegação.
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
