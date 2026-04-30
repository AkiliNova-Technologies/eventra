import { notFound } from "next/navigation";
import { EventForm } from "@/components/organizer/events/event-form";
import { events } from "@/lib/mock-data";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;

  const event = events.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  return <EventForm mode="edit" event={event} />;
}