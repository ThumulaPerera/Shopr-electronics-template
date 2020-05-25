import React from 'react';
import {
  Segment, Container, Grid, List, Header, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function Footer({ sellerStore }) {
  const { storeCustomization, storeName } = sellerStore;
  const { color } = storeCustomization;

  const doNotInvertOn = ['yellow', 'olive'];
  const inverted = !(doNotInvertOn.includes(color));

  return (
    <Segment
      inverted
      color={color}
      secondary
      vertical
      style={{ padding: '2em 0em' }}
    >
      <Container>
        <Grid divided inverted={inverted} stackable>
          <Grid.Row>
            <Grid.Column width={5}>
              <Header inverted={inverted} as="h4" content="About" />
              <List link inverted={inverted}>
                <List.Item as="a">Sitemap</List.Item>
                <List.Item as="a">Contact Us</List.Item>
                <List.Item as="a">Religious Ceremonies</List.Item>
                <List.Item as="a">Gazebo Plans</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header inverted={inverted} as="h4" content={storeName} />
              <List link inverted={inverted}>
                <List.Item as="a">Banana Pre-Order</List.Item>
                <List.Item as="a">DNA FAQ</List.Item>
                <List.Item as="a">How To Access</List.Item>
                <List.Item as="a">Favorite X-Men</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4" inverted={inverted}>
                Powered by
              </Header>
              <Image size="medium" src={`${process.env.PUBLIC_URL}/assets/tusk_logo.png`} />
              {
                inverted
                  ? (
                    <p>
                      © 2020-2021 TUSK TM. All rights reserved.
                    </p>
                  )
                  : (
                    <p style={{ color: 'black' }}>
                      © 2020-2021 TUSK TM. All rights reserved.
                    </p>
                  )
              }

            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
}

export default Footer;

Footer.propTypes = {
  sellerStore: PropTypes.object.isRequired,
};
