import { Component } from 'react';
import { ImHipster } from 'react-icons/im';
import { SearchButton } from 'components/Button/Button.styled';
import {
  SearchForm,
  SearchHeader,
  SearchLabel,
  SearchInput,
} from './SearchBar.styled';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    searchPhotos: '',
  };

  handleChangeInput = e => {
    //Відслідковує поле INPUT
    this.setState({ searchPhotos: e.target.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchPhotos } = this.state;
    this.props.onSubmit(searchPhotos);

    this.reset();
  };

  reset = () => {
    this.setState({ searchPhotos: '' });
  };

  render() {
    const { searchPhotos } = this.state;
    return (
      <SearchHeader>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchButton type="submit">
            <SearchLabel>Search</SearchLabel>
            <ImHipster size="25px" />
          </SearchButton>

          <SearchInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChangeInput}
            value={searchPhotos}
          />
        </SearchForm>
      </SearchHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
