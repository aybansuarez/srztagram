import logo from '../assets/srztagram-logo.png';

const desktopNotif = (text, head) => {
  const permission = Notification.permission;
  if (permission === 'default') {
    Notification.requestPermission();
  } else if (permission === 'denied') {
    console.log('Notification disabled')
  } else if (permission === 'granted') {
    new Notification(head, {
      body: text,
      icon: logo
    })
  }
}

export default desktopNotif;
