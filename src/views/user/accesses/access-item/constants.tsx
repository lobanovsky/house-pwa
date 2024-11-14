import React from 'react';
import { EnumRoomVOType } from 'backend';
import { ParkingIcon } from 'icons/parking';
import { HouseSmallIcon } from 'icons/house-small';

export const RoomTypeNames: Record<EnumRoomVOType, string> = {
    [EnumRoomVOType.GARAGE]: 'М/м ',
    [EnumRoomVOType.FLAT]: 'Кв. ',
    [EnumRoomVOType.OFFICE]: 'Оф. '
};

export const AreasInfo: Record<string, {
    title: string;
    color?:string;
    colorGrayed?: string;
    icon?: React.ReactNode;
}> = {
    2: {
        title: 'Подземный паркинг',
        color: '#5578BC',
        colorGrayed: '#738cbd',
        icon: <ParkingIcon />
    },
    1: {
        title: 'Дворовая территория',
        color: '#61a938',
        colorGrayed: '#7eab64',
        icon: <HouseSmallIcon />
    }
};
