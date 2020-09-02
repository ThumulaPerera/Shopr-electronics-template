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
        socketUrl: 'https://shopr.ml',
        socketPath: '/socket.io/',
        title: 'AI Assistant',
        // subtitle: 'Subtitle',
        storage: 'session',
        inputTextFieldHint: 'Type a message...',
      });
      window.WebChat.send(`/set_id{"store": "${storeId}"}`);
    }
  }

  render() {
    return (
      <div id="webchat" />
    );
  }
}

ChatBot.propTypes = {
  storeId: PropTypes.string.isRequired,
};
