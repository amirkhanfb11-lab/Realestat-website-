import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import type { Agent } from "@/lib/agents";
import type { Property } from "@/lib/properties";

export function AgentCard({ agent, property }: { agent: Agent; property: Property }) {
  const whatsappMessage = encodeURIComponent(
    `Hi ${agent.name}, I'm interested in ${property.title} (${property.location}). Could you share more details?`
  );
  const phoneHref = `tel:${agent.phone.replace(/[^0-9+]/g, "")}`;
  const whatsappHref = `https://wa.me/${agent.whatsapp}?text=${whatsappMessage}`;

  return (
    <div className="rounded-2xl bg-white p-6 shadow-soft">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 flex-none items-center justify-center rounded-full bg-navy-950 font-serif text-lg text-gold-400">
          {agent.initials}
        </span>
        <div>
          <p className="text-base font-semibold text-navy-950">{agent.name}</p>
          <p className="text-sm text-gray-500">{agent.title}</p>
        </div>
      </div>

      <div className="mt-5 space-y-2 border-t border-border pt-5 text-sm text-gray-500">
        <p>{agent.phone}</p>
        {agent.email && <p>{agent.email}</p>}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Button href={phoneHref} variant="primary" fullWidth>
          Contact Agent
        </Button>
        <Button
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          fullWidth
          className="gap-2"
        >
          <WhatsAppIcon />
          WhatsApp
        </Button>
      </div>
    </div>
  );
}
