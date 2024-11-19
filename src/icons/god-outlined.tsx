/* eslint-disable no-tabs, max-len,react/jsx-props-no-spreading, react/jsx-first-prop-new-line, react/destructuring-assignment */
import React from 'react';
import Icon from '@ant-design/icons';

const style = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: 30
};
function GodSvg() {
    return (
        <svg width="1em" height="1em" viewBox="0 0 512 391.51" fill="currentColor">
            <g>
                {/* @ts-ignore */}
                <path style={style}
                  d="M406.61,301.18h35.15a60.24,60.24,0,0,0,6.7-120.1A140.6,140.6,0,0,0,185.64,87.34,90.36,90.36,0,0,0,60.85,181.43a60.24,60.24,0,0,0,9.39,119.75h35.15"
                />
                {/* @ts-ignore */}
                <path style={style}
                  d="M105.39,301.18S172.82,220.86,256,220.86s150.61,80.32,150.61,80.32S339.18,381.51,256,381.51,105.39,301.18,105.39,301.18Z"
                />
                {/* @ts-ignore */}
                <circle style={style} cx="256" cy="301.18" r="40.16" />
            </g>
        </svg>
    );
}

export function GodIcon(props: any) {
    return (
        <Icon
          component={GodSvg}
          {...props}
          className={`god-icon ${props.className || ''}`}
        />
    );
}
