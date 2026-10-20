import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const optionCards = [
  { label: 'RESERVA', icon: '💰', active: true },
  { label: 'DÍVIDA', icon: '💳', active: false },
  { label: 'MULTA', icon: '🚨', active: false },
  { label: 'INFLAÇÃO', icon: '📈', active: false },
];

const bottomIcons = ['📄', '📊', '📚', '💡', '💰'];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenFrame}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Android Compact - 3</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.topNavPill}>
            <Pressable style={styles.topNavItemLeft} accessibilityRole="button">
              <Text style={styles.coinIcon}>🪙</Text>
            </Pressable>
            <Pressable style={styles.topNavItemCenter} accessibilityRole="button">
              <Text style={styles.fireIcon}>🔥</Text>
            </Pressable>
            <Pressable style={styles.topNavItemRight} accessibilityRole="button">
              <View style={styles.battery}>
                <View style={styles.batteryCell} />
                <View style={styles.batteryCell} />
                <View style={styles.batteryCell} />
                <View style={styles.batteryNub} />
              </View>
              <Text style={styles.streakText}>3</Text>
            </Pressable>
          </View>

          <View style={styles.pillRow}>
            <Pressable style={styles.plusBadge}>
              <Text style={styles.plusText}>＋</Text>
            </Pressable>
            <View style={styles.hintBar}>
              <View style={styles.hintFill} />
            </View>
            <View style={styles.hintBarShort} />
            <View style={styles.hintBarShort} />
          </View>

          <Text style={styles.levelLabel}>Nível 4</Text>
          <Text style={styles.title}>{`COMPLETE\nA FRASE`}</Text>
          <Text style={styles.subtitle}>Arraste a frase que completa a frase corretamente.</Text>

          <View style={styles.phraseBox}>
            <Text style={styles.quote}>“</Text>
            <View style={styles.answerLine}>
              <Text style={styles.answerText}>Uma</Text>
              <View style={styles.blankSlot}>
                <Text style={styles.blankText}>____</Text>
              </View>
              <Text style={styles.answerText}>de emergência</Text>
            </View>
            <Text style={styles.quote}>”</Text>
          </View>

          <Text style={styles.helperText}>ajuda em situações inesperadas</Text>

          <Text style={styles.dragLabel}>Arraste para a palavra correta</Text>

          <View style={styles.optionGrid}>
            {optionCards.map(({ label, icon, active }) => (
              <Pressable
                key={label}
                style={[styles.optionCard, active && styles.optionCardActive]}
                accessibilityRole="button">
                <View style={[styles.optionIconWrap, active && styles.optionIconWrapActive]}>
                  <Text style={styles.optionIcon}>{icon}</Text>
                </View>
                <Text style={[styles.optionText, active && styles.optionTextActive]}>{label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.tipCard}>
            <View style={styles.tipIconWrap}>
              <Text style={styles.tipIcon}>💡</Text>
            </View>
            <View style={styles.tipTextWrap}>
              <Text style={styles.tipTitle}>DICA</Text>
              <Text style={styles.tipBody}>Ter uma reserva de emergência é essencial para manter suas finanças seguras!</Text>
            </View>
          </View>

          <Pressable style={styles.verifyButton} accessibilityRole="button">
            <Text style={styles.verifyText}>VERIFICAR</Text>
          </Pressable>

          <View style={styles.footerBar}>
            {bottomIcons.map((icon, index) => (
              <View
                key={`${icon}-${index}`}
                style={[styles.footerIcon, index === 0 && styles.footerIconActive]}>
                <Text style={styles.footerEmoji}>{icon}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#111518',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  screenFrame: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    backgroundColor: '#edf2ec',
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#dfe9e1',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  headerBar: {
    backgroundColor: '#0f1214',
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  headerText: {
    color: '#ecf0eb',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 18,
  },
  topNavPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d8f0d0',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#b4d8ab',
    alignSelf: 'stretch',
    height: 60,
  },
  topNavItemLeft: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  coinIcon: {
    fontSize: 25,
  },
  topNavItemCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireIcon: {
    fontSize: 27,
  },
  topNavItemRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  battery: {
    width: 36,
    height: 19,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#27863b',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    gap: 2,
    position: 'relative',
    marginRight: 4,
  },
  batteryCell: {
    flex: 1,
    height: 11,
    backgroundColor: '#27863b',
    borderRadius: 1,
  },
  batteryNub: {
    position: 'absolute',
    right: -5,
    width: 3,
    height: 8,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#27863b',
  },
  streakText: {
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#27863b',
    color: '#fff',
    fontWeight: '700',
    fontSize: 12,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: 15,
    height: 16,
  },
  pillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    marginBottom: 2,
  },
  plusBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#d5f0d4',
    borderWidth: 2,
    borderColor: '#73be67',
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2a8b3e',
    lineHeight: 24,
  },
  hintBar: {
    flex: 1,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#9fe7a8',
    overflow: 'hidden',
  },
  hintFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#54b55e',
    borderRadius: 999,
  },
  hintBarShort: {
    width: 42,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#dfe4dd',
  },
  levelLabel: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '700',
    color: '#0e5d2a',
  },
  title: {
    marginTop: 6,
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 44,
    letterSpacing: -1.2,
    color: '#1c2a1c',
  },
  subtitle: {
    marginTop: 8,
    color: '#3d4b40',
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 280,
  },
  phraseBox: {
    marginTop: 18,
    backgroundColor: '#dfe7df',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#cfd9cf',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quote: {
    fontSize: 34,
    fontWeight: '700',
    color: '#3b8741',
    marginHorizontal: 2,
  },
  answerLine: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  answerText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d2f25',
  },
  blankSlot: {
    minWidth: 84,
    minHeight: 28,
    borderRadius: 8,
    backgroundColor: '#edf4ee',
    borderWidth: 1,
    borderColor: '#8ca796',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  blankText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d2f25',
    letterSpacing: 2,
  },
  helperText: {
    marginTop: 8,
    textAlign: 'center',
    color: '#4c6050',
    fontSize: 12,
    fontWeight: '500',
  },
  dragLabel: {
    marginTop: 18,
    marginBottom: 10,
    color: '#223c2d',
    fontSize: 13,
    fontWeight: '700',
  },
  optionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  optionCard: {
    flex: 1,
    minHeight: 94,
    borderRadius: 12,
    backgroundColor: '#dfe7df',
    borderWidth: 1,
    borderColor: '#d0d9d1',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  optionCardActive: {
    backgroundColor: '#bee0c6',
    borderColor: '#68af70',
  },
  optionIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#edf4ee',
    borderWidth: 1,
    borderColor: '#d0d8d2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  optionIconWrapActive: {
    backgroundColor: '#d1ebd7',
  },
  optionIcon: {
    fontSize: 18,
  },
  optionText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#233c30',
    textAlign: 'center',
  },
  optionTextActive: {
    color: '#1d5c2c',
  },
  tipCard: {
    marginTop: 18,
    backgroundColor: '#cfe9d3',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#b5d8bc',
  },
  tipIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#edf9ef',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  tipIcon: {
    fontSize: 20,
  },
  tipTextWrap: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1a5b2b',
    marginBottom: 2,
  },
  tipBody: {
    color: '#173e27',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
  },
  verifyButton: {
    marginTop: 18,
    backgroundColor: '#52b65a',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2e7b3f',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  verifyText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  footerBar: {
    marginTop: 18,
    backgroundColor: '#bfe7c3',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerIcon: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#edf7ee',
    borderWidth: 1,
    borderColor: '#d7e9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerIconActive: {
    backgroundColor: '#d1edd8',
  },
  footerEmoji: {
    fontSize: 20,
  },
});
