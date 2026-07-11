export type UtilityType = "electricity" | "internet" | "water" | "gas";

export type ReportStatus = "pending";

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
  ispName?: string;
  reporterId: string;
  reporterName: string;
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
  ispName?: string;
  reporterId: string;
  reporterName: string;
};
