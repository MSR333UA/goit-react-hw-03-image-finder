import axios from 'axios';

const API_KEY = '32720500-5203e269c92ae00b8004a244b';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getImages = async (q, page) => {
  return axios.get('', {
    params: {
      q,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
};

// https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12
