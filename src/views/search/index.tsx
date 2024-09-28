import {useLoading} from "../../hooks/use-loading";
import {ChangeEvent, useCallback, useEffect, useState, useMemo} from "react";
import {AccessService, InfoByPlateNumber, OwnerVO} from "../../backend/services/backend";
import debounce from "lodash/debounce";
import {Button, Input, Result, Skeleton, Typography} from "antd";
import {SearchOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";
import './styles.scss';
import {UserIcon} from "../../icons/user";
import {CarIcon} from "../../icons/car";

export const CarSearch = () => {
    const [loading, showLoading, hideLoading] = useLoading();
    const [searchCarNun, setSearchCarNum] = useState("");
    const [foundOwner, setOwner] = useState<InfoByPlateNumber | null>(null);
    const [searchWasPerformed, setSearchWasPerformed, clearSearchPerformed] = useLoading();


    const phoneNumberToCall = useMemo(() => {
        let result = foundOwner?.phoneNumber || '';
        if (result.startsWith('7')) {
            result = `+${result}`
        } else if (result.startsWith('8')) {
            result = result.substring(1, 20);
            result = `+7${result}`
        } else if (result.startsWith('9')) {
            result = `+7${result}`
        }

        return result;
    }, [foundOwner?.phoneNumber]);
    const searchData = useCallback((carNum: string = "") => {
        if (carNum.length < 3) {
            return;
        }

        const searchStr = carNum.replace(/\s/g, '');
        showLoading();
        AccessService.getInfoByCarNumber({
            carNumber: searchStr,
            active: true
        })
            .then((response: InfoByPlateNumber) => {
                setSearchWasPerformed();
                hideLoading();
                setOwner(response);
            })
            .catch(e => {
                setSearchWasPerformed();
                hideLoading();
                setOwner(null);
                // showError("Не удалось найти владельца ТС", e);
            });
    }, []);

    const delayedSearch = useCallback(
        debounce((carNum: string) => searchData(carNum), 600),
        []
    );

    const onChangeCarNum = useCallback(({target: {value}}: ChangeEvent<HTMLInputElement>) => {
        setSearchCarNum(value);
    }, []);

    const onSearchClick = useCallback(() => {
        searchData(searchCarNun);
    }, [searchCarNun]);

    useEffect(() => {
        if (!searchCarNun) {
            setOwner(null);
            clearSearchPerformed();
        } else if (searchCarNun.length > 2) {
            delayedSearch(searchCarNun);
        }

    }, [searchCarNun]);


    return (
        <div className='cars-search view'>
            <Typography.Title level={4}>Поиск авто</Typography.Title>
            <div className='search-form'>
                <Input
                    size='large'
                    allowClear
                    className="car-number"
                    prefix={<SearchOutlined/>}
                    placeholder="Номер машины" value={searchCarNun}
                    onChange={onChangeCarNum}
                />
                <Button
                    size='large'
                    type='primary'
                    disabled={searchCarNun.length < 3}
                    onClick={onSearchClick}>Найти</Button>
            </div>
            {loading && <Skeleton active/>}
            {!loading && searchWasPerformed && <div className='search-result'>
                {!(foundOwner?.ownerName || foundOwner?.phoneNumber) ? <Result
                        status="404"
                        title={`Неопознанное авто "${searchCarNun}"`}
                        subTitle={`Не удалось найти владельца ТС с гос. номером "${searchCarNun}"`}
                    /> :
                    <div className='owner-info'>
                        <div className='car-info'>
                            <CarIcon className='car-icon' />
                            <Typography.Title level={4}>{foundOwner?.carNumber}</Typography.Title>
                            <span className='car-description'>{foundOwner.carDescription}</span>
                        </div>


                        <div className='owner'>
                            <UserIcon/>
                            <span className='owner-name'>{foundOwner?.ownerName}</span>
                            <div className='owner-flat'>({foundOwner?.ownerRooms})</div>
                        </div>
                        <div className='phone-info'>
                            {/*<PhoneOutlined/>*/}
                            {phoneNumberToCall.startsWith('+7') ? <a className="phone"
                                                                     href={`tel:${phoneNumberToCall}`}>{phoneNumberToCall}</a> : phoneNumberToCall}

                            {/*<span className={'phone-number'}>{foundOwner?.phoneNumber}</span>*/}
                            <span className={'phone-label'}>{foundOwner?.phoneLabel}</span>
                        </div>
                    </div>}
            </div>}
        </div>
    )
};
