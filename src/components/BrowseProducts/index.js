import React, { Component } from 'react';
import {
  Grid, Search, Label, Segment,
} from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import _, { get } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import ItemGrid from '../ItemGrid';
import CategoryMenu from '../CategoryMenu';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

const resultRenderer = ({ title }) => <Label content={title} />;

resultRenderer.propTypes = {
  title: PropTypes.string.isRequired,
};

const initialState = {
  isLoading: false, results: [], value: '', selectedCategory: 'All',
};
class BrowseProducts extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => {
    this.setState({
      value: result.title,
      selectedCategory: 'All',
    });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      const { value } = this.state;
      const { items } = this.props;
      const itemNames = items.map((item) => ({ title: item.name }));

      if (value.length < 1) {
        return this.setState({
          isLoading: false, results: [], value: '',
        });
      }

      const re = new RegExp(_.escapeRegExp(value), 'i');
      const isMatch = (result) => re.test(result.title);

      this.setState({
        isLoading: false,
        results: _.filter(itemNames, isMatch),
      });
    }, 300);
  }

  handleCategoryClick = (e, { name }) => this.setState({
    selectedCategory: name,
    value: '',
  })

  render() {
    const {
      contextRef, categories, match,
    } = this.props;
    const {
      isLoading, value, results, selectedCategory,
    } = this.state;
    const { url } = match;

    if (!isLoaded(categories)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(categories)) {
      return <div>No categories to display...</div>;
    }

    return (
      <div>
        <Segment basic textAlign="center">
          <Search
            fluid
            size="large"
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, {
              leading: true,
            })}
            results={results}
            value={value}
            resultRenderer={resultRenderer}
            // {...this.props}
          />
        </Segment>
        <Grid columns={2} divided={false}>
          <Grid.Row>
            <Grid.Column width={3}>
              <CategoryMenu
                contextRef={contextRef}
                handleCategoryClick={this.handleCategoryClick}
                selectedCategory={selectedCategory}
              />
            </Grid.Column>
            <Grid.Column width={13}>


              {
                selectedCategory === 'All'
                  ? categories.map(({ name }) => (
                    <ItemGrid
                      selectedCategory={name}
                      key={name}
                      url={applyUrlCorrection(url)}
                      searchString={value}
                    />
                  ))
                  : (
                    <ItemGrid
                      url={applyUrlCorrection(url)}
                      selectedCategory={selectedCategory}
                      searchString={value}
                    />
                  )
              }


            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: get(state.firestore.data, 'sellerStore.categories'),
  items: get(state.firestore.ordered, 'sellerItems'),
});

function withHooks(Component) {
  return function WrappedComponent(props) {
    const match = useRouteMatch();
    return <Component {...props} match={match} />;
  };
}

export default compose(
  withHooks,
  connect(mapStateToProps),
)(BrowseProducts);

BrowseProducts.propTypes = {
  contextRef: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  items: PropTypes.array,
};

BrowseProducts.defaultProps = {
  items: undefined,
};
