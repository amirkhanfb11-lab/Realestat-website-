export type Testimonial = {
  name: string;
  location: string;
  quote: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Whitfield",
    location: "Los Angeles, CA",
    quote:
      "Abu Salem made buying our first home feel effortless. Every question was answered before we even had to ask, and we never once felt pressured.",
    initials: "SW",
  },
  {
    name: "Daniel Osei",
    location: "Beverly Hills, CA",
    quote:
      "Their market knowledge is unmatched. We had three competing offers on our listing within a week, well above asking price.",
    initials: "DO",
  },
  {
    name: "Maria Fernandez",
    location: "Santa Monica, CA",
    quote:
      "From first showing to closing day in three weeks flat. Our agent handled every detail and kept us calm through the whole process.",
    initials: "MF",
  },
];
