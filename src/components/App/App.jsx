import { Component } from 'react';

// import { ToastContainer, toast } from 'react-toastify';
import { getImages } from '../../services/api';
import { SearchBar } from 'components/SearchBar/SearchBar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { AppWrap } from './App.styled';
import { Button } from 'components/Button/Button';

export class App extends Component {
  state = {
    search: '',
    images: [],
    error: null,
    isLoading: false,
    page: 1,
    bigImage: '',
  };

  // const status = {
  //   IDLE: 'idle',
  //   PENDING: 'pending',
  //   REJECTED: 'rejected',
  //   RESOLVED: 'resolved',
  // };;

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.loadImages();
    }
  }

  loadImages = async () => {
    this.setState({ isLoading: true });
    try {
      const photos = await getImages(this.state.search, this.state.page);
      this.setState({
        images: [...this.state.images, ...photos.data.hits],
      });
    } catch (error) {
      this.setState({ error });
      alert(`Something went wrong ${error}`);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleModal = largeImageURL => {
    this.setState(({ showModal, bigImage }) => ({
      showModal: !showModal,
      bigImage: largeImageURL,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleSubmit = async search => {
    this.setState({ search, page: 1, images: [] });
    window.scrollTo({ top: 10, behavior: 'smooth' });
  };

  render() {
    const { isLoading, images, bigImage } = this.state;

    return (
      <AppWrap>
        <SearchBar onSubmit={this.handleSubmit} />

        {isLoading && <Loader />}

        {images && <ImageGallery images={images} onClick={this.toggleModal} />}

        {bigImage && <Modal img={bigImage} onClick={this.toggleModal} />}
        {images.length !== 0 && <Button nextPage={this.loadMore} />}
      </AppWrap>
    );
  }
}
