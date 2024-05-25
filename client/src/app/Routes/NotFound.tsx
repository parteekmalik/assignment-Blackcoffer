import { useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <>
      <div>NotFound</div>
      <div>{location.pathname}</div>
    </>
  );
}

export default NotFound;
