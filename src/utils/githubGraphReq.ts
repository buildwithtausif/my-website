import getErrorMessage from "@utils/errorHandler";


export default async function getGithubContributions(token: string, username: string)  {
  const Headers = {
    Authorization: `bearer ${token}`,
  };
  const Body = {
    query: `
        query GetUserContributions {
                user(login: "${username}") {
                    contributionsCollection {
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
    const response: Object = await fetch("https://api.github.com/graphql", {
      method: "POST",
      body: JSON.stringify(Body),
      headers: Headers,
    }).then((res) => res.json());
  } catch (error: unknown) {
    console.log(getErrorMessage(error));
  }
}
