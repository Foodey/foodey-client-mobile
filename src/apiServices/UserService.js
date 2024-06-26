import * as request from '~/utils/jwtRequests';
import { UserEndpoint } from '../constants/API_Endpoints';

export const getPendingOrderAPI = async () => {
  try {
    const response = await request.private.get(`${UserEndpoint.GET_USER_ORDER}?status=PENDING`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getDeliveredOrderAPI = async () => {
  try {
    const response = await request.private.get(`${UserEndpoint.GET_USER_ORDER}?status=DELIVERED`);
    return response;
  } catch (err) {
    console.log(err.response);
  }
};

export const getFavoriteRestaurantsAPI = async () => {
  try {
    const response = await request.private.get(`${UserEndpoint.GENERAL_USER_FAVORITE}/shops`);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const getFavoriteMealsAPI = async () => {
  try {
    const response = await request.private.get(`${UserEndpoint.GENERAL_USER_FAVORITE}/products`);

    return response;
  } catch (err) {
    console.log(err);
  }
};

export const addFavoriteRestaurantsAPI = async (restaurantID) => {
  try {
    const response = await request.private.post(
      `${UserEndpoint.GENERAL_USER_FAVORITE}/shops/${restaurantID}`,
    );
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const removeFavoriteRestaurantsAPI = async (restaurantID) => {
  try {
    const response = await request.private.delete(
      `${UserEndpoint.GENERAL_USER_FAVORITE}/shops/${restaurantID}`,
    );

    return response;
  } catch (err) {
    console.log(err);
  }
};

// export const addFavoriteMealsAPI = async (mealID) => {
//   try {
//     const response = await request.private.post(
//       `${UserEndpoint.GENERAL_USER_FAVORITE}/meals/${mealID}`,
//     );

//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const removeFavoriteMealsAPI = async (mealID) => {
//   try {
//     const response = await request.private.delete(
//       `${UserEndpoint.GENERAL_USER_FAVORITE}/meals/${mealID}`,
//     );

//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// };
