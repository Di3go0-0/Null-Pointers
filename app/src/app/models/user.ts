export class User {
  constructor(
    public name: string,
    public email: string,
    public role: {
      roleName: string;
    },
    public personalInfo: any | null
  ) { }
}
