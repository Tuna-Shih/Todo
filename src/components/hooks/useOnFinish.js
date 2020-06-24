import cookies from 'js-cookie';

export default inputData => {
  const getData = cookies.get('userData');
  const oldData = getData ? JSON.parse(getData) : [];

  const dataList = [inputData, ...oldData];
  cookies.set('userData', JSON.stringify(dataList));
};
