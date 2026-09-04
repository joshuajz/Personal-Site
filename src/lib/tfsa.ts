export type TfsaLimit = {
  year: number;
  amount: number;
};

export type TfsaRoomStatus = "available" | "fully-used" | "not-eligible" | "over-contributed";

export type TfsaRoomResult = {
  annualLimits: TfsaLimit[];
  availableRoom: number;
  contributed: number;
  eligibilityYear: number;
  excessContribution: number;
  latestYear: number;
  lifetimeRoom: number;
  status: TfsaRoomStatus;
};

const TFSA_START_YEAR = 2009;

export function formatTfsaContributionInput(value: string): string {
  const sanitized = value.replace(/[^\d.]/g, "");

  if (sanitized === "") {
    return "";
  }

  const hasDecimal = sanitized.includes(".");
  const [rawWhole = "", ...decimalParts] = sanitized.split(".");
  const whole = rawWhole.replace(/^0+(?=\d)/, "") || "0";
  const formattedWhole = Number(whole).toLocaleString("en-CA", {
    maximumFractionDigits: 0,
    useGrouping: true,
  });
  const decimal = decimalParts.join("").slice(0, 2);

  return hasDecimal ? `${formattedWhole}.${decimal}` : formattedWhole;
}

export function parseTfsaContributionInput(value: string): number {
  const normalized = value.replaceAll(",", "").trim();
  return normalized === "" ? 0 : Number(normalized);
}

export function parseTfsaLimits(markdown: string): TfsaLimit[] {
  const rowPattern = /^\|\s*(\d{4})\s*\|\s*\$?\s*([\d,]+(?:\.\d{1,2})?)\s*\|\s*$/gm;
  const limits = [...markdown.matchAll(rowPattern)].map((match) => ({
    year: Number(match[1]),
    amount: Number(match[2].replaceAll(",", "")),
  }));

  if (limits.length === 0) {
    throw new Error("No TFSA contribution limits were found in the Markdown table.");
  }

  limits.sort((a, b) => a.year - b.year);

  if (limits[0].year !== TFSA_START_YEAR) {
    throw new Error(`TFSA contribution limits must begin in ${TFSA_START_YEAR}.`);
  }

  limits.forEach((limit, index) => {
    if (!Number.isFinite(limit.amount) || limit.amount <= 0) {
      throw new Error(`The TFSA contribution limit for ${limit.year} must be greater than zero.`);
    }

    if (index > 0 && limit.year !== limits[index - 1].year + 1) {
      throw new Error(`TFSA contribution limits must include every year through ${limit.year}.`);
    }
  });

  return limits;
}

export function calculateTfsaRoom(
  birthYear: number,
  contributed: number,
  limits: TfsaLimit[],
): TfsaRoomResult {
  if (!Number.isInteger(birthYear) || birthYear < 1900) {
    throw new RangeError("Enter a valid four-digit birth year.");
  }

  if (!Number.isFinite(contributed) || contributed < 0) {
    throw new RangeError("Contributions must be zero or greater.");
  }

  if (limits.length === 0) {
    throw new RangeError("At least one annual TFSA contribution limit is required.");
  }

  const orderedLimits = [...limits].sort((a, b) => a.year - b.year);
  const latestYear = orderedLimits.at(-1)!.year;

  if (birthYear > latestYear) {
    throw new RangeError(`Birth year cannot be later than ${latestYear}.`);
  }

  const eligibilityYear = Math.max(TFSA_START_YEAR, birthYear + 18);
  const annualLimits = orderedLimits.filter(
    (limit) => limit.year >= eligibilityYear && limit.year <= latestYear,
  );
  const lifetimeRoom = annualLimits.reduce((total, limit) => total + limit.amount, 0);
  const contributedInCents = Math.round(contributed * 100);
  const normalizedContribution = contributedInCents / 100;
  const roomAfterContributions = (lifetimeRoom * 100 - contributedInCents) / 100;
  const availableRoom = Math.max(0, roomAfterContributions);
  const excessContribution = Math.max(0, -roomAfterContributions);

  let status: TfsaRoomStatus = "available";
  if (excessContribution > 0) {
    status = "over-contributed";
  } else if (eligibilityYear > latestYear) {
    status = "not-eligible";
  } else if (availableRoom === 0) {
    status = "fully-used";
  }

  return {
    annualLimits,
    availableRoom,
    contributed: normalizedContribution,
    eligibilityYear,
    excessContribution,
    latestYear,
    lifetimeRoom,
    status,
  };
}
