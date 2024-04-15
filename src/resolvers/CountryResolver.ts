import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Country } from "../entities/Country";
import { AppDataSource } from "../db/data-source";

@Resolver()
export class CountryResolver {
  private countryRepository = AppDataSource.getRepository(Country);

  @Query(() => [Country])
  async countries(): Promise<Country[]> {
    return this.countryRepository.find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    return this.countryRepository.findOneBy({ code });
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continent") continent: string
  ): Promise<Country[]> {
    return this.countryRepository.find({
      where: { continent },
    });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continent") continent: string
  ): Promise<Country> {
    const country = this.countryRepository.create({
      code,
      name,
      emoji,
      continent,
    });
    return this.countryRepository.save(country);
  }
}
