import { useEffect } from 'react';
import Swal from 'sweetalert2';

const SweetAlert = () => {
  useEffect(() => {
    Swal.fire({
      title: 'Thank You!',
      text: 'Your response is successfully submitted.',
      icon: 'success',
      confirmButtonColor: '#4B5563',
    });
  }, []);

  return null;
};

export default SweetAlert;