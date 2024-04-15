import { DataSource } from "typeorm";
import path from "path";
import { Country } from "../entities/Country";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: path.join(__dirname, "..", "data.db"),
  synchronize: true,
  logging: false,
  entities: [Country],
  migrations: [path.join(__dirname, "migrations", "*.ts")],
});
