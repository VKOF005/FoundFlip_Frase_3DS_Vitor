import { Image } from 'expo-image';
import { useCallback, useState } from 'react';
import { ScrollView, Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DraggableOptionCard } from '@/components/draggable-option-card';
import { NavbarBottom } from '@/components/navbar-bottom';

import { styles } from '@/styles/game-screen.styles';

const optionCards = [
  { label: 'RESERVA', icon: require('../../assets/images/option-reserve.png'), active: true },
  { label: 'DÍVIDA', icon: require('../../assets/images/option-debt.png'), active: false },
  { label: 'MULTA', icon: require('../../assets/images/option-fine.png'), active: false },
  { label: 'INFLAÇÃO', icon: require('../../assets/images/option-inflation.png'), active: false },
];

const filledProgressSegment = require('../../assets/images/progress-segment-filled.png');
const emptyProgressSegment = require('../../assets/images/progress-segment-empty.png');

export default function HomeScreen() {
  const [progressValue, setProgressValue] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<View | null>(null);
  const setDropTargetRef = useCallback((target: View | null) => {
    setDropTarget(target);
  }, []);

  const decreaseProgress = () => {
    setProgressValue((value) => {
      if (value < 1) return value;
      return value - 1;
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screenFrame}>
        <View style={styles.headerBar}>
          <Text style={styles.headerText}>Android Compact - 3</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}>
          <View style={styles.topNavPill}>
            <Pressable style={styles.topNavItemLeft} accessibilityRole="button">
              <Image
                source={require('../../assets/images/navbar-coin.png')}
                style={styles.coinImage}
                contentFit="contain"
              />
            </Pressable>
            <Pressable style={styles.topNavItemCenter} accessibilityRole="button">
              <Image
                source={require('../../assets/images/navbar-flame-coin.png')}
                style={styles.fireImage}
                contentFit="contain"
              />
            </Pressable>
            <Pressable style={styles.topNavItemRight} accessibilityRole="button">
              <Image
                source={require('../../assets/images/navbar-battery.png')}
                style={styles.batteryImage}
                contentFit="contain"
              />
            </Pressable>
          </View>

          <View style={styles.pillRow}>
            <Pressable
              style={styles.arrowBadge}
              accessibilityRole="button"
              accessibilityLabel="Decrease progress"
              onPress={decreaseProgress}>
              <Image
                source={require('../../assets/images/back-arrow-badge.png')}
                style={styles.arrowImage}
                contentFit="contain"
              />
            </Pressable>
            <View style={styles.progressSegments}>
              {Array.from({ length: 5 }, (_, index) => (
                <Image
                  key={index}
                  source={index < progressValue ? filledProgressSegment : emptyProgressSegment}
                  style={styles.progressSegment}
                  contentFit="fill"
                  accessibilityLabel={`Progress segment ${index + 1}`}
                />
              ))}
            </View>
          </View>

          <Text style={styles.levelLabel}>Nível 4</Text>
          <Text style={styles.title}>{`COMPLETE\nA FRASE`}</Text>
          <Text style={styles.subtitle}>Arraste a frase que completa a frase corretamente.</Text>

          <View style={styles.phraseBox}>
            <Text style={styles.quote}>“</Text>
            <View style={styles.answerLine}>
              <Text style={styles.answerText}>Uma</Text>
              <View ref={setDropTargetRef} style={styles.blankSlot} collapsable={false}>
                <Text
                  style={[
                    styles.blankText,
                    selectedOption && styles.blankSelectedText,
                  ]}>
                  {selectedOption ?? '____'}
                </Text>
              </View>
              <Text style={styles.answerText}>de emergência</Text>
              <Text style={styles.answerText}>ajuda em situações inesperadas</Text>
            </View>
            <Text style={styles.quote}>”</Text>
          </View>

          <Text style={styles.dragLabel}>Arraste para a palavra correta</Text>

          <View style={styles.optionGrid}>
            {optionCards
              .filter(({ label }) => label !== selectedOption)
              .map(({ label, icon, active }) => (
                <DraggableOptionCard
                  key={label}
                  label={label}
                  icon={icon}
                  active={active}
                  dropTarget={dropTarget}
                  onDrop={setSelectedOption}
                />
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

          <Pressable
            style={({ pressed }) => [
              styles.verifyButton,
              pressed && styles.verifyButtonPressed,
            ]}
            accessibilityRole="button"
            onPress={() => undefined}>
            <Text style={styles.verifyText}>VERIFICAR</Text>
          </Pressable>
        </ScrollView>

        <NavbarBottom />
      </View>
    </SafeAreaView>
  );
}
