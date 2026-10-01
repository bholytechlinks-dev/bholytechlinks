import {
  Award,
  CheckCircle2,
  BookOpen,
  GraduationCap,
  Receipt,
  FileText,
  FileSignature,
  CreditCard,
  Printer,
  Briefcase,
  Laptop,
} from 'lucide-react';

export const SERVICES_DATA = [
  // Admissions, Registrations & Portal Services
  {
    id: 'adm-reg',
    category: 'admissions',
    name: 'Admission Registration',
    icon: GraduationCap,
    popular: true,
    message: 'Hello Bholytech-Links, I want to apply for Admission Registration'
  },
  {
    id: 'pre-jamb',
    category: 'admissions',
    name: 'Pre-JAMB Registration',
    icon: FileSignature,
    popular: false,
    message: 'Hello Bholytech-Links, I need Pre-JAMB Registration assistance'
  },
  {
    id: 'post-jamb',
    category: 'admissions',
    name: 'Post-JAMB Registration',
    icon: FileText,
    popular: true,
    message: 'Hello Bholytech-Links, I need Post-JAMB Registration assistance'
  },
  {
    id: 'nysc-reg',
    category: 'admissions',
    name: 'NYSC Registration',
    icon: Award,
    popular: true,
    message: 'Hello Bholytech-Links, I need assistance with NYSC Registration'
  },
  {
    id: 'adm-consult',
    category: 'admissions',
    name: 'Admission Consultation',
    icon: CheckCircle2,
    popular: false,
    message: 'Hello Bholytech-Links, I need Admission Consultation'
  },

  // Academic Writing & Assignments
  {
    id: 'proj-write',
    category: 'academics',
    name: 'Project Writing',
    icon: BookOpen,
    popular: true,
    message: 'Hello Bholytech-Links, I need assistance with Project Writing'
  },
  {
    id: 'sem-write',
    category: 'academics',
    name: 'Seminar Writing',
    icon: FileText,
    popular: false,
    message: 'Hello Bholytech-Links, I need assistance with Seminar Writing'
  },
  {
    id: 'siwes-write',
    category: 'academics',
    name: 'SIWES Writing',
    icon: Briefcase,
    popular: false,
    message: 'Hello Bholytech-Links, I need assistance with SIWES Writing'
  },
  {
    id: 'online-assign',
    category: 'academics',
    name: 'Online Assignment',
    icon: Laptop,
    popular: true,
    message: 'Hello Bholytech-Links, I need help with an Online Assignment'
  },

  // Payments, Transcripts & Printing
  {
    id: 'school-fee',
    category: 'payments',
    name: 'School Fee Payment',
    icon: CreditCard,
    popular: true,
    message: 'Hello Bholytech-Links, I need to make a School Fee Payment'
  },
  {
    id: 'cert-pay',
    category: 'payments',
    name: 'Payment of Certificate (ND/HND)',
    icon: Receipt,
    popular: false,
    message: 'Hello Bholytech-Links, I need Payment of Certificate (ND and HND)'
  },
  {
    id: 'transcript-pay',
    category: 'payments',
    name: 'Payment of Transcript (ND/HND)',
    icon: FileText,
    popular: false,
    message: 'Hello Bholytech-Links, I need Payment of Transcript (ND and HND)'
  },
  {
    id: 'print-copy',
    category: 'payments',
    name: 'Printing & Photocopy (Low Price)',
    icon: Printer,
    popular: true,
    message: 'Hello Bholytech-Links, I need Printing and Photocopy services'
  }
];