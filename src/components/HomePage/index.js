import React from 'react';
import {
  Segment, Header, List, Grid, Icon, Button,
} from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';

import {
  browseProductsPageImgUrl, itemPageImgUrl, cartPageImgUrl, myPurshasesPageImgUrl,
} from '../../constants/defaults';

const messageList = [
  'Create a custom website using our built-in templates',
  'Sell your products online',
  'Manage Inventory',
  'Integrate your website with your Facebook Page',
];

function HomePage() {
  return (
    <Segment basic textAlign="center" style={{ paddingBottom: 0 }}>
      <Header
        as="h1"
        content="SHOPR"
        style={{
          fontSize: '3em',
          fontWeight: 'normal',
          marginBottom: 0,
          marginTop: '.1em',
        }}
      />
      <Header
        as="h2"
        content="Your one stop shop to build your E-Commerce Website"
        style={{
          fontSize: '1.5em',
          fontWeight: 'normal',
          marginTop: '0.5em',
        }}
      />
      <Segment basic padded="very" style={{ paddingBottom: 0 }}>
        <Grid doubling stackable columns="2">
          <Grid.Row>

            <Grid.Column>
              <Segment
                basic
                style={{
                  paddingTop: '0',
                  paddingLeft: '4em',
                  paddingRight: '4em',
                  paddingBottom: '0',
                  marginBottom: '0',
                }}
              >
                <Header>
                  Electronics Shop Template
                </Header>
                <Carousel
                  showStatus={false}
                  infiniteLoop
                  showIndicators={false}
                  emulateTouch
                >
                  <div>
                    <img src={browseProductsPageImgUrl} alt="" />
                    <p className="legend">Browse Products</p>
                  </div>
                  <div>
                    <img src={itemPageImgUrl} alt="" />
                    <p className="legend">Item View</p>
                  </div>
                  <div>
                    <img src={cartPageImgUrl} alt="" />
                    <p className="legend">Cart</p>
                  </div>
                  <div>
                    <img src={myPurshasesPageImgUrl} alt="" />
                    <p className="legend">Purchase History</p>
                  </div>
                </Carousel>
              </Segment>
            </Grid.Column>
            <Grid.Column textAlign="left">
              <Header
                as="h1"
                content="with SHOPR you can now"
                style={{
                  fontSize: '1.5em',
                  fontWeight: 'normal',
                }}
              />
              <List size="huge">
                {
                    messageList.map((message) => (
                      <List.Item key={message}>
                        <Icon name="check" />
                        <List.Content>
                          <List.Header>{message}</List.Header>
                        </List.Content>
                      </List.Item>
                    ))
                }
              </List>
              <Segment basic textAlign="center" style={{ paddingTop: '6em' }}>
                <Button
                  as="a"
                  href="https://ecom-cse.web.app/"
                  primary
                  size="massive"
                >
                  Get Started
                  <Icon name="right arrow" />
                </Button>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment>
  );
}

export default HomePage;
