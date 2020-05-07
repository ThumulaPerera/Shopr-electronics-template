import React, { Component } from 'react';
import { Grid, Search, Label } from 'semantic-ui-react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import _, { get } from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import PropTypes from 'prop-types';

import ItemGrid from '../ItemGrid';
import CategoryMenu from '../CategoryMenu';

import applyUrlCorrection from '../../helpers/applyUrlCorrection';

const resultRenderer = ({ name }) => <Label content={name} />;

resultRenderer.propTypes = {
  name: PropTypes.string.isRequired,
};

const initialState = { isLoading: false, results: [], value: '' };
class BrowseProducts extends Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.name })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      const { value } = this.state;
      const { items } = this.props;

      if (value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(value), 'i');
      const isMatch = (result) => re.test(result.name);

      this.setState({
        isLoading: false,
        results: _.filter(items, isMatch),
      });
    }, 300);
  }

  render() {
    const {
      contextRef, categories, match,
    } = this.props;
    const { isLoading, value, results } = this.state;
    const { path, url } = match;

    if (!isLoaded(categories)) {
      return <div>Loading...</div>;
    }

    if (isEmpty(categories)) {
      return <div>No categories to display...</div>;
    }

    return (
      <Grid columns={2} divided={false}>
        <Grid.Row>
          <Grid.Column width={3}>
            <CategoryMenu contextRef={contextRef} />
          </Grid.Column>
          <Grid.Column width={13}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              resultRenderer={resultRenderer}
              {...this.props}
            />
            <Switch>
              <Route exact path={`${path}/`}>
                {
                categories.map(({ name }) => (
                  <ItemGrid
                    selectedCategory={name}
                    key={name}
                    url={applyUrlCorrection(url)}
                    searchString={value}
                  />
                ))
              }
              </Route>
              <Route path={`${path}/:category`}>
                <ItemGrid url={applyUrlCorrection(url)} searchString={value} />
              </Route>
            </Switch>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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
