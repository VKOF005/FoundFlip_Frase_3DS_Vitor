import { Image } from 'expo-image';
import { useCallback, useMemo, useState } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';

import { styles } from '@/styles/game-screen.styles';

const DROP_TARGET_HORIZONTAL_PADDING = 24;
const DROP_TARGET_VERTICAL_PADDING = 20;

interface DraggableOptionCardProps {
  active: boolean;
  disabled: boolean;
  dropTarget: View | null;
  icon: ImageSourcePropType | null;
  label: string;
  onDrop: (label: string) => void;
}

export function DraggableOptionCard({
  active,
  disabled,
  dropTarget,
  icon,
  label,
  onDrop,
}: DraggableOptionCardProps) {
  const [translation] = useState(() => new Animated.ValueXY());
  const [isDragging, setIsDragging] = useState(false);

  const snapBack = useCallback(() => {
    setIsDragging(false);
    Animated.spring(translation, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: true,
    }).start();
  }, [translation]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          !disabled && Math.abs(gestureState.dx) + Math.abs(gestureState.dy) > 6,
        onPanResponderGrant: () => {
          setIsDragging(true);
          translation.setOffset({ x: 0, y: 0 });
        },
        onPanResponderMove: (_, gestureState) => {
          translation.setValue({ x: gestureState.dx, y: gestureState.dy });
        },
        onPanResponderRelease: (event) => {
          if (!dropTarget) {
            snapBack();
            return;
          }

          const { pageX, pageY } = event.nativeEvent;
          dropTarget.measure((_, __, width, height, targetPageX, targetPageY) => {
            const droppedOnTarget =
              pageX >= targetPageX - DROP_TARGET_HORIZONTAL_PADDING &&
              pageX <= targetPageX + width + DROP_TARGET_HORIZONTAL_PADDING &&
              pageY >= targetPageY - DROP_TARGET_VERTICAL_PADDING &&
              pageY <= targetPageY + height + DROP_TARGET_VERTICAL_PADDING;

            if (droppedOnTarget) {
              onDrop(label);
            }
            snapBack();
          });
        },
        onPanResponderTerminate: snapBack,
        onPanResponderTerminationRequest: () => false,
      }),
    [disabled, dropTarget, label, onDrop, snapBack, translation],
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      accessible
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint="Drag this answer onto the blank in the sentence."
      accessibilityState={{ disabled }}
      pointerEvents={disabled ? 'none' : 'auto'}
      style={[
        styles.optionCard,
        disabled && styles.optionCardDisabled,
        isDragging && draggingStyles.card,
        { transform: translation.getTranslateTransform() },
      ]}>
      {icon && (
        <View
          style={[
            styles.optionIconWrap,
            active && !disabled && styles.optionIconWrapActive,
            disabled && styles.optionIconWrapDisabled,
          ]}>
          <Image source={icon} style={styles.optionImage} contentFit="contain" />
        </View>
      )}
      <Text
        style={[
          styles.optionText,
          active && !disabled && styles.optionTextActive,
          disabled && styles.optionTextDisabled,
        ]}>
        {label}
      </Text>
    </Animated.View>
  );
}

const draggingStyles = StyleSheet.create({
  card: {
    zIndex: 1,
    elevation: 8,
    opacity: 0.9,
  },
});
