import { PropertiesProvider } from "@/components/dashboard/properties/PropertiesProvider";

export default function PropertiesLayout({ children }: { children: React.ReactNode }) {
  return <PropertiesProvider>{children}</PropertiesProvider>;
}
