import { Component, createRef } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { getImages } from '../../services/api';
import { SearchBar } from 'components/SearchBar/SearchBar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
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

  imagesItemRef = createRef();

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.images.length !== this.state.images.length) {
      return this.imagesRef?.current?.scrollHeight ?? null;
    }
    return null;
  }

  componentDidUpdate(_, prevState, snapShot) {
    if (
      prevState.page !== this.state.page ||
      prevState.search !== this.state.search
    ) {
      this.loafImages();
    }

    if (snapShot) {
      window.scrollTo({ top: snapShot, behavior: 'smooth' });
    }
  }

  // scroll = () => {
  //   this.imagesItemRef?.current?.scrollIntoView({
  //     block: 'start',
  //     behavior: 'smooth',
  //   });
  // };

  loafImages = async () => {
    this.setState({ isLoading: true });
    try {
      const photos = await getImages(this.state.search, this.state.page);
      this.setState({
        images: [...this.state.images, ...photos.data.hits],
      });
    } catch (error) {
      this.setState({ error });
      toast.error(`Something went wrong ${error}`);
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
  };

  render() {
    const { isLoading, images, bigImage, error } = this.state;

    // if (error)
    //   return (
    //     <ToastContainer
    //       position="top-center"
    //       autoClose={3000}
    //       // hideProgressBar={false}
    //       // newestOnTop={false}
    //       // closeOnClick
    //       // rtl={false}
    //       // pauseOnFocusLoss
    //       // draggable
    //       // pauseOnHover
    //     />
    //   );

    return (
      <AppWrap>
        <SearchBar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}

        {images && !isLoading && (
          <ImageGallery
            images={images}
            onClick={this.toggleModal}
            imagesItemRef={this.imagesItemRef}
            onScroll={this.scroll}
          />
        )}

        {bigImage && <Modal img={bigImage} onClick={this.toggleModal} />}
        {images.length !== 0 && <Button nextPage={this.loadMore} />}
      </AppWrap>
    );
  }
}
