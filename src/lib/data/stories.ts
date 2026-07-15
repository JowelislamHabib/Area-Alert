import { User, Users, Laptop, Car, CheckCircle2, Newspaper, Microscope, Building2, Store, CloudRain, GraduationCap, HeartHandshake, Zap } from "lucide-react";

export const CATEGORIES = ["All", "Individuals", "Professionals", "Organizations", "Community"];

export const STORIES = [
  {
    id: 1,
    persona: "Rahim",
    role: "Resident",
    icon: User,
    category: "Individuals",
    featured: true,
    avatarId: 68,
    content: [
      "I live in Mirpur and needed to withdraw money from an ATM before work, but there was a power outage in my area. I had no idea if the nearby ATMs were working.",
      "I opened AreaAlert and searched 'Mirpur 10'. Right away, I saw community reports: an electricity outage since 7:15 AM, another saying electricity was restored in Mirpur DOHS, and an internet outage reported by three others.",
      "Instead of wasting time, I decided to visit another nearby area. It saved me so much time and frustration."
    ],
  },
  {
    id: 2,
    persona: "Nusrat",
    role: "Parent",
    icon: Users,
    category: "Individuals",
    avatarId: 59,
    content: [
      "My daughter was due to attend coaching classes, but heavy rain had just caused severe waterlogging.",
      "I checked AreaAlert and saw that users nearby had already reported waterlogging, heavy traffic congestion, and even a closed road.",
      "I decided to send her later to keep her safe."
    ],
  },
  {
    id: 3,
    persona: "Hasan",
    role: "Remote Worker",
    icon: Laptop,
    category: "Professionals",
    featured: true,
    avatarId: 56,
    content: [
      "I work remotely, and my internet suddenly went down right in the middle of the workday.",
      "Instead of waiting on hold with customer service, I immediately checked AreaAlert. Twenty users nearby had already reported an ISP outage starting around 9:05 AM.",
      "Realizing it wasn't just my connection saved me from a lot of pointless troubleshooting."
    ],
  },
  {
    id: 4,
    persona: "Traveler",
    role: "Family",
    icon: Car,
    category: "Individuals",
    avatarId: 54,
    content: [
      "My family was travelling from Dhaka to Sylhet. Before leaving, we checked AreaAlert to see if there were any issues on the way.",
      "Users had reported a flooded road, a gas shortage, and internet unavailability on our planned route.",
      "We changed our route proactively and avoided getting stuck."
    ],
  },
  {
    id: 5,
    persona: "A Local Resident",
    role: "Community Member",
    icon: CheckCircle2,
    category: "Community",
    avatarId: 42,
    content: [
      "I reported an electricity outage in Banasree. Within minutes, ten other users nearby confirmed it on the app.",
      "It’s amazing to see how quickly a single report becomes a trusted, verified source of truth because multiple people are experiencing the same issue."
    ],
  },
  {
    id: 6,
    persona: "A Journalist",
    role: "Local Newspaper",
    icon: Newspaper,
    category: "Professionals",
    avatarId: 37,
    content: [
      "As a journalist at a local newspaper, I wanted to investigate why residents were constantly complaining about repeated electricity outages.",
      "Instead of relying only on scattered social media posts, I searched AreaAlert.",
      "I discovered 145 outage reports in the last 7 days, identified the most affected neighborhoods, and saw peak outage times. The community comments provided incredible leads for my field reporting."
    ],
  },
  {
    id: 7,
    persona: "University Researcher",
    role: "Academic",
    icon: Microscope,
    category: "Professionals",
    avatarId: 12,
    content: [
      "I’m a university researcher studying urban infrastructure. Manually collecting complaints from Facebook groups used to be a nightmare.",
      "Now, I use AreaAlert's public reports to analyze frequent outage locations, seasonal trends, and community response patterns.",
      "The data provides solid backing for my research on improving public infrastructure."
    ],
  },
  {
    id: 8,
    persona: "City Official",
    role: "Local Government",
    icon: Building2,
    category: "Organizations",
    avatarId: 68,
    content: [
      "As a local government official, I review reports submitted by residents.",
      "Recently, I noticed one neighborhood had received repeated water outage reports over several weeks.",
      "Seeing that concentration of reports on AreaAlert helped us prioritize inspections and direct maintenance crews exactly where they were needed most."
    ],
  },
  {
    id: 9,
    persona: "Restaurant Owner",
    role: "Small Business",
    icon: Store,
    category: "Professionals",
    avatarId: 59,
    content: [
      "I run a restaurant and depend heavily on electricity and stable internet for online deliveries.",
      "Before opening one morning, I checked AreaAlert. Nearby reports showed that while electricity was restored, the internet was still unstable.",
      "I delayed accepting online delivery orders until the connection improved, saving me from having to cancel on angry customers."
    ],
  },
  {
    id: 10,
    persona: "A Community Member",
    role: "Emergency Response",
    icon: CloudRain,
    category: "Organizations",
    avatarId: 56,
    content: [
      "During the recent heavy rainfall, residents began reporting waterlogging, fallen electric poles, and road blockages in real-time.",
      "Because of this, those of us planning to travel knew exactly which dangerous routes to avoid. It’s incredible how community collaboration keeps everyone safe during an emergency."
    ],
  },
  {
    id: 11,
    persona: "University Student",
    role: "Student",
    icon: GraduationCap,
    category: "Individuals",
    avatarId: 54,
    content: [
      "I was preparing for a crucial online exam and needed to make sure my area didn't have internet issues.",
      "I checked AreaAlert and saw dozens of ISP outage reports in my neighborhood.",
      "I immediately moved to another location before the exam began, completely avoiding any academic disruption."
    ],
  },
  {
    id: 12,
    persona: "NGO Worker",
    role: "Relief Planning",
    icon: HeartHandshake,
    category: "Organizations",
    featured: true,
    avatarId: 42,
    content: [
      "Our NGO was working during the recent floods, and we needed to know exactly where people were struggling the most.",
      "AreaAlert highlighted the areas without electricity, where water supply was interrupted, and which roads were inaccessible.",
      "It allowed us to better plan and target our relief efforts to the most vulnerable."
    ],
  },
  {
    id: 13,
    persona: "Utility Provider",
    role: "Grid Management",
    icon: Zap,
    category: "Organizations",
    avatarId: 37,
    content: [
      "At our electricity distribution company, we noticed an increasing number of verified outage reports in a specific neighborhood on AreaAlert.",
      "Those reports acted as an early signal. It helped our team investigate the localized equipment failure faster and communicate proactively with affected residents."
    ],
  },
];
