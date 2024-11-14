import React from 'react';
import { EnumRoomVOType, RoomVO } from 'backend';
import { HouseIcon } from 'icons/house';
import { CarIcon } from 'icons/car';
import './styles.scss';

export function PropertyItem({ property }: { property: RoomVO }) {
    return (
        <div className={`property-item ${property.type}`}>
            <div className="property-icon">
                <div className="icon-container">
                    {property.type === EnumRoomVOType.FLAT && <HouseIcon />}
                    {property.type === EnumRoomVOType.GARAGE && <CarIcon />}
                </div>
            </div>
            <div className="property-info">
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
        </div>
    );
}
