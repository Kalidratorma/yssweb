export class TeamYear {
  id: number;
  year: number;
  teamName: string;
  note: string;

  constructor(id: number, year: number, teamName: string, note: string) {
    this.id = id;
    this.year = year;
    this.teamName = teamName;
    this.note = note;
  }
}
