import fs from 'fs';

export class JsonHelper {
  static readJson(filePath: string): Record<string, string>[] {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }
}

//CSV vs Excel vs Json--
//Json
//CSV
//Excel
//Assignemnt-registration page with data driven from csv, excel and json