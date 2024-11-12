import React from 'react';
import { EnumRoomVOType, RoomVO } from 'backend';
import './styles.scss';
import { HouseIcon } from '../../../../icons/house';
import { CarIcon } from '../../../../icons/car';

export function PropertyItem({ property }: { property: RoomVO }) {
    return (
        <div className={`property-item ${property.type}`}>
            <div className="icon">
                <div className="icon-container">
                    {property.type === EnumRoomVOType.FLAT && <HouseIcon />}
                    {property.type === EnumRoomVOType.FLAT && <CarIcon />}
                </div>
            </div>
            <div className="property-name">
                {property.typeDescription}
                {' '}
                <span className="prop-number">{property.number}</span>
            </div>
            <div className="address">{property.street}</div>
            <div className="square">
{property.square}
&nbsp;м&sup2;
            </div>
        </div>
    );
}