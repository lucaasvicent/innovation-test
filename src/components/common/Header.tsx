import { Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const userName = "Ana Carol Machado";
  const currentDate = new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' });

  return (
    <header className="bg-[#83BE06] shadow-md p-4 w-full flex justify-center">
      <div className="flex items-center justify-between w-7xl">
        <div className="flex items-center">
          <Image src="/logo.jpg" alt="Innovation Brindes" width={120} height={30} className="mr-4" />
        </div>

        <div className="flex items-center space-x-8">
          <div className="hidden sm:flex items-center space-x-4 text-white">
            <Phone />
            <Mail />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:space-x-3 text-white">
            <Image
              src="/perfil-header.jpg"
              alt={userName}
              width={80}
              height={80}
              className="rounded-4xl mb-2 sm:mb-0"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs">{currentDate}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
