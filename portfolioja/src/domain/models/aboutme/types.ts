export type ContactInfo = {
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
};

export type AboutMe = {
  title: string;
  paragraphs: string[];
  contact?: ContactInfo;
};