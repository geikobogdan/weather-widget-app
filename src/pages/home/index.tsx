import { Avatar, Flex, Input, Spin, Tooltip, Typography } from 'antd';
import { FormEvent, useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { mockFetch, WeatherResponse } from 'services/mockFetch';
import Item from './components/item';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from 'auth/authProvider';

const { Title } = Typography;

const { Search } = Input;

function Home() {
  const { userEmail } = useAuth();

  const [capitalValue, setCapitalValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [isWarn, setIsWarn] = useState(false);

  const debouncedCapitalValue = useDebounce<string>(capitalValue, 300);

  useEffect(() => {
    let cancel = false; // Flag to determine if the fetch should be ignored @Bogdan

    if (debouncedCapitalValue) {
      setIsLoading(true);

      mockFetch(debouncedCapitalValue)
        .then((response) => {
          if (!cancel) {
            setIsWarn(false);
            setData(response);
          }
        })
        .catch(() => {
          if (!cancel) {
            setIsWarn(true);
            setData(null);
          }
        })
        .finally(() => {
          if (!cancel) {
            setIsLoading(false);
          }
        });
    } else {
      setIsWarn(false);
    }
    return () => {
      cancel = true;
    };
  }, [debouncedCapitalValue]);

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setCapitalValue(e.currentTarget.value);
    setIsWarn(false);
  };

  return (
    <Flex align='center' className='min-h-[100vh] p-5' flex={1} vertical>
      <Flex align='center' className='self-end mb-20'>
        <Title type='success' className='!mr-2 !m-0' level={4}>
          {userEmail}
        </Title>
        <Avatar className='bg-green' icon={<UserOutlined />} />
      </Flex>

      <Tooltip title='Please enter the correct EU capital' placement='bottom' open={isWarn}>
        <Search
          value={capitalValue}
          onChange={handleChange}
          onBlur={() => setIsWarn(false)}
          status={isWarn ? 'warning' : ''}
          placeholder='Enter your City'
          className='md:max-w-[50vw] w-[90vw]'
          allowClear
          size='large'
        />
      </Tooltip>

      {isLoading ? (
        <Spin size='large' className='h-[80vh] flex items-center' />
      ) : (
        <Item data={data} />
      )}
    </Flex>
  );
}

export default Home;
