import React from 'react';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacityProps,
  TouchableNativeFeedbackProps,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
} from 'react-native';
import { palette } from 'constants/style';

export interface Props extends TouchableOpacityProps, TouchableNativeFeedbackProps {
  round?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

class Button extends React.PureComponent<Props> {
  private layout: {
    width?: number;
    height?: number;
  } = {};

  public render() {
    const {
      round,
      isLoading,
      style,
      buttonStyle,
      children,
      ...props
    } = this.props;
    const loadableChildren = isLoading ? <ActivityIndicator color={palette.white.default} /> : children;

    return Platform.select({
      ios: (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isLoading}
          style={buttonStyle}
          {...props}
        >
          <View onLayout={this.onLayout} style={[style, this.layout]}>
            {loadableChildren}
          </View>
        </TouchableOpacity>
      ),
      android: (
        <TouchableNativeFeedback
          disabled={isLoading}
          background={round
            ? TouchableNativeFeedback.SelectableBackgroundBorderless()
            : TouchableNativeFeedback.SelectableBackground()
          }
          style={buttonStyle}
          {...props}
        >
          <View onLayout={this.onLayout} style={[style, this.layout]}>
            {loadableChildren}
          </View>
        </TouchableNativeFeedback>
      ),
    });
  }

  private onLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    const { width, height } = nativeEvent.layout;

    if (Object.keys(this.layout).length === 0) {
      this.layout = { width, height };
    }
  }
}

export default Button;
