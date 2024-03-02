import { useNavigate, useRouteError } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();

  const error = useRouteError();
  console.error(error);

  let title, description;

  if (
    !error ||
    (typeof error === 'object' && error !== null && 'status' in error && error.status === 404)
  ) {
    title = '404. We can’t find this page';
    description = 'Don’t worry, it’s almost certainly our fault';
  } else {
    title = 'Oops, something went wrong';
    description = 'We’re already working on fixing the issue';
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <h1>{title}</h1>
      <p className='mt-2'>{description}</p>

      <button className='mt-10' onClick={() => navigate('/')}>
        Home page
      </button>
    </div>
  );
}

export default NotFoundPage;
