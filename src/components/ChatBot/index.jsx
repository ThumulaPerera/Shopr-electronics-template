import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class ChatBot extends PureComponent {
  componentDidMount() {
    const { storeId } = this.props;
    if (typeof WebChat !== 'undefined') {
      window.WebChat.default.init({
        selector: '#webchat',
        initPayload: `/get_started{"store": "${storeId}"}`,
        customData: { language: 'en' },
        socketUrl: 'https://rasa.shopr.cf',
        socketPath: '/socket.io/',
        title: 'Title',
        subtitle: 'Subtitle',
      });
    }
  }

  render() {
    return (
      <div id="webchat" />
    );
  }
}

ChatBot.propTypes = {
  storeId: PropTypes.string,
};

ChatBot.defaultProps = {
  storeId: undefined,
};
