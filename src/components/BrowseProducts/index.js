import React, { Component, createRef } from 'react';
import {
  Grid, Search, Label, Segment, Sticky, Ref, Responsive,
} from 'semantic-ui-react';
import { useRouteMatch } from 'react-router-dom';
import _, { get } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';
// import { StickyContainer, Sticky } from 'react-sticky';

import ItemGrid from './ItemGrid';
import CategoryMenu from './CategoryMenu';
import CategoryDropdown from './CategoryDropdown';

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

  handleCategoryDropdownSelection = (e, { value }) => this.setState({
    selectedCategory: value,
    value: '',
  })

  handleOnResponsiveUpdate = (e, { width }) => this.setState({ width })


  render() {
    const {
      contextRef, categories, match,
    } = this.props;
    const {
      isLoading, value, results, selectedCategory, width,
    } = this.state;
    const { url } = match;
    const contextRef1 = createRef();
    const stickSearchBar = width > Responsive.onlyMobile.maxWidth;

    if (!isLoaded(categories)) {
      return <div>Loading...</div>;
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
                color="grey"
                inverted
                tertiary
                style={{ padding: '.5em', borderRadius: '0px' }}
              >
                <Grid relaxed="very" padded="horizontally" stackable>
                  <Grid.Row columns={3}>
                    <Grid.Column />
                    <Grid.Column>
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
                    <Grid.Column>
                      <CategoryDropdown
                        handleCategoryClick={this.handleCategoryDropdownSelection}
                        selectedCategory={selectedCategory}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Segment>
            </Sticky>
            <Grid>
              <Grid.Row columns={2} only="computer">
                <Grid.Column computer={4} tablet={6}>
                  <CategoryMenu
                    contextRef={contextRef}
                    handleCategoryClick={this.handleCategoryClick}
                    selectedCategory={selectedCategory}
                  />
                </Grid.Column>
                <Grid.Column computer={12} tablet={10}>
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
              <Grid.Row only="tablet mobile">
                <Grid.Column>
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
        </Ref>
      </Responsive>

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
