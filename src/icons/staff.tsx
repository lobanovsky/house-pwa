/* eslint-disable no-tabs, max-len,react/jsx-props-no-spreading, react/jsx-first-prop-new-line, react/destructuring-assignment */
import React from 'react';
import Icon from '@ant-design/icons';

function StaffSvg() {
    return (
        <svg width="1em" height="1em" viewBox="0 0 32 32" fill="currentColor">
            <path
              d="M18.57,15.32A7.18,7.18,0,0,0,22,9,6,6,0,0,0,10,9a7.18,7.18,0,0,0,3.43,6.32A11,11,0,0,0,5,26v3H7V26a9,9,0,0,1,7-8.78,1.14,1.14,0,0,0,.25.49l.67.66L14,25.9a1,1,0,0,0,.29.81l1,1a1,1,0,0,0,1.42,0l1-1A1,1,0,0,0,18,25.9l-1-7.53.67-.66a1.14,1.14,0,0,0,.25-.49A9,9,0,0,1,25,26v3h2V26A11,11,0,0,0,18.57,15.32ZM12,9a4,4,0,0,1,8,0c0,2.76-1.79,5-4,5S12,11.76,12,9Z"
            />
        </svg>
    );
}

export function StaffIcon(props: any) {
    return (
        <Icon
          component={StaffSvg}
          {...props}
          className={`staff-icon ${props.className || ''}`}
        />
    );
}
