import {useCallback, useEffect, useState} from "react";
import {useLoading} from "./use-loading";
// import { showError } from "../utils/notifications";
// import { ServerError } from "../utils/types";
import {IRequestOptions} from "../backend";

function useRemoteData<T, OutputT = T>({loader, errorMsg = "Не удалось загрузить данные", dataConverter}: {
    loader: (options?: IRequestOptions) => Promise<T>,
    errorMsg?: string,
    dataConverter?: (data: T) => OutputT
}): [OutputT | null, boolean, () => void] {
    const [loading, showLoading, hideLoading] = useLoading();
    const [data, setData] = useState<OutputT | null>(null);

    const loadData = useCallback(() => {
        showLoading();
        // @ts-ignore
        loader()
            .then((responseData: T) => {
                hideLoading();
                const result = dataConverter ? dataConverter(responseData) : responseData;
                setData(result as OutputT);
            })
            .catch((e: any) => {
                // showError(errorMsg, e);
                hideLoading();
            });
    }, []);

    useEffect(loadData, []);

    return [data, loading, loadData];
}

export default useRemoteData;
