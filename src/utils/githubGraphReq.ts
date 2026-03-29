import getErrorMessage from "@utils/errorHandler";

export interface GithubContributionsResponse {
  data: {
    user: {
      contributionsCollection: {
        contributionCalendar: {
          totalContributions: number;
          colors: string[];
          months: {
            name: string;
            year: number;
          }[];
          weeks: {
            contributionDays: {
              contributionCount: number;
              color: string;
              date: string;
            }[];
          }[];
        };
      };
    };
  };
}

export default async function getGithubContributions(
  token: string,
  username: string,
  from?: string,
  to?: string,
) {
  const Headers = {
    Authorization: `bearer ${token}`,
  };

  const args: string[] = [];
  if (from) args.push(`from: "${from}"`);
  if (to) args.push(`to: "${to}"`);
  const collectionArgs = args.length > 0 ? `(${args.join(", ")})` : "";

  const Body = {
    query: `
        query GetUserContributions {
                user(login: "${username}") {
                    contributionsCollection${collectionArgs} {
                    contributionCalendar {
                        totalContributions
                        colors
                        months {
                        name
                        year
                        }
                        weeks {
                        contributionDays {
                            contributionCount
                            color
                            date
                        }
                        }
                    }
                    }
                }
            }
        `,
  };

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(Body),
      headers: Headers,
    });

    const data = (await response.json()) as GithubContributionsResponse;
    return data;
  } catch (error: unknown) {
    console.log(getErrorMessage(error));
  }
}
