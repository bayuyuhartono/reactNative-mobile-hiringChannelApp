const initialState = {
  engineers: [],
  isLoading: false,
  isError: false,
  isEmpty: false,
};

const engineers = (state = initialState, action) => {
  switch (action.type) {
    // loading
    case 'FETCH_ENGINEERS_PENDING':
    case 'FETCH_SINGLE_ENGINEER_PENDING':
      return {
        ...state, // collect all previous state
        isError: false,
        isLoading: true,
      };
    case 'MORE_ENGINEERS_PENDING':
      return {
        ...state, // collect all previous state
        isError: false,
        isLoading: false,
      };

    // gagal
    case 'FETCH_ENGINEERS_REJECTED':
    case 'FETCH_SINGLE_ENGINEER_REJECTED':
    case 'MORE_ENGINEERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        isEmpty: true,
      };

    // berhasil
    case 'FETCH_ENGINEERS_FULFILLED':
      console.log('masuk fulfilled');
      if (action.payload.data.message !== 'Not Found') {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isEmpty: false,
          // engineers: action.payload.data
          engineers: [...action.payload.data.data],
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
          // engineers: action.payload.data
          engineers: [],
          total_page: [],
          current_page: [],
          prevPage: [],
          nextPage: [],
        };
      }

    case 'FETCH_SINGLE_ENGINEER_FULFILLED':
      console.log('masuk fulfilled');
      if (action.payload.data.data) {
        return {
          state,
          isLoading: false,
          isError: false,
          isEmpty: false,
          // engineer: action.payload.data
          engineers: [...action.payload.data.data],
        };
      } else {
        return {
          state,
          isLoading: false,
          isError: false,
          isEmpty: true,
          // engineer: action.payload.data
          engineers: [],
        };
      }

    case 'MORE_ENGINEERS_FULFILLED':
      console.log('masuk more fulfilled');
      if (action.payload.data.message !== 'Not Found') {
        return {
          ...state,
          isLoading: false,
          isError: false,
          isEmpty: false,
          // engineers: action.payload.data
          engineers: [...state.engineers, ...action.payload.data.data],
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
          // engineers: action.payload.data
          engineers: [],
          total_page: [],
          current_page: [],
          prevPage: [],
          nextPage: [],
        };
      }

    default:
      return state;
  }
};

export default engineers;
