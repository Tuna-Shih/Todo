import cookies from 'js-cookie';
import { useCallback } from 'react';

export default () =>
  useCallback(inputData => {
    const getData = cookies.get('userData');
    const oldData = getData ? JSON.parse(getData) : [];
    const dataList = [inputData, ...oldData];
    cookies.set('userData', JSON.stringify(dataList));
  }, []);
