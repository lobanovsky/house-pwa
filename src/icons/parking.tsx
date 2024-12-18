/* eslint-disable max-len, react/destructuring-assignment, no-tabs */
import React from 'react';
import Icon from '@ant-design/icons';

// @ts-ignore
function ParkingSvg() {
    return (
        <svg
          fill="currentColor"
            // @ts-ignore
          width="1em"
          height="1em"
          viewBox="0 0 15 15"
        >
            <path
              d="M11.85,8.37c-0.9532,0.7086-2.1239,1.0623-3.31,1H5.79V14H3V1h5.72c1.1305-0.0605,2.244,0.2952,3.13,1&#xA;&#x9;c0.8321,0.8147,1.2543,1.9601,1.15,3.12C13.1271,6.3214,12.7045,7.5159,11.85,8.37z M9.75,3.7C9.3254,3.3892,8.8052,3.237,8.28,3.27&#xA;&#x9;H5.79v3.82h2.49c0.5315,0.0326,1.056-0.1351,1.47-0.47c0.3795-0.3947,0.5693-0.9346,0.52-1.48C10.324,4.606,10.1327,4.0763,9.75,3.7&#xA;&#x9;z"
            />
        </svg>
    );
}

export function ParkingIcon(props: any) {
    return <Icon component={ParkingSvg} {...props} />;
}
