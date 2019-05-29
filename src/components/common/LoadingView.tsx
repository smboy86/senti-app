import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
} from 'react-native';
import { Text } from 'components';
import { palette } from 'services/style';

class LoadingView extends React.PureComponent<{}> {
  private fadeAnimation = new Animated.Value(0);

  private opacityStyle = {
    opacity: this.fadeAnimation,
  };

  public componentDidMount() {
    Animated.timing(this.fadeAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  public componentWillUnmount() {
    this.fadeAnimation.setValue(0);
  }

  public render() {
    return (
      <Animated.View style={[styles.container, this.opacityStyle]}>
        <View style={styles.content}>
          <ActivityIndicator color={palette.yellow.default} size="large" />
          <Text style={styles.text}>
            로딩 중..
          </Text>
        </View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 999,
  },
  content: {
    padding: 24,
    paddingBottom: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  text: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
    color: palette.gray[10],
  },
});

export default LoadingView;