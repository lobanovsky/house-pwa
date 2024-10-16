import React, { useMemo } from 'react';
import { Card, Typography } from 'antd';
import { OverviewResponse } from 'backend';
import { CarIcon } from 'icons/car';
import { phoneNumberRenderer } from '../../../utils/renderers';
import { getPhoneNumberForCall } from '../utils';
import { CarGateLogs } from './gate-logs';
import './styles.scss';

export function CarSearchResultCard({ carResult }: { carResult: OverviewResponse }) {
    const phoneNumbersMap = useMemo(
        () => ({
            call: getPhoneNumberForCall(carResult?.phoneNumber || ''),
            display: phoneNumberRenderer(carResult?.phoneNumber || '')
        }),
        [carResult?.phoneNumber]
);

    return (
        <Card className="car-search-result">
            <div className="car-info">
                <CarIcon className="car-icon" />
                <Typography.Title level={4}>{carResult?.carNumber}</Typography.Title>
                <span className="car-description">{carResult.carDescription}</span>
            </div>
            <div className="phone-info">
                <div className="phone">
                    {phoneNumbersMap.call.startsWith('+7')
                        ? <a href={`tel:${phoneNumbersMap.call}`}>{phoneNumbersMap.display}</a>
                        : <span>{phoneNumbersMap.display}</span>}
                </div>
                <span className="phone-label">{carResult?.phoneLabel}</span>
                {carResult.tenant && <div className="tenant">аренда</div>}
            </div>
            <div className="owner-info">
                {/* <UserIcon/> */}
                <Typography.Text style={{ fontWeight: 500 }}>Собственник:</Typography.Text>
                <div className="owner-fio">
                    <span className="owner-name">{carResult?.ownerName}</span>
                    <div className="owner-flat">{carResult?.ownerRooms}</div>
                </div>
            </div>
            {!!carResult?.phoneNumber && <CarGateLogs phoneNumber={carResult?.phoneNumber} />}
        </Card>
    );
}
