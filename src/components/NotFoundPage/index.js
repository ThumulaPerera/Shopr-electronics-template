import React from 'react';
import {
  Segment, Image, Header, Divider,
} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

import { oopsImgUrl } from '../../constants/defaults';

function NotFoundPage() {
  return (
    <Segment basic textAlign="center" padded="very">
      <Image src={oopsImgUrl} centered />
      <Header size="huge">
        404
        <Header.Subheader>
          Page not found
        </Header.Subheader>
      </Header>
      <Divider hidden />
      The page you are looking for does not exist
      <br />
      <NavLink to="/">
        Go to home page
      </NavLink>
    </Segment>
  );
}

export default NotFoundPage;
