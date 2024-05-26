import { useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <>
      <div>NotFound</div>
      <div>{location.pathname}</div>
      <div className='h[3000px]'></div>
    </>
  );
}

export default NotFound;
