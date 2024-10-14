import {Divider, List, Typography} from "antd";
import {HomeOutlined} from "@ant-design/icons";
import useRemoteData from "../../hooks/use-remote-data";
import {ParkingIcon} from "../../icons/parking";
import {Building, BuildingService, EnumBuildingType} from "../../backend";

const Buildings = () => {
    const [buildings = [], isLoadingBuildings] = useRemoteData<Building[]>({loader: BuildingService.findAll1})

    return (
        <div className='building-list view'>
            <Typography.Title level={5}>Здания</Typography.Title>
            <List
                bordered={false}
				pagination={false}
                loading={isLoadingBuildings}
                dataSource={buildings || []}
                renderItem={(building) =>
                    <div className='building' style={{padding: '0.5em 1em'}}>
                        {building.type === EnumBuildingType.APARTMENT_BUILDING && <HomeOutlined/>}
                        {building.type === EnumBuildingType.UNDERGROUND_PARKING && <ParkingIcon/>}
                        {building.name}
                        <Divider style={{margin: '4px 0'}}/>
                    </div>
                }/>
        </div>
    )
}

export default Buildings;
