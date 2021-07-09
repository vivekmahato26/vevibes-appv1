import React from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

// constants
import theme from '../constants/theme';
const {COLORS, FONTS, SIZES} = theme;

const Slider = ({navigation, items, type}) => {
  const [completed, setCompleted] = React.useState(false);
  const scrollRef = React.createRef();

  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    scrollX.addListener(({value}) => {
      if (Math.floor(value / SIZES.width) === items.length - 1) {
        setCompleted(true);
      }
    });

    return () => scrollX.removeListener();
  }, []);

  // Render

  function skipScreen(index) {
    navigation.navigate("Welcome");
  }

  function renderContent() {
    return (
      <Animated.ScrollView
        ref={(ref) => {scrollRef.current = ref}}
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}>
        {items.map((item, index) => (
          <View
            ref={scrollRef}
            //center
            //bottom
            key={`img-${index}`}
            style={styles.imageAndTextContainer}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 10,
              }}>
              <Image
                source={{uri: item.img}}
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: '70%',
                }}
              />
              {item.title.map((t, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      ...FONTS.h1,
                      color: COLORS.primary,
                      textAlign: 'center',
                    }}>
                    {t}
                  </Text>
                );
              })}

              <Text
                style={{
                  ...FONTS.body3,
                  textAlign: 'center',
                  color: COLORS.gray,
                }}>
                {item.description}
              </Text>
            </View>
            {/* Button */}
            {type === 'onboarding' && (
              <TouchableOpacity style={styles.button}>
                <Text
                  style={{
                    ...FONTS.h3,
                    color: COLORS.white,
                    textAlign: 'center',
                  }}
                  onPress={() => {skipScreen(index)}}>
                  {index === 2 ? 'GET STARTED' : 'SKIP'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </Animated.ScrollView>
    );
  }

  function renderDots() {
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View style={styles.dotsContainer}>
        {items.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 10, 10],
            extrapolate: 'clamp',
          });

          const width = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 35, 10],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, {width: width, height: dotSize}]}
            />
          );
        })}
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>{renderContent()}</View>
      <View style={styles.dotsRootContainer}>{renderDots()}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  imageAndTextContainer: {
    width: SIZES.width,
  },
  dotsRootContainer: {
    position: 'absolute',
    bottom: 0,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding / 2,
    marginBottom: SIZES.padding * 3,
    height: SIZES.padding,
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    marginBottom: 20,
    width: SIZES.width / 2,
    alignSelf: 'center',
  },
});

export default Slider;
