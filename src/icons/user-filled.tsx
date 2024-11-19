/* eslint-disable no-tabs, max-len,react/jsx-props-no-spreading, react/jsx-first-prop-new-line */
import React from 'react';
import Icon from '@ant-design/icons';

function UserFilledSvg() {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" enableBackground="new 0 0 24 24" fill="currentColor">
            <g id="user">
                <ellipse cx="12" cy="8" rx="5" ry="6" />
                <path
                  d="M21.8,19.1c-0.9-1.8-2.6-3.3-4.8-4.2c-0.6-0.2-1.3-0.2-1.8,0.1c-1,0.6-2,0.9-3.2,0.9s-2.2-0.3-3.2-0.9    C8.3,14.8,7.6,14.7,7,15c-2.2,0.9-3.9,2.4-4.8,4.2C1.5,20.5,2.6,22,4.1,22h15.8C21.4,22,22.5,20.5,21.8,19.1z"
                />
            </g>
        </svg>
    );
}

export function UserFilledIcon(props: any) {
    return (
        <Icon
          component={UserFilledSvg}
          {...props}
            /* eslint-disable-next-line react/destructuring-assignment */
          className={`user-filled-icon ${props.className || ''}`}
        />
    );
}
