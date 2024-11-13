export interface iGame {
  time: string;
  awayTeam: {
    teamName: string;
    teamRecord: string;
    teamScore: string;
  };
  homeTeam: {
    teamName: string;
    teamRecord: string;
    teamScore: string;
  };
  topPerformers: {
    playerLink: string;
    playerName: string;
    playerDetails: string;
    playerStats: {
      statName: string;
      statValue: string;
    }[];
  }[];
  gameLinks: {
    linkName: string;
    link: string;
  }[];
}

export interface iGamesAPI {
  data: Daum[];
  meta: Meta;
}

export interface Daum {
  id: number;
  date: string;
  season: number;
  status: string;
  period: number;
  time: string;
  postseason: boolean;
  home_team_score: number;
  visitor_team_score: number;
  home_team: HomeTeam;
  visitor_team: VisitorTeam;
}

export interface HomeTeam {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

export interface VisitorTeam {
  id: number;
  conference: string;
  division: string;
  city: string;
  name: string;
  full_name: string;
  abbreviation: string;
}

export interface Meta {
  next_cursor: number;
  per_page: number;
}
