export type Accent = "indigo" | "emerald" | "amber" | "blue" | "purple" | "slate" | "yellow";

export type EducationItem = {
  id: string;
  institution: string;
  degree: string;
  location?: string;
  note?: string;
  accent?: Accent;
  metrics?: Array<{ label: string; value: string }>;
};

export type AcademicAchievementItem = {
  id: string;
  title: string;
  event: string;
  accent?: Accent;
  images: string[];
};

export type ProfessionalAchievementItem = {
  id: string;
  role: string;
  organization: string;
  period?: string;
  description: string;
  icon?: "file" | "scale" | "users" | "briefcase";
  images: string[];
};

export type FieldWorkItem = {
  id: string;
  title: string;
  period?: string;
  description: string;
  images: string[];
};

export type ExtraCurricularItem = {
  id: string;
  title: string;
  subtitle: string;
  period?: string;
  description: string;
  quote?: string;
  images: string[];
};

export type ReferenceItem = {
  id: string;
  name: string;
  title: string;
  department: string;
  education?: string;
  email: string;
  image?: string;
};

export type GalleryItem = {
  id: string;
  src: string;
  category: string;
  alt: string;
};

export type ContactDetail = {
  id: string;
  type: "address" | "email" | "phone" | "other";
  label: string;
  value: string;
  href?: string;
};

export type ContactInfo = {
  intro: string;
  formspreeEndpoint: string;
  details: ContactDetail[];
};

export type PortfolioContent = {
  education: EducationItem[];
  academicAchievements: AcademicAchievementItem[];
  professionalAchievements: ProfessionalAchievementItem[];
  fieldWork: FieldWorkItem[];
  extraCurricular: ExtraCurricularItem[];
  references: ReferenceItem[];
  gallery: GalleryItem[];
  contact: ContactInfo;
};

export const defaultContent: PortfolioContent = {
  education: [
    {
      id: "education-nsu",
      institution: "North South University",
      degree: "Bachelor of Law (LLB Hons)",
      location: "Bashundhara R/A, Dhaka",
      note: "Student Id: 2231244011",
      accent: "indigo",
      metrics: [
        { label: "CGPA", value: "3.67" },
        { label: "Credits Completed", value: "112" },
      ],
    },
    {
      id: "education-bgc",
      institution: "Brahmanbaria Govt College",
      degree: "Higher Secondary Certificate (HSC)",
      accent: "emerald",
      metrics: [{ label: "GPA", value: "5.00" }],
    },
  ],
  academicAchievements: [
    {
      id: "academic-trial-tactics",
      title: "Best Prosecution and Runner-up",
      event: "National Trial Tactics (Mock Trial)",
      accent: "amber",
      images: ["/achievement1.jpg", "/achievement2.jpg", "/achievement3.jpg"],
    },
    {
      id: "academic-umsails",
      title: "Champion",
      event: "UMSAILS Spring School Moot Court Competition",
      accent: "yellow",
      images: ["/achievement8.jpg"],
    },
    {
      id: "academic-stetson",
      title: "Quarter Finalist, Best New Team & 4th Memorial Ranking",
      event: "Stetson Moot Court Competition",
      accent: "indigo",
      images: ["/achievement4.jpg"],
    },
    {
      id: "academic-scls",
      title: "Semi-Finalist",
      event: "SCLS Law Olympiad 5.0",
      accent: "blue",
      images: ["/achievement5.jpg", "/newAchieve1.jpg"],
    },
    {
      id: "academic-tax-law",
      title: "Winner",
      event: "Tax Law Competition, Organized by the Finance Ministry",
      accent: "emerald",
      images: ["/achievement12.webp"],
    },
    {
      id: "academic-intra-moot",
      title: "Best Researcher and Champion",
      event: "NSU INTRA-MOOT COURT Competition",
      accent: "purple",
      images: ["/achievement6.jpg", "/achievement7.jpg", "/achievement11.jpg"],
    },
    {
      id: "academic-quizathon-penal",
      title: "2nd Position",
      event: "Quizathon (subject: Penal Code) organized by NSULMS",
      accent: "slate",
      images: ["/achievement9.jpg", "/achievement13.jpg"],
    },
    {
      id: "academic-quizathon-constitution",
      title: "2nd Position",
      event: "Quizathon (subject: Constitution) organized by NSULMS",
      accent: "slate",
      images: ["/achievement10.jpg"],
    },
  ],
  professionalAchievements: [
    {
      id: "professional-ta",
      role: "Teaching Assistant (TA)",
      organization: "Department of Law, North South University",
      period: "",
      description: "Assisted in academic activities and supported faculty members in the Department of Law.",
      icon: "file",
      images: ["/prof1.jpg", "/prof2.jpg"],
    },
    {
      id: "professional-nsulms",
      role: "Vice-President of Executive Body",
      organization: "NSULMS",
      period: "August 2025 - Current",
      description: "The North South University Law and Mooting Society (NSULMS), founded in 2017, is a student-run organization under the Department of Law. It develops students' advocacy, research, and legal skills through moot court competitions, workshops, and community programs, preparing them for professional legal careers.",
      icon: "scale",
      images: ["/prof3.jpg", "/prof4.jpg"],
    },
    {
      id: "professional-bailiff",
      role: "Bailiff",
      organization: "Jessup International Moot Court Competition",
      period: "2025",
      description: "Assisted in organizing hearings and supporting judges and participants in this prestigious international law competition.",
      icon: "scale",
      images: ["/bai1.jpg", "/bai2.jpg"],
    },
    {
      id: "professional-youth-mentor",
      role: "Youth Mentor",
      organization: "Save the Children Bangladesh",
      period: "2020 - Present",
      description: "Work as a youth mentor to promote various youth-related policies in the country.",
      icon: "users",
      images: ["/youthmentor.jpg"],
    },
    {
      id: "professional-nctf",
      role: "President",
      organization: "National Children's Task Force (NCTF)",
      period: "2018 - 2021",
      description: "The National Children's Task Force (NCTF) is a child-led organization in Bangladesh that promotes children's rights and raises awareness on issues like education, child marriage, and child labor.",
      icon: "users",
      images: ["/nctf1.jpg", "/nctf2.jpg"],
    },
    {
      id: "professional-shishu-academy",
      role: "Event Organizer",
      organization: "Bangladesh Shishu Academy, Brahmanbaria",
      period: "2018 - 2020",
      description: "I work with the Bangladesh Shishu Academy, organizing events to promote children's rights and raise awareness about issues such as education and child protection.",
      icon: "briefcase",
      images: ["/sishu1.jpg", "/sishu2.jpg"],
    },
    {
      id: "professional-titash",
      role: "Chief Editor",
      organization: "Titash Shishu Barta",
      period: "2018 - 2020",
      description: "Titash Shishu Barta is a children's magazine covering rights, news, and events. As Chief Editor, I oversee content, edit articles, coordinate with writers, and organize events focused on children.",
      icon: "file",
      images: ["/titash1.jpg", "/titash2.jpg"],
    },
  ],
  fieldWork: [
    {
      id: "field-focus-group",
      title: "Focus Group Discussion",
      period: "2020",
      description: "A focus group discussion (FGD) is a research project where I have worked in the field to collect the opinions of children from diverse backgrounds.",
      images: ["/focus1.jpg"],
    },
    {
      id: "field-amar-kotha",
      title: "Amar Kotha Shuno",
      period: "2019",
      description: "This was a project assigned by the government of Bangladesh in the year 2019, where I worked school to school to learn about students' opinions about different policy making. Also organized various events with policymakers, where they listened directly to the opinions of students.",
      images: ["/kotha1.jpg", "/kotha2.jpg"],
    },
    {
      id: "field-budget",
      title: "Children's Demand On the Parliament Budget",
      period: "2018",
      description: "Took a survey of more than 500 children of different age groups and backgrounds about their demand for government budgets specific to them. Make a report on that and send it to the respective ministry.",
      images: ["/demand1.jpg"],
    },
    {
      id: "field-convener",
      title: "Convener",
      period: "",
      description: "National Policy Competition organised by Ministry of Sports",
      images: ["/con1.jpg", "/con2.jpg"],
    },
  ],
  extraCurricular: [
    {
      id: "extra-district-champion",
      title: "District Champion",
      subtitle: "100-meter sprint and Long Jump",
      period: "2017 - 2018",
      description: "Demonstrated athletic excellence and competitive spirit by securing the district championship in both the 100-meter sprint and long jump events. This achievement highlights dedication, physical fitness, and the ability to perform under pressure.",
      quote: "Sports teach discipline, resilience, and the drive to constantly improve - qualities that translate directly into professional success.",
      images: ["/extracurricular1.jpg"],
    },
  ],
  references: [
    {
      id: "reference-nafiz",
      name: "Nafiz Ahmed",
      title: "Senior Lecturer",
      department: "Department of Law, North South University",
      education: "LL.M (University of Cambridge), LL.B (North South University)",
      email: "nafiz.ahmed04@northsouth.edu",
      image: "/ref1.jpg",
    },
    {
      id: "reference-abu-noman",
      name: "Dr. Abu Noman Mohammad Atahar Ali",
      title: "Professor of Law",
      department: "North South University",
      education: "Ph.D. in Law (UOW, Australia)",
      email: "abu.ali@northsouth.edu",
      image: "/ref2.jpg",
    },
    {
      id: "reference-ishtiaque",
      name: "Dr. Ishtiaque Ahmed, Barrister-at-Law, MCIArb",
      title: "Professor & Chair",
      department: "Department of Law, North South University",
      education: "",
      email: "ishtiaque.ahmed@northsouth.edu",
      image: "/ref3.jpg",
    },
  ],
  gallery: [
    ...Array.from({ length: 20 }, (_, index) => ({
      id: `gallery-g${index + 1}`,
      src: `G${index + 1}.jpg`,
      category: "General",
      alt: `Gallery Image ${index + 1}`,
    })),
    {
      id: "gallery-g22",
      src: "G22.jpg",
      category: "General",
      alt: "Gallery Image 22",
    },
  ],
  contact: {
    intro: "Feel free to reach out to me using the contact form or through the information provided below. I am always open to discussing new opportunities, collaborations, or answering any questions you may have.",
    formspreeEndpoint: "https://formspree.io/f/maqdrlen",
    details: [
      {
        id: "contact-address",
        type: "address",
        label: "Address",
        value: "Bashundhara R/A. Dhaka",
      },
      {
        id: "contact-email",
        type: "email",
        label: "Email",
        value: "iftekharul.bhuiyan@northsouth.edu",
        href: "mailto:iftekharul.bhuiyan@northsouth.edu",
      },
      {
        id: "contact-phone",
        type: "phone",
        label: "Phone",
        value: "+8801633297340",
        href: "tel:+8801633297340",
      },
    ],
  },
};
