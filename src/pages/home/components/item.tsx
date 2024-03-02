import { Card } from 'antd';
import { WeatherResponse } from 'services/mockFetch';
import { Typography } from 'antd';

const { Text } = Typography;

interface Props {
  data?: WeatherResponse | null;
}
function Item({ data }: Props) {
  if (!data) {
    return null;
  }
  return (
    <Card title={`Weather for ${data.date}`} className='md:w-[50vw] w-[90vw] mt-[15vh]'>
      {data.items.map((item) => (
        <Typography key={item.title} className='mb-5'>
          <Text> {item.title}: </Text>
          <Text type='secondary'>{item.value} ℃</Text>
        </Typography>
      ))}
    </Card>
  );
}

export default Item;
