import { View, Text, TextInput, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { COLOR } from '../../constants/Colors';
import { IntroHeader } from '../../components/seller';
import { StarRating } from '../../components';
import { Star } from '../../resources/icons';
import { SubmitButton } from '../../components';
import { orderEvaluateAPI } from '../../apiServices/UserService';
import HTTPStatus from '../../constants/HTTPStatusCodes';

const RatingScreen = ({ navigation, route }) => {
  const { orderID, isRated, orderRating, orderComment } = route.params;

  const onBackPress = () => {
    navigation.goBack();
  };

  const onSubmitPress = async (orderID, rating, comment) => {
    try {
      const response = await orderEvaluateAPI(orderID, rating, comment);
      if (
        response.status === HTTPStatus.OK ||
        response.status === HTTPStatus.CREATED ||
        response.status === HTTPStatus.NO_CONTENT
      ) {
        setRating(0);
        setComment('');
        navigation.goBack();
      } else if (response.status === HTTPStatus.CONFLICT) {
        console.log('User already evaluate this order');
      } else {
        console.log('Error when submit order evaluation');
      }
    } catch (err) {
      console.log('Error when submit order evaluation ' + err);
    }
  };

  const [rating, setRating] = useState(orderRating);
  const [comment, setComment] = useState(orderComment);
  const [isAlreadyRated, setIsAlreadyRate] = useState(isRated);
  const [canSubmit, setCanSubmit] = useState(false);

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
          isEditable={!isAlreadyRated}
          maxStar={5}
          value={rating}
          onRatingChange={(value) => setRating(value)}
        />
        <Text style={[styles.shop_name_text, { color: COLOR.text_pink_color }]}>
          {rating === 1
            ? 'Very Bad'
            : rating === 2
            ? 'Bad'
            : rating === 3
            ? 'Normal'
            : rating === 4
            ? 'Good'
            : rating === 5
            ? 'Excellent'
            : 'Not Rated'}
        </Text>
      </View>
      <View style={styles.second_content_container}>
        <Text style={[styles.shop_name_text, { marginTop: 0, marginBottom: 5 }]}>Comment: </Text>
        <View style={styles.text_input_container}>
          <TextInput
            editable={!isAlreadyRated}
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
        {!(orderRating >= 0) && (
          <SubmitButton
            disabled={canSubmit}
            style={{ flex: 1 }}
            title={'Submit Evaluation'}
            buttonColor={COLOR.button_primary_color}
            hoverColor={COLOR.button_press_primary_color}
            onPressFunction={() => onSubmitPress(orderID, rating, comment)}
          />
        )}
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
