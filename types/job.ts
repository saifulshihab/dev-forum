export interface IJobCircular {
  id: string;
  title: string;
  description: string;
  company: string;
  location: string;
  employment_type:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Freelance"
    | "Internship";
  salary: {
    min: number;
    max: number;
    currency: string;
    period: "hourly" | "monthly" | "yearly";
  };
  experience_level: "Entry level" | "Mid level" | "Senior level" | "Executive";
  posted_date: string;
  application_deadline: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  tags: string[];
  logo: string;
}
