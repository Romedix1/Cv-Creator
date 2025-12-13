export default function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"fill="none">
      <circle cx="12" cy="13" r="11" fill="#FFFFFF" />
      <path fill="#1877F2" d="M24 12.073C24 5.447 18.627 0.073 12 0.073C5.373 0.073 0 5.447 0 12.073C0 18.062 4.388 23.027 10.125 23.927V15.542H7.078V12.073H10.125V9.429C10.125 6.422 11.917 4.76 14.658 4.76C15.97 4.76 17.344 4.995 17.344 4.995V7.948H15.83C14.34 7.948 13.875 8.873 13.875 9.822V12.073H17.203L16.671 15.542H13.875V23.927C19.612 23.027 24 18.062 24 12.073Z" />
    </svg>
  );
}