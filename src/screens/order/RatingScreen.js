import { View, Text, TextInput, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { COLOR } from '../../constants/Colors';
import { IntroHeader } from '../../components/seller';
import { StarRating } from '../../components';
import { Star } from '../../resources/icons';
import { SubmitButton } from '../../components';

const RatingScreen = ({ navigation }) => {
  const onBackPress = () => {
    navigation.goBack();
  };

  const onSubmitPress = () => {
    //Validate before submit
  };

  const [orderRating, setOrderRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR.background_color} />
      <IntroHeader title="Order Rating" onLeftButtonPress={onBackPress} />
      <View style={styles.first_content_container}>
        <Image
          style={styles.shop_logo_image}
          source={require('../../resources/images/kfc-logo.png')}
        />
        <Text style={styles.shop_name_text}>Shop Name</Text>
        <StarRating
          maxStar={5}
          value={orderRating}
          onRatingChange={(value) => setOrderRating(value)}
        />
        <Text style={[styles.shop_name_text, { color: COLOR.text_pink_color }]}>
          {orderRating === 1
            ? 'Very Bad'
            : orderRating === 2
            ? 'Bad'
            : orderRating === 3
            ? 'Normal'
            : orderRating === 4
            ? 'Good'
            : orderRating === 5
            ? 'Excellent'
            : 'Not Rated'}
        </Text>
      </View>
      <View style={styles.second_content_container}>
        <Text style={[styles.shop_name_text, { marginTop: 0, marginBottom: 5 }]}>Comment: </Text>
        <View style={styles.text_input_container}>
          <TextInput
            value={comment}
            multiline
            placeholder="Leave your comment here..."
            style={styles.note_text}
            textAlignVertical="top"
            onChangeText={(value) => setComment(value)}
          />
          <Text
            style={{
              marginStart: 'auto',
              marginTop: 'auto',
              fontFamily: 'Manrope-Medium',
              fontSize: 16,
              color:
                comment.length > 200 ? COLOR.text_errorMessage_color : COLOR.text_secondary_color,
            }}
          >
            {comment.length}/200
          </Text>
        </View>
      </View>
      <View style={styles.footer_container}>
        <SubmitButton
          style={{ flex: 1 }}
          title={'Next'}
          buttonColor={COLOR.button_primary_color}
          hoverColor={COLOR.button_press_primary_color}
          onPressFunction={() => onSubmitPress()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  first_content_container: {
    flex: 3,
    // backgroundColor: '#f0f',
    backgroundColor: COLOR.background_color,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 21,
    marginVertical: 21,
  },

  second_content_container: {
    flex: 2.5,
    backgroundColor: COLOR.background_color,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 21,
  },

  footer_container: {
    flex: 0.5,
    backgroundColor: COLOR.background_color,
    paddingHorizontal: 21,
    marginBottom: 10,
  },

  shop_logo_image: {
    width: '30%',
    height: '30%',
    marginTop: 10,
  },

  shop_name_text: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 20,
    color: COLOR.text_primary_color,
    marginVertical: 15,
  },

  text_input_container: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR.text_press_color,
    paddingHorizontal: 5,
    flex: 1,
  },

  header_text: {
    fontFamily: 'Manrope-SemiBold',
    color: COLOR.text_primary_color,
    fontSize: 30,
  },

  note_text: {
    fontFamily: 'Manrope-Regular',
    color: COLOR.text_primary_color,
    fontSize: 20,
  },
});

export default RatingScreen;
