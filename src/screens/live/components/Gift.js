import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import {SCREEN_WIDTH} from '../../../config/Screen';

const SLIDE_DISTANCE = SCREEN_WIDTH;
const MESSAGE_DURATION = 3000;

const Message = ({content, onAnimationComplete, id}) => {
  const translateX = new Animated.Value(SCREEN_WIDTH);
  useEffect(() => {
    const slideAnimation = Animated.timing(translateX, {
      toValue: -SCREEN_WIDTH,
      duration: MESSAGE_DURATION, // Adjust duration as needed
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    });

    const timeout = setTimeout(() => {
      onAnimationComplete(id);
    }, MESSAGE_DURATION);

    slideAnimation.start();

    return () => {
      slideAnimation.stop();
      clearTimeout(timeout);
    };
  }, []);

  const animatedStyle = {
    transform: [{translateX}],
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text>{content}</Text>
    </Animated.View>
  );
};

const Gift = () => {
  const [messages, setMessages] = useState([]);

  const handleMessage = content => {
    const newMessage = {id: Math.random().toString(), content};
    setMessages(prevMessages => [...prevMessages, newMessage]);

    setTimeout(() => {
      setMessages(prevMessages =>
        prevMessages.filter(msg => msg.id !== newMessage.id),
      );
    }, MESSAGE_DURATION/1.5);
  };

  const handleAnimationComplete = id => {
    setMessages(prevMessages => prevMessages.filter(msg => msg.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        {messages.map((message, index) => (
          <Message
            key={index}
            content={message.content}
            id={message.id}
            onAnimationComplete={() => handleAnimationComplete()}
          />
        ))}
      </View>
      <TouchableOpacity onPress={() => handleMessage('New message')}>
        <Text>Add Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Gift;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  messageContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  message: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 5,
    marginVertical: 5,
  },
});
