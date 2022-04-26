export class Films{
  constructor(
    public name: string,
    public image: string,
    public year: number,
    public cash: string,
    public creatingDate: string,
    public actors: string[],
    public favorite: boolean){}
}