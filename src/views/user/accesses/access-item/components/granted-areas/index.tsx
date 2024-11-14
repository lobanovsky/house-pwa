import React, { useMemo } from 'react';
import { Avatar } from 'antd';
import { QuestionOutlined } from '@ant-design/icons';
import { AreaResponse } from 'backend';
import { AreasInfo } from '../../constants';
import './styles.scss';

const compareAreas = ({ areaId: id1 }: AreaResponse, { areaId: id2 }: AreaResponse) => id2 - id1;

export function AccessAreas({
                                areas,
                                doubleAreaWidth = false
                            }: { areas: AreaResponse[], doubleAreaWidth?: boolean }) {
    const sortedAreas = useMemo(
        () => [...areas].sort(compareAreas),
        [areas.length]
    );

    return (
        <div className={`access-item-areas ${doubleAreaWidth ? 'double-width' : ''}`}>
            <Avatar.Group>
                {sortedAreas.map(
                    ({
                         areaId = 0,
                         places = []
                     }) => {
                        const isParking = areaId === 2;
                        const areaInfo = AreasInfo[String(areaId)];
                        const cmp = (
                            <Avatar
                              size="small"
                              icon={areaInfo?.icon || <QuestionOutlined />}
                              style={{ backgroundColor: areaInfo?.color || 'gray' }}
                            />
                        );
                        return (
                            !isParking ? cmp : (
                                <div className="parking-container">
                                    {cmp}
                                    <div className="places">
                                        {places.map((place) => <div className="place-number" key={place}>{place}</div>)}
                                    </div>
                                </div>
                            )
                        );
                    }
                )}
            </Avatar.Group>
        </div>
    );
}
