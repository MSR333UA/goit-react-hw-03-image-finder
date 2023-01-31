import { ImgGalleryImg, ImgGalleryItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onClickItem,
}) => {
  return (
    <ImgGalleryItem>
      <ImgGalleryImg
        src={webformatURL}
        alt={tags}
        onClick={onClickItem}
        data-source={largeImageURL}
      />
    </ImgGalleryItem>
  );
};
