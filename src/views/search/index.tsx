import {ChangeEvent, useCallback, useEffect, useState} from "react";
import {Button, Input, Result, Skeleton, Typography} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import debounce from "lodash/debounce";
import {AccessService, OverviewResponse} from "backend/services/backend";
import {useLoading} from "hooks/use-loading";
import {CarSearchResultCard} from "./result-card";
import './styles.scss';


export const CarSearch = () => {
    const [loading, showLoading, hideLoading] = useLoading();
    const [searchCarNun, setSearchCarNum] = useState("");
    const [foundOwner, setOwner] = useState<OverviewResponse | null>(null);
    const [searchWasPerformed, setSearchWasPerformed, clearSearchPerformed] = useLoading();

    const searchData = useCallback((carNum: string = "") => {
        if (carNum.length < 3) {
            return;
        }

        const searchStr = carNum.replace(/\s/g, '');
        showLoading();
        AccessService.overview({
            plateNumber: searchStr,
            active: true
        })
            .then((response: OverviewResponse) => {
                setSearchWasPerformed();
                hideLoading();
               setOwner(response);

            })
            .catch(() => {
                setSearchWasPerformed();
                hideLoading();
                setOwner(null);
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
        <div className='cars-search view centered-content'>
            <div className='content'>
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
                    /> : <CarSearchResultCard carResult={foundOwner}/>
                    }
                </div>}
            </div>

        </div>
    )
};
