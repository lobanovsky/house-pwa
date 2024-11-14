/* eslint-disable max-len,react/jsx-props-no-spreading, no-tabs */
import React from 'react';
import Icon from '@ant-design/icons';

function HouseSmallSvg() {
    return (
        <svg viewBox="0 0 306.773 306.773" width="1em" height="1em" fill="currentColor">
            <g>
                <path
                  fill="currentColor"
                  d="M302.93,149.794c5.561-6.116,5.024-15.49-1.199-20.932L164.63,8.898
		c-6.223-5.442-16.2-5.328-22.292,0.257L4.771,135.258c-6.092,5.585-6.391,14.947-0.662,20.902l3.449,3.592
		c5.722,5.955,14.971,6.665,20.645,1.581l10.281-9.207v134.792c0,8.27,6.701,14.965,14.965,14.965h53.624
		c8.264,0,14.965-6.695,14.965-14.965v-94.3h68.398v94.3c-0.119,8.264,5.794,14.959,14.058,14.959h56.828
		c8.264,0,14.965-6.695,14.965-14.965V154.024c0,0,2.84,2.488,6.343,5.567c3.497,3.073,10.842,0.609,16.403-5.513L302.93,149.794z"
                />
            </g>
            {/* <path */}
            {/*   className="clr-i-solid clr-i-solid-path-1" */}
            {/*   d="M33,19a1,1,0,0,1-.71-.29L18,4.41,3.71,18.71a1,1,0,0,1-1.41-1.41l15-15a1,1,0,0,1,1.41,0l15,15A1,1,0,0,1,33,19Z" */}
            {/* /> */}
            {/* <path className="clr-i-solid clr-i-solid-path-2" d="M18,7.79,6,19.83V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76Z" /> */}
            {/* <rect x="0" y="0" width="36" height="36" fillOpacity="0" /> */}
        </svg>
    );
}

export function HouseSmallIcon(props: any) {
    return <Icon component={HouseSmallSvg} {...props} />;
}
