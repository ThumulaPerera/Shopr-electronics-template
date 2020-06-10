import React from 'react';
import {
  Segment, Container, Grid, List, Header, Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';

function Footer({ sellerStore }) {
  const {
    storeCustomization, storeName, fbPageId, telephoneNo, address, email, aboutUs,
  } = sellerStore;
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
              <Header inverted={inverted} as="h4" content={storeName} />
              <List inverted={inverted}>
                {address && (
                <List.Item>
                  <List.Icon name="marker" />
                  <List.Content>{address}</List.Content>
                </List.Item>
                )}

                {telephoneNo && (
                <List.Item>
                  <List.Icon name="phone" />
                  <List.Content>{telephoneNo}</List.Content>
                </List.Item>
                )}
                {email
                && (
                <List.Item>
                  <List.Icon name="mail" />
                  <List.Content>{email}</List.Content>
                </List.Item>
                )}
                {fbPageId
                && (
                <List.Item as="a" href={`https://www.facebook.com/${fbPageId}`}>
                  <List.Icon name="facebook f" />
                  <List.Content>visit us on facebook</List.Content>
                </List.Item>
                )}
              </List>
            </Grid.Column>
            <Grid.Column width={5}>
              <Header inverted={inverted} as="h4" content="About Us" />
              <List inverted={inverted}>
                {aboutUs
                && (
                <List.Item>
                  <List.Content>{aboutUs}</List.Content>
                </List.Item>
                )}
              </List>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as="h4" inverted={inverted}>
                Powered by
              </Header>
              <Image size="small" src={`${process.env.PUBLIC_URL}/assets/tusk_logo.png`} />
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
