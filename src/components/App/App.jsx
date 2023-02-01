import { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { getImages } from '../../services/api';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Loader } from 'components/Loader/Loader';
import { Modal } from 'components/Modal/Modal';
import { AppWrap } from './App.styled';
import { Button } from 'components/Button/Button';
import { createRef } from 'react';

export class App extends Component {
  state = {
    search: '',
    images: [],
    error: null,
    isLoading: false,
    page: 1,
    bigImage: '',
    // showModal: false,
  };

  async componentDidMount() {
    this.setState({ search: '', page: 1 });
  }

  // getSnapshotBeforeUpdate(_, prevState) {
  //   console.dir(this.imagesRef?.current);
  //   // if (prevState.photos.length === this.state.photos.length) {
  //   //   console.dir(this.imagesRef.current);
  //   // }
  //   return null;
  // }

  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.setState({ isLoading: true });
      try {
        const photos = await getImages(this.state.search, this.state.page);
        this.setState({
          images: [...this.state.images, ...photos.data.hits],
        });
      } catch (error) {
        this.setState({ error });
        toast.info(`Something went wrong ${error}`);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    // if (this.state.images !== prevState.images) {
    //   console.log('imagesItemRef', this.imagesItemRef);
    //   this.imagesItemRef.current.scrollIntoView({
    //     block: 'start',
    //     behavior: 'smooth',
    //   });
    // }
  }
  // imagesItemRef = createRef();

  toggleModal = largeImageURL => {
    this.setState(({ showModal, bigImage }) => ({
      showModal: !showModal,
      bigImage: largeImageURL,
    }));
  };

  loadMore = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 })

      // async () => {
      //   const { images } = await getImages(undefined, this.state.page);
      //   this.setState(prev => ({ images: [...prev.images, ...images] }));
      // }
    );

    // this.setState(prevState => ({
    //   images: [...prevState.images, ...this.state.images]
    // }));
  };

  handleSubmit = async search => {
    this.setState({ search, page: 1, images: [] });

    // this.setState({ page: 1 }, async () => {
    //   const { images } = await getImages(search, this.state.page);
    //   this.setState({ images });
    // });
  };

  render() {
    const { isLoading, images, bigImage, error } = this.state;

    if (error)
      return (
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      );

    return (
      <AppWrap>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}

        {images && !isLoading && (
          <ImageGallery
            images={images}
            onClick={this.toggleModal}
            imagesItemRef={this.imagesItemRef}
          />
        )}

        {bigImage && <Modal img={bigImage} onClick={this.toggleModal} />}
        {images.length !== 0 && <Button nextPage={this.loadMore} />}

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </AppWrap>
    );
  }
}
