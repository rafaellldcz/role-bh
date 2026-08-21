import { colors, radius, spacing } from '@rolebh/design-tokens';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Button } from '../components/Button/Button';
import { Card } from '../components/Card/Card';
import { Container } from '../components/Container/Container';
import { Text } from '../components/Text/Text';

export default function HomeScreen() {
  return (
    <Container>
      <StatusBar style="light" />

      <View style={styles.header}>
        <View style={styles.eyebrow} />
        <Text tone="brand" variant="label">
          FUNDAÇÃO VISUAL 01
        </Text>
        <Text variant="heading">Rolê BH, na palma da mão.</Text>
        <Text tone="secondary" variant="bodySmall">
          Uma base urbana, direta e acessível para as experiências Mobile.
        </Text>
      </View>

      <Card accessibilityLabel="Demonstração da hierarquia tipográfica">
        <View style={styles.stack}>
          <Text tone="brand" variant="label">
            TIPOGRAFIA
          </Text>
          <Text variant="title">Hierarquia clara</Text>
          <Text tone="secondary" variant="body">
            Informação essencial com leitura confortável e contraste forte.
          </Text>
          <Text tone="muted" variant="caption">
            Legenda e metadados de apoio
          </Text>
        </View>
      </Card>

      <Card accessibilityLabel="Demonstração dos botões">
        <View style={styles.stack}>
          <Text tone="brand" variant="label">
            AÇÕES
          </Text>
          <Button label="Explorar agora" onPress={() => undefined} />
          <Button label="Ver detalhes" onPress={() => undefined} variant="secondary" />
          <Button disabled label="Indisponível" />
        </View>
      </Card>

      <View style={styles.brandStrip}>
        <View style={styles.brandDot} />
        <Text tone="muted" variant="caption">
          Demonstração temporária da Etapa 10
        </Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  eyebrow: {
    backgroundColor: colors.brand,
    borderRadius: radius.full,
    height: 3,
    width: spacing.lg,
  },
  stack: {
    gap: spacing.md,
  },
  brandStrip: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  brandDot: {
    backgroundColor: colors.brand,
    borderRadius: radius.full,
    height: spacing.sm,
    width: spacing.sm,
  },
});
