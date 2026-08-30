import { agents } from "@/lib/agents";

/** Static placeholder identity until a real admin-auth/user system exists. */
const admin = agents[0];

export function AdminProfile() {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-navy-950 font-serif text-sm text-gold-400">
        {admin.initials}
      </span>
      <div className="hidden leading-tight sm:block">
        <p className="text-sm font-semibold text-navy-950">{admin.name}</p>
        <p className="text-xs text-gray-500">Admin</p>
      </div>
    </div>
  );
}
