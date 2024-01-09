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
  template({ icon: 'success', ...args, confirmButtonText: '확인' });
};

const error: TSwal = (args) => {
  template({ icon: 'error', ...args, confirmButtonText: '확인' });
};

const warning: TSwal = (args) => {
  template({ icon: 'warning', ...args, confirmButtonText: '확인' });
};

const basic: TSwal = (args) => {
  template({ ...args, confirmButtonText: '확인' });
};

const input: TSwal = (args) => {
  template({
    input: 'number',
    inputAttributes: {
      autocapitalize: 'off'
    },
    cancelButtonText: '취소',
    confirmButtonText: '확인',
    showCancelButton: true,
    showLoaderOnConfirm: true,
    reverseButtons: true,
    allowOutsideClick: () => !Swal.isLoading(),
    ...args
  });
};

export const Alert = { success, error, warning, confirm, basic, input };
