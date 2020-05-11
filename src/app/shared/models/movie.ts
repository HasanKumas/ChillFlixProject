import { Category } from './category';

export class Movie {
  public title: string;
  public category: Category;
  public description: string;
  public year: number;
  public rating?: number;
  public url: string;
  public id?: number;
  public raterTotal?: number;
}
