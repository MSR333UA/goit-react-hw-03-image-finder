import { Component } from 'react';

// import { ToastContainer, toast } from 'react-toastify';
import { getImages } from '../../services/api';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { AppWrap } from './App.styled';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    images: [],
    image: null,
    alt: null,
    error: null,
    isLoading: false,
    page: 1,
    search: '',
    bigImage: '',
    showModal: false,
  };

  async componentDidMount() {
    this.setState({ search: '', page: 1 });
  }

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      try {
        this.setState({ isLoading: true });
        const photos = await getImages(this.state.search, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...photos.data.hits],
        }));
      } catch (error) {
        this.setState({ error: ' помилка. Перезавантажте сторінку' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal, bigImage }) => ({
      showModal: !showModal,
      bigImage: largeImageURL,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSubmit = search => {
    this.setState({ search });
  };

  selectImage = (image, alt) => {
    this.setState({ image, alt });
  };
  onClose = () => {
    this.setState({ image: null });
  };

  render() {
    const { isLoading, showModal, images, bigImage } = this.state;

    return (
      <AppWrap>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}

        {images && !isLoading && (
          <ImageGallery images={images} onClick={this.toggleModal} />
        )}

        {showModal && <Modal img={bigImage} onClick={this.toggleModal} />}
        {images.length !== 0 && <Button nextPage={this.loadMore} />}
      </AppWrap>
    );
  }
}
