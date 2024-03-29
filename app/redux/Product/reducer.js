import _ from 'lodash'
import * as types from './actionTypes'

const initialState = {
  loading: null,
  error:null,

  allProduct: null,
  wishlistProduct: null,
  myAdsProduct: null,
  searchProduct: null,
};

export default function products(state = initialState, action = {}) {
  switch (action.type) {
    /**************************/
    /* Add product
    /**************************/
    case types.ADD_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.ADD_PRODUCT_REQUEST,
      };
    case types.ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: types.ADD_PRODUCT_SUCCESS,
      }
    case types.ADD_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.ADD_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Update product
    /**************************/
    case types.UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.UPDATE_PRODUCT_REQUEST,
      };
    case types.UPDATE_PRODUCT_SUCCESS:
      const allAdsProduct = state.myAdsProduct.ads
      const newProduct = action.result.data.product[0]
      const restAdsProduct = allAdsProduct.filter(item => item.product_id !== newProduct.product_id)
      return {
        ...state,
        myAdsProduct: {
          ...restAdsProduct,
          newProduct,
        },
        loading: types.UPDATE_PRODUCT_SUCCESS,
      }
    case types.UPDATE_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.UPDATE_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Delete product
    /**************************/
    case types.DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.DELETE_PRODUCT_REQUEST,
      };
    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: types.DELETE_PRODUCT_SUCCESS,
      }
    case types.DELETE_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.DELETE_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Get product by category
    /**************************/
    case types.GET_PRODUCT_BY_CATEGORY_REQUEST:
      return {
        ...state,
        loading: types.GET_PRODUCT_BY_CATEGORY_REQUEST,
        allProduct: null,
      };
    case types.GET_PRODUCT_BY_CATEGORY_SUCCESS: {
      return {
        ...state,
        loading: types.GET_PRODUCT_BY_CATEGORY_SUCCESS,
        allProduct: action.result.data.product,
      }
    }
    case types.GET_PRODUCT_BY_CATEGORY_FAILED:
      return {
        ...state,
        loading: types.GET_PRODUCT_BY_CATEGORY_FAILED,
        error: action.error,
      };
    /**************************/
    /* Get wishlist product
    /**************************/
    case types.GET_WISHLIST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.GET_WISHLIST_PRODUCT_REQUEST,
        wishlistProduct: null,
      };
    case types.GET_WISHLIST_PRODUCT_SUCCESS: {
      const { data } = action.result
      return {
        ...state,
        loading: types.GET_WISHLIST_PRODUCT_SUCCESS,
        wishlistProduct: data.status === 107 ?
          [] :
          (!data.products ? [] : data.products),
      }
    }
    case types.GET_WISHLIST_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.GET_WISHLIST_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Del wishlist product
    /**************************/
    case types.DEL_WISHLIST_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.DEL_WISHLIST_PRODUCT_REQUEST,
      };
    case types.DEL_WISHLIST_PRODUCT_SUCCESS:
      const { productId } = action.payload
      const { allProduct } = state
      const currentProduct = _.filter(allProduct, item => item.product_id === productId)
      const restProduct = _.filter(allProduct, item => item.product_id !== productId)

      return {
        ...state,
        loading: types.DEL_WISHLIST_PRODUCT_SUCCESS,
        allProduct: [
          ...restProduct,
          {
            ...currentProduct[0],
            favorite: false
          }
        ]
      }
    case types.DEL_WISHLIST_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.DEL_WISHLIST_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Get my ads product
    /**************************/
    case types.GET_ADS_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.GET_ADS_PRODUCT_REQUEST,
      };
    case types.GET_ADS_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: types.GET_ADS_PRODUCT_SUCCESS,
        myAdsProduct: action.result.status === 107 ? [] : action.result.data,
      }
    }
    case types.GET_ADS_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.GET_ADS_PRODUCT_FAILED,
        error: action.error,
      };
    /**************************/
    /* Add product favorite
    /**************************/
    case types.SET_FAVORITE_REQUEST:
      return {
        ...state,
        loading: types.SET_FAVORITE_REQUEST,
      };
    case types.SET_FAVORITE_SUCCESS: {
      const { productId, flag } = action.payload
      const { allProduct } = state
      const currentProduct = _.filter(allProduct, item => item.product_id === productId)
      const restProduct = _.filter(allProduct, item => item.product_id !== productId)

      return {
        ...state,
        loading: types.SET_FAVORITE_SUCCESS,
        allProduct: [
          ...restProduct,
          {
            ...currentProduct[0],
            favorite: !flag
          }
        ]
      }
    }
    case types.SET_FAVORITE_FAILED:
      return {
        ...state,
        loading: types.SET_FAVORITE_FAILED,
        error: action.error,
      };
    /**************************/
    /* Add product favorite
    /**************************/
    case types.ADD_VIEW_COUNT_REQUEST:
      return {
        ...state,
        loading: types.ADD_VIEW_COUNT_REQUEST,
      };
    case types.ADD_VIEW_COUNT_SUCCESS: {
      const { data } = action.result
      const { productId } = action.payload
      const { allProduct, wishlistProduct } = state
      const currentProduct = _.filter(allProduct, item => item.product_id === productId)
      const restProduct = _.filter(allProduct, item => item.product_id !== productId)

      const restWishlistProduct = _.filter(wishlistProduct, item => item.product_id !== productId)

      return {
        ...state,
        loading: types.ADD_VIEW_COUNT_SUCCESS,
        allProduct: [
          ...restProduct,
          {
            ...currentProduct[0],
            viewed: data.viewcount
          }
        ],
        wishlistProduct: [
          ...restWishlistProduct,
          {
            ...currentProduct[0],
            viewed: data.viewcount
          }
        ]
      }
    }
    case types.ADD_VIEW_COUNT_FAILED:
      return {
        ...state,
        loading: types.ADD_VIEW_COUNT_FAILED,
        error: action.error,
      };
    /**
     * Search product
     */
    case types.SEARCH_PRODUCT_REQUEST:
      return {
        ...state,
        loading: types.SEARCH_PRODUCT_REQUEST,
        searchProduct: null,
      };
    case types.SEARCH_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: types.SEARCH_PRODUCT_SUCCESS,
        searchProduct: action.result.data,
      }
    }
    case types.SEARCH_PRODUCT_FAILED:
      return {
        ...state,
        loading: types.SEARCH_PRODUCT_FAILED,
        searchProduct: null,
        error: action.error,
      };
    /**
     * Send report
     */
    case types.SEND_REPORT_REQUEST:
      return {
        ...state,
        loading: types.SEND_REPORT_REQUEST
      };
    case types.SEND_REPORT_SUCCESS: {
      return {
        ...state,
        loading: types.SEND_REPORT_SUCCESS
      }
    }
    case types.SEND_REPORT_FAILED:
      return {
        ...state,
        loading: types.SEND_REPORT_FAILED
      };
    default:
      return state;
  }
}