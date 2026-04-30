import { notFound } from "next/navigation";
import CheckoutClient from "@/components/checkout/checkout-client";
import { events } from "@/lib/mock-data";

type PageProps = {
  searchParams: Promise<{
    event?: string;
    ticket?: string;
    quantity?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const event = events.find((item) => item.id === params.event);

  if (!event) {
    notFound();
  }

  const ticket = event.tickets.find((item) => item.name === params.ticket);

  if (!ticket) {
    notFound();
  }

  const quantity = Math.max(1, Number(params.quantity ?? 1) || 1);

  return (
    <CheckoutClient
      event={event}
      ticket={ticket}
      initialQuantity={quantity}
    />
  );
}




