import { Clock, Facebook, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-background">
      {/* Orange glow effects */}
      <div className="absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500 opacity-20 blur-3xl" />
      <div className="absolute right-0 top-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-orange-500 opacity-20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Logo and description */}
          <div className="space-y-6">
            <Image
              src="/img/logo/logo.png"
              alt="Juanes Barber's Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="max-w-sm text-sm dark:text-gray-300">
              Experimenta un nuevo nivel de estilo con los servicios
              excepcionales de corte, arreglo y peinado de Juanes Barber's,
              diseñados para elevar tu apariencia.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://facebook.com"
                className="text-white transition-colors hover:text-orange-500"
                target="_blank"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://wa.me/+5021234567"
                className="text-white transition-colors hover:text-orange-500"
                target="_blank"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  height="24"
                  width="24"
                >
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 012.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 01-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24M8.53 7.33c-.16 0-.43.06-.66.31-.22.25-.87.86-.87 2.07 0 1.22.89 2.39 1 2.56.14.17 1.76 2.67 4.25 3.73.59.27 1.05.42 1.41.53.59.19 1.13.16 1.56.1.48-.07 1.46-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.07-.1-.23-.16-.48-.27-.25-.14-1.47-.74-1.69-.82-.23-.08-.37-.12-.56.12-.16.25-.64.81-.78.97-.15.17-.29.19-.53.07-.26-.13-1.06-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.12-.24-.01-.39.11-.5.11-.11.27-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.11-.56-1.35-.77-1.84-.2-.48-.4-.42-.56-.43-.14 0-.3-.01-.47-.01z" />
                </svg>
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Enlaces</h3>
            <nav className="space-y-4">
              <Link
                href="#inicio"
                className="block transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                Inicio
              </Link>
              <Link
                href="#servicios"
                className="block transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                Servicios
              </Link>
              <Link
                href="#productos"
                className="block transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                Productos
              </Link>
              <Link
                href="#galeria"
                className="block transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                Galería
              </Link>
              <Link
                href="#ubicacion"
                className="block transition-colors dark:text-gray-300 dark:hover:text-white"
              >
                Ubicación
              </Link>
            </nav>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="mb-6 text-xl font-bold">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-orange-500" />
                <span>+502 1234678</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={20} className="text-orange-500" />
                <span>11am - 7pm</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} className="text-orange-500" />
                <span>Ubicación</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          © Copyright 2024 All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
