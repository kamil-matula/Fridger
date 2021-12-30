import React from 'react';

import PropTypes from 'prop-types';

import { BottomSheet, SheetRow } from 'components';
import { displayToast } from 'utils';
import { check } from 'assets/icons';

const Permissions = ({ reference, selectedOwnership, updatePermission }) => {
  const listOfPermissions = [
    { short: 'READ', long: 'Can read' },
    { short: 'WRITE', long: 'Can edit' },
    { short: 'ADMIN', long: 'Administrator' },
  ];

  // Actions:
  const changePermission = (newPermission) => {
    updatePermission({
      modelId: selectedOwnership.id,
      permissionName: newPermission,
    })
      .unwrap()
      .catch((error) =>
        displayToast(
          error.data?.non_field_errors || 'Unable to update permission'
        )
      );

    // Hide Bottom Sheet:
    reference.current.close();
  };

  return (
    <BottomSheet reference={reference} title='Change permission'>
      {listOfPermissions.map((element) => (
        <SheetRow
          key={element.long}
          icon={selectedOwnership?.permission === element.short ? check : null}
          text={element.long}
          onPress={() => changePermission(element.short)}
        />
      ))}
    </BottomSheet>
  );
};

Permissions.propTypes = {
  reference: PropTypes.object,
  selectedOwnership: PropTypes.object,
  updatePermission: PropTypes.func.isRequired,
};

export default Permissions;
