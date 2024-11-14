import React from 'react';
import { Tooltip } from 'antd';
import { AccessResponse } from 'backend';
import { phoneNumberRenderer } from 'utils/renderers';

import { AccessAreas, AccessItemCars } from './components';
import './styles.scss';

export function AccessItem({ access, doubleAreaWidth = false }: { access: AccessResponse, doubleAreaWidth?: boolean }) {
  const {
    phoneLabel = '',
    phoneNumber = '',
    tenant = false,
    areas: accessAreas = [],
    cars = []
  } = access;

  return (
    <div className="access-item">
      <div className="access-info">
        <AccessAreas areas={accessAreas} doubleAreaWidth={doubleAreaWidth} />
        <div className="access-user-info">
          <div className="phone-number-container">
              <div className="phone-number">
                {phoneNumberRenderer(phoneNumber)}
                {tenant && <Tooltip mouseEnterDelay={0.2} title="Арендатор"><span className="tenant-icon">А</span></Tooltip>}
              </div>
          </div>
          {!!phoneLabel && <div className={`phone-label ${phoneLabel ? 'has-label' : ''}`}>{phoneLabel || ''}</div>}
          <AccessItemCars cars={cars} />
        </div>
      </div>
    </div>
  );
}
