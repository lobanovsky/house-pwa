import Icon from '@ant-design/icons';
import {Property} from 'csstype';

const blackStroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as Property.StrokeLinecap,
    strokeLinejoin: 'round' as Property.StrokeLinejoin,
    strokeMiterlimit: 10
}


// .st0{fill:#1E232D;}
// </style>

// @ts-ignore
const UserSvg = () =>
    <svg viewBox="0 0 32 32" width='1em' height='1em'><title/>
        <g id="about">
            <path d="M16,16A7,7,0,1,0,9,9,7,7,0,0,0,16,16ZM16,4a5,5,0,1,1-5,5A5,5,0,0,1,16,4Z"/>
            <path
                d="M17,18H15A11,11,0,0,0,4,29a1,1,0,0,0,1,1H27a1,1,0,0,0,1-1A11,11,0,0,0,17,18ZM6.06,28A9,9,0,0,1,15,20h2a9,9,0,0,1,8.94,8Z"/>
        </g>
    </svg>

export const UserIcon = (props: any) => <Icon component={UserSvg} {...props}
                                              className={`user-icon ${props.className || ''}`}/>;


