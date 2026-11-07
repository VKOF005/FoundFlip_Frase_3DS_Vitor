import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export type BottomNavDestination = 'spreadsheet' | 'stats' | 'home' | 'courses' | 'settings';

interface BottomNavItem {
  destination: BottomNavDestination;
  label: string;
  icon: number;
}


//os números estão em ordem para representar cada icone.

const bottomIcons: BottomNavItem[] = [
  // Âncora: conecte 1 no onAction da NavbarBottom.
  {
    destination: 'spreadsheet',
    label: 'Planilha',
    icon: require('../../assets/images/bottom-nav-record.png'),
  },
  // Âncora: conecte 2 no onAction da NavbarBottom.
  {
    destination: 'stats',
    label: 'Estatísticas',
    icon: require('../../assets/images/bottom-nav-stats.png'),
  },
  // Âncora: conecte 3 no onAction da NavbarBottom.
  {
    destination: 'home',
    label: 'Início',
    icon: require('../../assets/images/bottom-nav-home.png'),
  },
  // Âncora: conecte 4 no onAction da NavbarBottom.
  {
    destination: 'courses',
    label: 'Cursos',
    icon: require('../../assets/images/bottom-nav-learning.png'),
  },
  // Âncora: conecte 5 no onAction da NavbarBottom.
  {
    destination: 'settings',
    label: 'Configurações',
    icon: require('../../assets/images/bottom-nav-settings.png'),
  },
];

interface NavbarBottomProps {
  onAction?: (destination: BottomNavDestination) => void;
}

export function NavbarBottom({ onAction }: NavbarBottomProps) {
  return (
    <View style={styles.bar}>
      {bottomIcons.map(({ destination, icon, label }) => (
        <Pressable
          key={destination}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel={label}
          onPress={() => onAction?.(destination)}>
          {typeof icon === 'string' ? (
            <Text style={styles.icon}>{icon}</Text>
          ) : (
            <Image source={icon} style={styles.iconImage} contentFit="contain" />
          )}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexShrink: 0,
    marginHorizontal: 8,
    marginBottom: 10,
    backgroundColor: '#27DF07',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'rgba(9, 39, 3, 0.6)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  iconButton: {
    width: 52,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButtonPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.94 }],
  },
  icon: {
    fontSize: 25,
  },
  iconImage: {
    width: 52,
    height: 52,
  },
});
