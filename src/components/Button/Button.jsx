import { ButtonMore } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ nextPage }) => {
  return (
    <ButtonMore type="button" onClick={nextPage}>
      Load more
    </ButtonMore>
  );
};

Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};
