import React, { useCallback } from 'react';
import { Statistic } from 'antd';
import dayjs from 'dayjs';

import Loading from 'components/loading';
import useRemoteData from 'hooks/use-remote-data';
import { GateService, LogEntryOverview, LogEntryResponse } from 'backend';
import './styles.scss';

const today = dayjs();
const isOutdatedEntry = (dateTime: string = '') => {
    const monthDif = dateTime ? today.diff(dateTime, 'month') : 0;
    return dateTime && monthDif > 3;
};

const formatNumber = (v: number | string) => {
    const numberValue = parseInt(String(v), 10);
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(numberValue) ? new Intl.NumberFormat('ru-RU').format(numberValue) : '';
};

const renderDateValue = ({
                             dateTime = '',
                             gateName = ''
                         }: LogEntryResponse = {
    dateTime: '',
    id: '',
    buildingId: 0,
    gateId: 0
}, checkForOutdated = false) => (
    <span className={`date ${!dateTime ? 'empty' : ''} ${checkForOutdated && isOutdatedEntry(dateTime) ? 'outdated' : ''}`}>
  {dateTime ? dayjs(dateTime)
      .format('lll') : ' - '}
        {!!(dateTime && gateName) && ` (${gateName})`}
    </span>
);

export function CarGateLogs({ phoneNumber }: { phoneNumber: string }) {
    const logsLoader = useCallback(() => GateService.getLastByPhoneNumber({ phoneNumber }), [phoneNumber]);
    const [log, isLoading] = useRemoteData<LogEntryOverview>({ loader: logsLoader });

    return (
        <div className="car-logs">
            {isLoading && <Loading />}
            {!isLoading && (
                <>
                    <div className="field last-entries">
                        <div className="label">Заезды:</div>
                        {(log?.lastLogEntries || []).map((entry, index) => (
                            <div key={entry.id} className={`entry ${index === 0 ? 'last-entry' : ''}`}>
                                {renderDateValue(entry)}
                            </div>
                        ))}
                    </div>
                    <div className="field first-entry">
                        <span className="label">
Первый заезд:
<br />
                        </span>
                        {renderDateValue(log?.firstLogEntry)}
                    </div>
                    <div className="field total">
                        <span className="label">Всего заездов:</span>
                        <Statistic value={log?.totalSize || 0} formatter={(v) => formatNumber(v)} />
                    </div>
                </>
            )}
        </div>
    );
}
