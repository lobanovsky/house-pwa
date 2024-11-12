import React from 'react';
import { EnumRoomVOType } from 'backend';
import { ParkingFilledIcon } from 'icons/parking_filled';
import { TreeFilledIcon } from 'icons/tree-filled';

export const RoomTypeNames: Record<EnumRoomVOType, string> = {
    [EnumRoomVOType.GARAGE]: 'М/м ',
    [EnumRoomVOType.FLAT]: 'Кв. ',
    [EnumRoomVOType.OFFICE]: 'Оф. '
};

export const AreasInfo: Record<string, {
    title: string;
    icon?: React.ReactNode;
}> = {
    2: {
        title: 'Подземный паркинг',
        icon: <ParkingFilledIcon />
    },
    1: {
        title: 'Дворовая территория',
        icon: <TreeFilledIcon />
    }
};
