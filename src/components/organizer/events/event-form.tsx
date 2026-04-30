"use client";

import * as React from "react";
import Image from "next/image";
import {
  CalendarDays,
  ImageIcon,
  Info,
  Lightbulb,
  MapPin,
  Mic2,
  Plus,
  Save,
  Ticket,
  Trash2,
  ListChecks,
  ArrowLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import type { EventCategory, EventItem } from "@/lib/mock-data";

type EventFormProps = {
  mode: "create" | "edit";
  event?: EventItem;
};

type EventVisibility = "Public" | "Invite Only" | "Private Link";

type EventFormState = {
  title: string;
  category: EventCategory;
  visibility: EventVisibility;
  description: string;
  startDate: string;
  endDate: string;
  venue: string;
  location: string;
  latitude: string;
  longitude: string;
  image: string;
};

type TicketRow = {
  id: string;
  name: string;
  price: string;
  quantity: string;
};

type AgendaRow = {
  id: string;
  day: string;
  title: string;
  time: string;
  description: string;
};

type SpeakerRow = {
  id: string;
  name: string;
  role: string;
  image: string;
};

function toDateTimeLocal(date: string, time?: string) {
  const fallback = "2026-10-12T09:00";

  if (!date) return fallback;

  // Handles mock values like "Oct 12–14, 2026"
  const cleanedDate = date.split("–")[0].trim();
  const parsed = new Date(`${cleanedDate} ${time ?? "09:00 AM"}`);

  if (Number.isNaN(parsed.getTime())) return fallback;

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, "0");
  const day = String(parsed.getDate()).padStart(2, "0");
  const hours = String(parsed.getHours()).padStart(2, "0");
  const minutes = String(parsed.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

function getDefaultCoordinates(location?: string) {
  if (location?.toLowerCase().includes("kampala")) {
    return { latitude: "0.3476", longitude: "32.5825" };
  }

  return { latitude: "0.2422", longitude: "32.6237" };
}

export function EventForm({ mode, event }: EventFormProps) {
  const router = useRouter();

  const coordinates = getDefaultCoordinates(event?.location);

  const [form, setForm] = React.useState({
    title: event?.title ?? "",
    category: event?.category ?? "Tech",
    visibility: event?.visibility ?? "Public",
    description: event?.description ?? "",
    startDate: event?.startDate ?? "2026-10-12T09:00",
    endDate: event?.endDate ?? "2026-10-12T18:00",
    venue: event?.venue ?? "",
    location: event?.location ?? "Kampala, Uganda",
    latitude: String(event?.coordinates?.latitude ?? 0.2422),
    longitude: String(event?.coordinates?.longitude ?? 32.6237),
    image: event?.image ?? "/images/events/tech-summit.png",
  });

  const [tickets, setTickets] = React.useState<TicketRow[]>(
    event?.tickets?.map((ticket, index) => ({
      id: `${index + 1}`,
      name: ticket.name,
      price:
        ticket.price.toLowerCase() === "free"
          ? "0"
          : ticket.price.replace(/[^\d]/g, ""),
      quantity: String(ticket.quantity),
    })) ?? [
      {
        id: "1",
        name: "Regular Pass",
        price: "50000",
        quantity: "300",
      },
      {
        id: "2",
        name: "VIP Pass",
        price: "150000",
        quantity: "120",
      },
    ],
  );

  const [agendaItems, setAgendaItems] = React.useState<AgendaRow[]>(
    event?.agenda?.map((item, index) => ({
      id: `${index + 1}`,
      day: item.day,
      title: item.title,
      time: item.time,
      description: item.description,
    })) ?? [
      {
        id: "1",
        day: "Day 1",
        title: "Opening Keynote",
        time: "09:00 AM",
        description: "Welcome session and event introduction.",
      },
    ],
  );

  const [speakers, setSpeakers] = React.useState<SpeakerRow[]>(
    event?.speakers?.map((speaker, index) => ({
      id: `${index + 1}`,
      name: speaker.name,
      role: speaker.role,
      image: speaker.image,
    })) ?? [
      {
        id: "1",
        name: "Jane Doe",
        role: "CTO at FutureScale",
        image: "/images/speakers/speaker-1.png",
      },
    ],
  );

  function addTicket() {
    setTickets((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "",
        price: "",
        quantity: "",
      },
    ]);
  }

  function updateTicket(id: string, field: keyof TicketRow, value: string) {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === id ? { ...ticket, [field]: value } : ticket,
      ),
    );
  }

  function removeTicket(id: string) {
    setTickets((current) =>
      current.length === 1
        ? current
        : current.filter((ticket) => ticket.id !== id),
    );
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setForm((current) => ({ ...current, image: imageUrl }));
  }

  const lowestPrice =
    tickets
      .map((ticket) => Number(ticket.price))
      .filter(Boolean)
      .sort((a, b) => a - b)[0] ?? 0;

  function addAgendaItem() {
    setAgendaItems((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        day: `Day ${current.length + 1}`,
        title: "",
        time: "",
        description: "",
      },
    ]);
  }

  function updateAgendaItem(id: string, field: keyof AgendaRow, value: string) {
    setAgendaItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );
  }

  function removeAgendaItem(id: string) {
    setAgendaItems((current) =>
      current.length === 1 ? current : current.filter((item) => item.id !== id),
    );
  }

  function addSpeaker() {
    setSpeakers((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "",
        role: "",
        image: "/images/speakers/speaker-1.png",
      },
    ]);
  }

  function updateSpeaker(id: string, field: keyof SpeakerRow, value: string) {
    setSpeakers((current) =>
      current.map((speaker) =>
        speaker.id === id ? { ...speaker, [field]: value } : speaker,
      ),
    );
  }

  function removeSpeaker(id: string) {
    setSpeakers((current) =>
      current.length === 1
        ? current
        : current.filter((speaker) => speaker.id !== id),
    );
  }

  function handlePublishEvent() {
    // For this example, we'll just log the form data to the console
    const eventData = {
      ...form,
      tickets,
      agendaItems,
      speakers,
    };
    console.log(eventData);
    router.push("/organizer/events");
  }

  function handleSaveDraftEvent() {
    // For this example, we'll just log the form data to the console
    const eventData = {
      ...form,
      tickets,
      agendaItems,
      speakers,
    };
    console.log(eventData);
    router.push("/organizer/events");
  }

  return (
    <div className="grid gap-8 xl:grid-cols-12">
      <div className="space-y-6 xl:col-span-8">
        <section>
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
            Event Management
          </p>
          <div className="mt-3 flex items-center gap-4">
            <Button
              variant="outline"
              className="h-10 text-slate-400 hover:text-white"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              {mode === "create" ? "Create New Event" : "Edit Event"}
            </h1>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Design a premium event experience and manage ticket availability.
          </p>
        </section>

        <FormCard icon={<Info className="h-5 w-5" />} title="Basic Information">
          <div className="space-y-5">
            <Field label="Event Title">
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Africa Tech Innovation Summit 2026"
                className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
              />
            </Field>

            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Category">
                <Select
                  value={form.category}
                  onValueChange={(value) =>
                    setForm({ ...form, category: value as EventCategory })
                  }
                >
                  <SelectTrigger className="min-h-11 w-full border-white/10 bg-[#0d141d] text-white rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#111827] text-white p-2">
                    <SelectItem value="Tech">Technology</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Culture">Culture</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Visibility">
                <Select
                  value={form.visibility}
                  onValueChange={(value) =>
                    setForm({ ...form, visibility: value as EventVisibility })
                  }
                >
                  <SelectTrigger className="min-h-11 w-full border-white/10 bg-[#0d141d] text-white rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="border-white/10 bg-[#111827] text-white p-2">
                    <SelectItem value="Public">Public</SelectItem>
                    <SelectItem value="Invite Only">Invite Only</SelectItem>
                    <SelectItem value="Private Link">Private Link</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field label="Description">
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Describe the value, atmosphere, and experience of your event..."
                className="min-h-32 border-white/10 bg-[#0d141d] text-white rounded-sm"
              />
            </Field>
          </div>
        </FormCard>

        <FormCard
          icon={<CalendarDays className="h-5 w-5" />}
          title="Date & Location"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Start Date & Time">
              <Input
                type="datetime-local"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
                className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
              />
            </Field>

            <Field label="End Date & Time">
              <Input
                type="datetime-local"
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
              />
            </Field>

            <Field label="Venue Name">
              <Input
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                placeholder="Speke Resort Munyonyo"
                className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
              />
            </Field>

            <Field label="Location">
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Kampala, Uganda"
                className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
              />
            </Field>

            <Field label="Latitude">
              <Input
                value={form.latitude}
                onChange={(e) => setForm({ ...form, latitude: e.target.value })}
                placeholder="0.2422"
                className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
              />
            </Field>

            <Field label="Longitude">
              <Input
                value={form.longitude}
                onChange={(e) =>
                  setForm({ ...form, longitude: e.target.value })
                }
                placeholder="32.6237"
                className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
              />
            </Field>
          </div>
        </FormCard>

        <FormCard icon={<ImageIcon className="h-5 w-5" />} title="Event Media">
          <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-white/10 bg-white/[0.03] p-6 text-center transition hover:bg-white/[0.05]">
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="relative mx-auto h-56 w-full overflow-hidden rounded-xl border border-white/10">
              <Image
                src={form.image}
                alt="Event banner preview"
                fill
                className="object-cover"
                unoptimized={form.image.startsWith("blob:")}
              />
              <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="mt-5">
              <p className="font-medium text-white">
                Click to upload event banner
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Recommended 16:9 ratio, PNG, JPG, or WEBP.
              </p>
            </div>
          </label>
        </FormCard>

        <FormCard
          icon={<ListChecks className="h-5 w-5" />}
          title="Event Agenda"
          action={
            <Button
              type="button"
              variant="ghost"
              onClick={addAgendaItem}
              className="text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Agenda
            </Button>
          }
        >
          <div className="space-y-4">
            {agendaItems.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 rounded-xl border border-white/10 bg-[#0d141d]/70 p-4 md:grid-cols-12"
              >
                <div className="md:col-span-2">
                  <Field label="Day">
                    <Input
                      value={item.day}
                      onChange={(e) =>
                        updateAgendaItem(item.id, "day", e.target.value)
                      }
                      placeholder="Day 1"
                      className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                    />
                  </Field>
                </div>

                <div className="md:col-span-4">
                  <Field label="Title">
                    <Input
                      value={item.title}
                      onChange={(e) =>
                        updateAgendaItem(item.id, "title", e.target.value)
                      }
                      placeholder="Opening Keynote"
                      className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                    />
                  </Field>
                </div>

                <div className="md:col-span-2">
                  <Field label="Time">
                    <Input
                      value={item.time}
                      onChange={(e) =>
                        updateAgendaItem(item.id, "time", e.target.value)
                      }
                      placeholder="09:00 AM"
                      className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                    />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field label="Description">
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        updateAgendaItem(item.id, "description", e.target.value)
                      }
                      placeholder="Session description"
                      className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                    />
                  </Field>
                </div>

                <div className="flex items-center pt-5 md:col-span-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeAgendaItem(item.id)}
                    className="text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </FormCard>

        <FormCard
          icon={<Mic2 className="h-5 w-5" />}
          title="Speakers / Performers"
          action={
            <Button
              type="button"
              variant="ghost"
              onClick={addSpeaker}
              className="text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Person
            </Button>
          }
        >
          <div className="space-y-4">
            {speakers.map((speaker) => (
              <div
                key={speaker.id}
                className="grid gap-4 rounded-xl border border-white/10 bg-[#0d141d]/70 p-4 md:grid-cols-12"
              >
                <div className="md:col-span-4">
                  <Field label="Name">
                    <Input
                      value={speaker.name}
                      onChange={(e) =>
                        updateSpeaker(speaker.id, "name", e.target.value)
                      }
                      placeholder="Jane Doe"
                      className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                    />
                  </Field>
                </div>

                <div className="md:col-span-4">
                  <Field label="Role / Stage Name">
                    <Input
                      value={speaker.role}
                      onChange={(e) =>
                        updateSpeaker(speaker.id, "role", e.target.value)
                      }
                      placeholder="CTO at FutureScale"
                      className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                    />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field label="Image URL">
                    <Input
                      value={speaker.image}
                      onChange={(e) =>
                        updateSpeaker(speaker.id, "image", e.target.value)
                      }
                      placeholder="/images/speakers/speaker-1.png"
                      className="h-11 rounded-sm border-white/10 bg-[#0d141d] text-white"
                    />
                  </Field>
                </div>

                <div className="flex items-center pt-5 md:col-span-1">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeSpeaker(speaker.id)}
                    className="text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </FormCard>

        <FormCard
          icon={<Ticket className="h-5 w-5" />}
          title="Ticketing"
          action={
            <Button
              type="button"
              variant="ghost"
              onClick={addTicket}
              className="text-violet-300 hover:bg-violet-500/10 hover:text-violet-200"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Ticket Type
            </Button>
          }
        >
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="grid gap-4 rounded-xl border border-white/10 bg-[#0d141d]/70 p-4 md:grid-cols-12"
              >
                <div className="md:col-span-5">
                  <Field label="Ticket Name">
                    <Input
                      value={ticket.name}
                      onChange={(e) =>
                        updateTicket(ticket.id, "name", e.target.value)
                      }
                      placeholder="VIP Access"
                      className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
                    />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field label="Price (UGX)">
                    <Input
                      value={ticket.price}
                      onChange={(e) =>
                        updateTicket(ticket.id, "price", e.target.value)
                      }
                      placeholder="150000"
                      className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
                    />
                  </Field>
                </div>

                <div className="md:col-span-3">
                  <Field label="Quantity">
                    <Input
                      value={ticket.quantity}
                      onChange={(e) =>
                        updateTicket(ticket.id, "quantity", e.target.value)
                      }
                      placeholder="100"
                      className="h-11 border-white/10 bg-[#0d141d] text-white rounded-sm"
                    />
                  </Field>
                </div>

                <div className="flex items-center md:col-span-1 pt-5">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => removeTicket(ticket.id)}
                    className="text-slate-500 hover:bg-rose-500/10 hover:text-rose-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </FormCard>

        <div className="flex justify-end gap-3 border-t border-white/10 pt-6">
          <Button
            variant="ghost"
            className="h-11 px-6 text-slate-400 hover:text-white"
            onClick={() => handleSaveDraftEvent()}
          >
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button
            className="bg-violet-500 h-11 px-6 hover:bg-violet-400 rounded-md text-white hover:text-white"
            onClick={handlePublishEvent}
          >
            {mode === "create" ? "Publish Event" : "Update Event"}
          </Button>
        </div>
      </div>

      <aside className="hidden xl:col-span-4 xl:block">
        <div className="sticky top-24 space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-violet-300">
              Live Preview
            </p>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase text-slate-500">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400 animate-pulse" />
              Real-time
            </div>
          </div>

          <Card className="overflow-hidden border-white/10 bg-white/[0.04] p-0 text-white backdrop-blur-xl">
            <div className="relative h-52">
              <Image
                src={form.image}
                alt={form.title || "Event preview"}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-xs text-violet-300 backdrop-blur-md">
                {form.category}
              </span>
            </div>

            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <CalendarDays className="h-4 w-4 text-violet-300" />
                {form.startDate
                  ? new Date(form.startDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Event date"}
              </div>

              <h3 className="text-2xl font-bold leading-tight">
                {form.title || "Your Event Title"}
              </h3>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-slate-500" />
                {form.venue || "Venue name"}, {form.location}
              </div>

              <div className="border-t border-white/10 pt-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Starts from
                </p>
                <p className="text-2xl font-bold text-emerald-300">
                  {lowestPrice ? `UGX ${lowestPrice.toLocaleString()}` : "Free"}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-2xl border border-violet-400/10 bg-violet-500/5 p-5">
            <div className="flex items-center gap-2 text-violet-300">
              <Lightbulb className="h-4 w-4" />
              <p className="font-medium">Pro Tip</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              High-quality banners and clear ticket tiers improve booking
              conversion. Keep the event title short and specific.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function FormCard({
  icon,
  title,
  children,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card className="border-white/10 bg-white/[0.04] text-white backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
            {icon}
          </div>
          <CardTitle>{title}</CardTitle>
        </div>
        {action}
      </CardHeader>
      <CardContent className="p-5">{children}</CardContent>
    </Card>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-widest text-slate-400">
        {label}
      </span>
      {children}
    </label>
  );
}
