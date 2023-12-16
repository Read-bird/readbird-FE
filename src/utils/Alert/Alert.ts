import { TSwal, TSwalTemplate } from '@utils/Alert/typed';
import 'sweetalert2';
import Swal from 'sweetalert2';

const template = ({ action, failed, ...args }: TSwalTemplate) => {
  Swal.fire({ ...args })
    .then(action)
    .catch(failed);
};

const confirm: TSwal = (args) => {
  template({
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    reverseButtons: true,
    ...args
  });
};

const success: TSwal = (args) => {
  template({ icon: 'success', ...args });
};

const error: TSwal = (args) => {
  template({ icon: 'error', ...args });
};

const warning: TSwal = (args) => {
  template({ icon: 'warning', ...args });
};

const basic: TSwal = (args) => {
  template({ ...args });
};

const input: TSwal = (args) => {
  template({
    input: 'number',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: '확인',
    cancelButtonText: '취소',
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading(),
    ...args
  });
};

export const Alert = { success, error, warning, confirm, basic, input };
