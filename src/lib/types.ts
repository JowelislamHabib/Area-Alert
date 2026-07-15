export type UtilityType = "electricity" | "internet" | "water" | "gas" | "flood";

export type ReportStatus = "pending" | "active" | "resolved";

export type Report = {
  _id: string;
  utilityType: UtilityType;
  area: string;
  district: string;
  status: ReportStatus;
  startedAt: string;
  shortDescription: string;
  description: string;
  image?: string;
  videoUrl?: string;
  ispName?: string;
  reporterId: string;
  reporterName: string;
  reporterImage?: string;
  createdAt: string;
  upvotes: string[];
  downvotes: string[];
  resolvedVotes: string[];
};

export type CreateReportInput = {
  utilityType: UtilityType;
  area: string;
  district: string;
  startedAt: string;
  shortDescription: string;
  description: string;
  image?: string;
  videoUrl?: string;
  ispName?: string;
  reporterId: string;
  reporterName: string;
  reporterImage?: string;
};

export type AdminReportStats = {
  district: string;
  area?: string;
  name: string;
  totalReports: number;
  activeReports: number;
  resolvedReports: number;
  score: number;
  safetyLevel: string;
  activeUtilities: {
    electricity: number;
    water: number;
    gas: number;
    internet: number;
    flood: number;
  };
};
