/* eslint-disable no-plusplus */

export default function getInitials(name) {
  const parts = name.split(' ');
  let initials = '';
  for (let i = 0; i < parts.length; i++) {
    if (parts[i].length > 0 && parts[i] !== '') {
      initials += parts[i][0];
    }
  }
  return initials.substring(0, 2);
}
