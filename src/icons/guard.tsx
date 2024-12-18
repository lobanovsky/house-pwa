/* eslint-disable no-tabs, max-len,react/jsx-props-no-spreading, react/jsx-first-prop-new-line, react/destructuring-assignment */
import React from 'react';
import Icon from '@ant-design/icons';

function GuardSvg() {
    return (
        <svg width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M19 11a7.5 7.5 0 0 1-3.5 5.94L10 20l-5.5-3.06A7.5 7.5 0 0 1 1 11V3c3.38 0 6.5-1.12 9-3 2.5 1.89 5.62 3 9 3v8zm-9 1.08l2.92 2.04-1.03-3.41 2.84-2.15-3.56-.08L10 5.12 8.83 8.48l-3.56.08L8.1 10.7l-1.03 3.4L10 12.09z"
            />
        </svg>
    );
}

export function GuardIcon(props: any) {
    return (
        <Icon
          component={GuardSvg}
          {...props}
          className={`guard-icon ${props.className || ''}`}
        />
    );
}
