import React from 'react';
import { Button } from 'semantic-ui-react';
import { toastr } from 'react-redux-toastr';
import PropTypes from 'prop-types';

function ReceivedBtn({ firestore, storeId, orderId }) {
  const markAsReceived = () => firestore
    .collection('Stores')
    .doc(storeId)
    .collection('Orders')
    .doc(orderId)
    .get()
    .then((dataSnapshot) => {
      const orderState = dataSnapshot.get('orderState');
      return orderState || [];
    })
    .then((orderState) => {
      const date = firestore.Timestamp.now();
      orderState.push({
        date,
        stateId: 2,
      });
      return firestore
        .collection('Stores')
        .doc(storeId)
        .collection('Orders')
        .doc(orderId)
        .update({ orderState });
    })
    .then(() => {
      toastr.success('Item successfully marked as received');
    })
    .catch((error) => {
      toastr.error('Could not mark as received', error.message);
    });

  return (
    <Button
      onClick={markAsReceived}
      positive
      floated="right"
    >
      Mark As Received
    </Button>
  );
}

export default ReceivedBtn;

ReceivedBtn.propTypes = {
  firestore: PropTypes.object.isRequired,
  storeId: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
};
