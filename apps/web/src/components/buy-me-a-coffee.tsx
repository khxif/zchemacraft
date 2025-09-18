import { SiBuymeacoffee } from 'react-icons/si';

export function BuyMeACoffee() {
  return (
    <a href="https://www.buymeacoffee.com/Khaif" target="_blank" rel="noopener noreferrer">
      <button className="rounded-full p-4 fixed bottom-4 right-4 bg-[#ffdd00]">
        <SiBuymeacoffee className="size-5 text-black" />
      </button>
    </a>
  );
}
