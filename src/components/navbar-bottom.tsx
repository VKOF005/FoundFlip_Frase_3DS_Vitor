import { Image } from 'expo-image';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const bottomIcons = [
  // botao para: Planilha
  require('../../assets/images/bottom-nav-record.png'),
  // botao para: 
  require('../../assets/images/bottom-nav-stats.png'),
  // botao para: Home
  require('../../assets/images/bottom-nav-home.png'),
  // botao para: Cursos
  require('../../assets/images/bottom-nav-learning.png'),
  // botao para: Config
  require('../../assets/images/bottom-nav-settings.png'),
];

export function NavbarBottom() {
  return (
    <View style={styles.bar}>
      {bottomIcons.map((icon, index) => (
        <Pressable
          key={`${icon}-${index}`}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={`Navigation item ${index + 1}`}>
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
    borderRadius: 28,
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderColor: '#092703',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  iconButton: {
    width: 44,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 25,
  },
  iconImage: {
    width: 42,
    height: 42,
  },
});
