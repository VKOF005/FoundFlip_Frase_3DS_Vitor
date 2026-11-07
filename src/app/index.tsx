import { Image } from 'expo-image';
import { useCallback, useRef, useState } from 'react';
import { Animated, ScrollView, Text, View, Pressable } from 'react-native';
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
  const [answerFeedback, setAnswerFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [attemptedWrongOptions, setAttemptedWrongOptions] = useState<Set<string>>(
    () => new Set(),
  );
  const N_Miss = useRef(0);
  const [phraseFlash] = useState(() => new Animated.Value(0));
  const [wrongAnswerReturn] = useState(() => new Animated.Value(0));
  const [successPopupTranslation] = useState(() => new Animated.Value(1));
  const [successPopupHeight, setSuccessPopupHeight] = useState(0);
  const [isSuccessPopupVisible, setIsSuccessPopupVisible] = useState(false);
  const [isReturningWrongAnswer, setIsReturningWrongAnswer] = useState(false);
  const [dropTarget, setDropTarget] = useState<View | null>(null);
  const setDropTargetRef = useCallback((target: View | null) => {
    setDropTarget(target);
  }, []);
  const handleOptionDrop = useCallback((label: string) => {
    setSelectedOption(label);
    setAnswerFeedback(null);
    phraseFlash.stopAnimation();
    phraseFlash.setValue(0);
    wrongAnswerReturn.stopAnimation();
    wrongAnswerReturn.setValue(0);
    successPopupTranslation.stopAnimation();
    successPopupTranslation.setValue(1);
    setIsSuccessPopupVisible(false);
  }, [phraseFlash, successPopupTranslation, wrongAnswerReturn]);

  const verifyAnswer = () => {
    if (isReturningWrongAnswer) return;

    const isCorrect = selectedOption === 'RESERVA';
    setAnswerFeedback(isCorrect ? 'correct' : 'incorrect');

    if (isCorrect) {
      successPopupTranslation.setValue(1);
      setIsSuccessPopupVisible(true);
    } else {
      setIsSuccessPopupVisible(false);
    }

    if (!isCorrect) {
      if (selectedOption) {
        N_Miss.current += 1;
        setAttemptedWrongOptions((attempted) => new Set(attempted).add(selectedOption));
        setIsReturningWrongAnswer(true);
        wrongAnswerReturn.setValue(0);
        Animated.timing(wrongAnswerReturn, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }).start(({ finished }) => {
          if (finished) {
            setSelectedOption(null);
            wrongAnswerReturn.setValue(0);
          }
          setIsReturningWrongAnswer(false);
        });
      }
    }

    phraseFlash.stopAnimation();
    phraseFlash.setValue(0);
    if (!isCorrect) {
      Animated.sequence([
        Animated.timing(phraseFlash, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(phraseFlash, {
          toValue: 0,
          duration: 420,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  // remover quando possuir uma ancora, a nao ser que precise do efeito de deslize para baixo.
  const dismissSuccessPopup = () => {
    successPopupTranslation.stopAnimation();
    Animated.timing(successPopupTranslation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setIsSuccessPopupVisible(false);
      }
    });
  };

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
          <Text style={styles.subtitle}>Arraste a palavra que complete a frase</Text>

          <View
            style={[
              styles.phraseBox,
              answerFeedback === 'correct' && styles.phraseBoxCorrect,
            ]}>
            {answerFeedback === 'incorrect' && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.phraseFeedbackOverlay,
                  styles.phraseFeedbackIncorrect,
                  { opacity: phraseFlash },
                ]}
              />
            )}
            <Text style={styles.quote}>“</Text>
            <View style={styles.answerLine}>
              <Text style={styles.answerText}>Uma</Text>
              <View ref={setDropTargetRef} style={styles.blankSlot} collapsable={false}>
                <Animated.Text
                  style={[
                    styles.blankText,
                    selectedOption && styles.blankSelectedText,
                    selectedOption &&
                      answerFeedback === 'incorrect' && {
                        opacity: wrongAnswerReturn.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 0],
                        }),
                        transform: [
                          {
                            translateY: wrongAnswerReturn.interpolate({
                              inputRange: [0, 1],
                              outputRange: [0, 32],
                            }),
                          },
                        ],
                      },
                  ]}>
                  {selectedOption ?? '____'}
                </Animated.Text>
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
                  disabled={attemptedWrongOptions.has(label)}
                  dropTarget={dropTarget}
                  onDrop={handleOptionDrop}
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
            onPress={verifyAnswer}>
            <Text style={styles.verifyText}>VERIFICAR</Text>
          </Pressable>
        </ScrollView>

        <NavbarBottom />
        {isSuccessPopupVisible && (
          <Animated.View
            accessibilityLiveRegion="polite"
            onLayout={({ nativeEvent }) => {
              setSuccessPopupHeight(nativeEvent.layout.height);
              Animated.spring(successPopupTranslation, {
                toValue: 0,
                damping: 18,
                stiffness: 160,
                useNativeDriver: true,
              }).start();
            }}
            style={[
              styles.successPopup,
              {
                transform: [
                  {
                    translateY: successPopupTranslation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, successPopupHeight],
                    }),
                  },
                ],
              },
            ]}>
            <Text style={styles.successPopupText}>Resposta correta!</Text>
            <Pressable
              style={({ pressed }) => [
                styles.verifyButton,
                styles.successPopupButton,
                pressed && styles.verifyButtonPressed,
              ]}
              accessibilityRole="button"
              onPress={dismissSuccessPopup}>
              <Text style={styles.verifyText}>CONTINUAR</Text>
            </Pressable>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
