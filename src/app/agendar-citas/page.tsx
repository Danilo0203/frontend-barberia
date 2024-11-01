import { BarberosCitas } from "@/components/website/agendar-cita/BarberosCitas";
import { CalendarioCita } from "@/components/website/agendar-cita/CalendarioCita";
import { ServiciosCitas } from "@/components/website/agendar-cita/ServiciosCitas";

export default function AgendarCitasPage() {
  return (
    <div>
      <ServiciosCitas />
      <BarberosCitas />
      <CalendarioCita />
    </div>
  );
}
