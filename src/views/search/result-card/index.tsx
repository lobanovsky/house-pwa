import {useMemo} from "react";
import {Card, Typography} from "antd";
import {InfoByPlateNumber} from "backend/services/backend";
import {CarIcon} from "icons/car";
import {getPhoneNumberForCall} from "../utils";
import './styles.scss';

export const CarSearchResultCard = ({carResult: carResult}: { carResult: InfoByPlateNumber }) => {
    const phoneNumberToCall = useMemo(() => getPhoneNumberForCall(carResult?.phoneNumber || ''),
        [carResult?.phoneNumber]);


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
                {carResult?.tenant && <div className='tenant'>аренда</div> }
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
