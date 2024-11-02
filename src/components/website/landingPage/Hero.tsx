import SectionLayout from "../SectionLayout";
import Image from "next/image";
import { ModalAgendarCita } from "../agendar-cita/ModalAgendarCita";

export const Hero = () => {
  return (
    <SectionLayout id="inicio">
      <div className="flex flex-grow flex-col items-center gap-16 md:flex-row md:justify-evenly md:gap-0">
        <div className="w-full space-y-4 md:w-96">
          <h2 className="text-pretty text-3xl font-bold leading-relaxed">
            Eleva Tu Estilo Con Los Cortes Premium De
            <span className="text-primary"> Juanes Barber&apos;s</span>
          </h2>

          <p className="text-lg text-gray-700 dark:text-gray-300">
            Experimenta un nuevo nivel de estilo con los servicios excepcionales
            de corte, arreglo y peinado de Juanes Barber&apos;s, diseñados para
            elevar tu apariencia.
          </p>
          <ModalAgendarCita />
        </div>

        <div>
          <Image
            src="/img/hero/portada.png"
            alt="Barbero trabajando"
            width={400}
            height={300}
            className="mx-auto rounded-lg"
          />
        </div>
      </div>
    </SectionLayout>
  );
};
