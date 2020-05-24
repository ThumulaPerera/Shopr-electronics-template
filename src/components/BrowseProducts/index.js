import React, { Component, createRef } from 'react';
import {
  Grid, Search, Label, Segment, Sticky, Ref, Responsive, Loader,
} from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import _, { get } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
// import { StickyContainer, Sticky } from 'react-sticky';

import ItemGrid from './ItemGrid';
import SearchResultsGrid from './SearchResultsGrid';
import CategoryMenu from './CategoryMenu';
import CategoryDropdown from './CategoryDropdown';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

// component to display reaserch results as drop down

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
    this.setState({ isLoading: true, value, selectedCategory: 'All' });

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

  handleCategoryDropdownSelection = (e, { value }) => this.setState({
    selectedCategory: value,
    value: '',
  })

  handleOnResponsiveUpdate = (e, { width }) => this.setState({ width })

  render() {
    const {
      contextRef, categories, match, items, currency, storeCustomization, ratingEnabled,
    } = this.props;
    const {
      isLoading, value, results, selectedCategory, width,
    } = this.state;
    const { url } = match;
    const contextRef1 = createRef();
    const stickSearchBar = width > Responsive.onlyMobile.maxWidth;
    const { color } = storeCustomization;

    if (!(isLoaded(categories)
          && isLoaded(items)
          && isLoaded(currency)
          && isLoaded(storeCustomization)
    )) {
      return <Loader active size="large" />;
    }

    if (isEmpty(categories)) {
      return <div>No categories to display...</div>;
    }

    return (
      <Responsive
        fireOnMount
        onUpdate={this.handleOnResponsiveUpdate}
      >
        <Ref innerRef={contextRef1}>
          <div>
            <Sticky
              context={contextRef1}
              offset={72}
              active={stickSearchBar}
            >
              <Segment
                textAlign="center"
                color={color}
                inverted
                tertiary
                style={{ padding: '.5em', borderRadius: '0px' }}
              >
                <Grid relaxed="very" padded="horizontally" stackable>
                  <Grid.Row columns={3}>
                    <Grid.Column only="computer" computer="5" />
                    <Grid.Column computer="6" tablet="8">
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
                      />
                    </Grid.Column>
                    <Grid.Column computer="5" tablet="8">
                      <CategoryDropdown
                        handleCategoryClick={this.handleCategoryDropdownSelection}
                        selectedCategory={selectedCategory}
                        categories={categories}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Sticky>
            <Grid>
              <Grid.Row columns={2} only="computer">
                <Grid.Column computer={4}>
                  <CategoryMenu
                    contextRef={contextRef}
                    handleCategoryClick={this.handleCategoryClick}
                    selectedCategory={selectedCategory}
                    categories={categories}
                    storeCustomization={storeCustomization}
                  />
                </Grid.Column>
                <Grid.Column computer={12}>
                  {
                    selectedCategory === 'All'
                    && value === ''
                    && categories.map(({ name }) => (
                      <ItemGrid
                        selectedCategory={name}
                        key={name}
                        url={applyUrlCorrection(url)}
                        searchString={value}
                        categories={categories}
                        currency={currency}
                        items={items}
                        ratingEnabled={ratingEnabled}
                      />
                    ))
                  }
                  {
                    selectedCategory !== 'All'
                    && value === ''
                    && (
                    <ItemGrid
                      url={applyUrlCorrection(url)}
                      selectedCategory={selectedCategory}
                      searchString={value}
                      categories={categories}
                      currency={currency}
                      items={items}
                      ratingEnabled={ratingEnabled}
                    />
                    )
                  }
                  {
                    value !== ''
                    && (
                    <SearchResultsGrid
                      url={applyUrlCorrection(url)}
                      searchString={value}
                      currency={currency}
                      items={items}
                      ratingEnabled={ratingEnabled}
                    />
                    )
                  }

                </Grid.Column>
              </Grid.Row>
              <Grid.Row only="tablet mobile">
                <Grid.Column>
                  {
                    selectedCategory === 'All'
                    && value === ''
                    && categories.map(({ name }) => (
                      <ItemGrid
                        selectedCategory={name}
                        key={name}
                        url={applyUrlCorrection(url)}
                        searchString={value}
                        categories={categories}
                        currency={currency}
                        items={items}
                        ratingEnabled={ratingEnabled}
                      />
                    ))
                  }
                  {
                    selectedCategory !== 'All'
                    && value === ''
                    && (
                    <ItemGrid
                      url={applyUrlCorrection(url)}
                      selectedCategory={selectedCategory}
                      searchString={value}
                      categories={categories}
                      currency={currency}
                      items={items}
                      ratingEnabled={ratingEnabled}
                    />
                    )
                  }
                  {
                    value !== ''
                    && (
                    <SearchResultsGrid
                      url={applyUrlCorrection(url)}
                      searchString={value}
                      currency={currency}
                      items={items}
                      ratingEnabled={ratingEnabled}
                    />
                    )
                  }
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        </Ref>
      </Responsive>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: get(state.firestore.data, 'sellerStore.categories'),
  currency: get(state.firestore.data, 'sellerStore.currency'),
  ratingEnabled: get(state.firestore.data, 'sellerStore.enableRating'),
  items: get(state.firestore.ordered, 'sellerItems'),
  storeCustomization: get(state.firestore.data, 'sellerStore.storeCustomization'),
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
  categories: PropTypes.array,
  items: PropTypes.array,
  currency: PropTypes.string,
  storeCustomization: PropTypes.object,
  ratingEnabled: PropTypes.bool,
};

BrowseProducts.defaultProps = {
  items: undefined,
  categories: undefined,
  currency: undefined,
  storeCustomization: undefined,
  ratingEnabled: undefined,
};
