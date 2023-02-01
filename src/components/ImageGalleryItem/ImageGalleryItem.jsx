import { ImgGalleryImg, ImgGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClickItem,
  ref,
}) => {
  return (
    <ImgGalleryItem ref={ref}>
      <ImgGalleryImg
        src={webformatURL}
        alt={tags}
        onClick={onClickItem}
        data-source={largeImageURL}
      />
    </ImgGalleryItem>
  );
};
