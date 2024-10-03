import {useMemo} from "react";
import {Card, Typography} from "antd";
import {OverviewAccessVO} from "backend/services/backend";
import {CarIcon} from "icons/car";
import {getPhoneNumberForCall} from "../utils";
import './styles.scss';

export const CarSearchResultCard = ({carResult: carResult}: { carResult: OverviewAccessVO }) => {
    const phoneNumberToCall = useMemo(() => getPhoneNumberForCall(carResult?.phoneNumber || ''),
        [carResult?.phoneNumber]);

    const isTenant = useMemo(() => {
        const isPersonTenant = (carResult?.overviewAreas || []).every(({tenant = false}) => !!tenant);
        return isPersonTenant;
    },
        [(carResult?.overviewAreas || []).length]
    );


    return (
        <Card className='car-search-result'>
            <div className='car-info'>
                <CarIcon className='car-icon'/>
                <Typography.Title level={4}>{carResult?.carNumber}</Typography.Title>
                <span className='car-description'>{carResult.carDescription}</span>
            </div>
            <div className='phone-info'>
                <div className='phone'>
                    {phoneNumberToCall.startsWith('+7') ?
                        <a href={`tel:${phoneNumberToCall}`}>{phoneNumberToCall}</a>
                        : <span>phoneNumberToCall</span>}
                </div>
                <span className={'phone-label'}>{carResult?.phoneLabel}</span>
                {isTenant && <div className='tenant'>аренда</div> }
            </div>
            <div className='owner-info'>
                {/*<UserIcon/>*/}
                <Typography.Text style={{fontWeight: 500}}>Собственник:</Typography.Text>
                <div className='owner-fio'>
                    <span className='owner-name'>{carResult?.ownerName}</span>
                    <div className='owner-flat'>{carResult?.ownerRooms}</div>
                </div>
            </div>
        </Card>
    )
}
