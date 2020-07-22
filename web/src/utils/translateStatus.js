export default status => {
  if (status === 'PENDING') {
    return 'PENDENTE';
  }

  if (status === 'WITHDRAWN') {
    return 'RETIRADO';
  }

  if (status === 'DELIVERED') {
    return 'ENTREGUE';
  }

  if (status === 'CANCELED') {
    return 'CANCELADO';
  }

  return null;
};
