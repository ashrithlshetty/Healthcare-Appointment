export const showBackButton = [
  '/appointments',
  '/notes',
  '/settings',
  '/',
  '/user/dashboard',
];
export const hideSearchBar = [
  (pathname: string) => pathname.startsWith('/chatpage'),
  (pathname: string) => pathname.startsWith('/createAppointment'),
  (pathname: string) => pathname.startsWith('/editcontact'),
  (pathname: string) => pathname.startsWith('/editAppointment'),
  '/payment',
  '/appointmentinfo',
  '/slots',
  '/settings',
  '/newContacts',
  '/qrscanner',
  '/companyinfo',
  '/user/dashboard'
];

export const hideQrButton = [
  (pathname: string) => pathname.startsWith('/createAppointment'),
  (pathname: string) => pathname.startsWith('/editAppointment'),
  '/contacts',
  '/payment',
  '/appointmentinfo',
  '/slots',
  '/newContacts',
  '/editcontact',
  '/qrscanner',
  '/companyinfo',
  '/user/dashboard',
];

export function formatTime(time: string) {
  const dateObject = new Date(time);
  const currentDate = new Date();
console.log(dateObject);

  // Resetting hours, minutes, seconds, and milliseconds for accurate comparison
  currentDate.setHours(0, 0, 0, 0);

  const addLeadingZero = (number: number) =>
    number < 10 ? `0${number}` : number;

  // If the date is from a previous day
  if (dateObject < currentDate) {
    return dateObject
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ /g, ' '); // Format: "12 May 2024"
  } else {
    // If the date is today, return the time
    const hours = dateObject.getHours();
    const minutes = addLeadingZero(dateObject.getMinutes());
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTimeString = `${addLeadingZero(formattedHours)}:${minutes} ${ampm}`;
    return formattedTimeString;
  }
}
export const ITEMS_PER_PAGE = 10;