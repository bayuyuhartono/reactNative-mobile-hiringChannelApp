const initialState = {
  engineersHome: [],
  companysHome: [],
  isLoading: false,
  isError: false,
  isEmpty: false,
};

const home = (state = initialState, action) => {
  switch (action.type) {
    // loading
    case 'FETCH_ENGINEERS_HOME_PENDING':
    case 'FETCH_COMPANYS_HOME_PENDING':
      return {
        ...state, // collect all previous state
        isError: false,
        isLoading: true,
      };

    // gagal
    case 'FETCH_ENGINEERS_HOME_REJECTED':
    case 'FETCH_COMPANYS_HOME_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isEmpty: true,
      };

    // berhasil
    case 'FETCH_ENGINEERS_HOME_FULFILLED':
      console.log('masuk fulfilled');
      if (action.payload.data.message !== 'Not Found') {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isEmpty: false,
          // engineersHome: action.payload.data
          engineersHome: [...action.payload.data.data],
          total_page: [...action.payload.data.total_page],
          current_page: [...action.payload.data.current_page],
          prevPage: [action.payload.data.prevPage],
          nextPage: [action.payload.data.nextPage],
        };
      } else {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isEmpty: true,
          // engineersHome: action.payload.data
          engineersHome: [],
          total_page: [],
          current_page: [],
          prevPage: [],
          nextPage: [],
        };
      }

    case 'FETCH_COMPANYS_HOME_FULFILLED':
      console.log('masuk fulfilled');
      if (action.payload.data.message !== 'Not Found') {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isEmpty: false,
          // companysHome: action.payload.data
          companysHome: [...action.payload.data.data],
        };
      } else {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isEmpty: true,
          // companysHome: action.payload.data
          companysHome: [],
          forbidden: true,
        };
      }

    default:
      return state;
  }
};

export default home;
