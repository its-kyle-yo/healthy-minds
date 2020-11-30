
import { createArrayCsvWriter } from 'csv-writer';
import { filepath } from '../../constants';

class Generator {
  private _csvWriter;

  constructor(public csvWriter: any) {
    this._csvWriter = csvWriter;
  }
  
  create(): GeneratorOptions {
    return {
      csv: this.csv,
    }
  }

  csv = ({ filename, data, activityMetadata}: any): void => {
    if (!!filename) {
      this._csvWriter = this.csvWriter;
      this.csvWriter = createArrayCsvWriter({
        path: filename
      });
    }

    const lines = this.createCSVLine(data, activityMetadata);

    this.csvWriter.writeRecords(lines);
    this.csvWriter = this._csvWriter;
  }
  
  private createCSVLine(data: FormattedData, activityMetadata: UserActivityMetadata): CSVOutput {
    return Array.from(data.keys()).map((key: string): CSVLine => {
      const { partTitle, moduleTitle, seriesTitle, types }: FormattedDataObj = data.get(key)!;
      return [key, moduleTitle!, partTitle, seriesTitle, Array.from(types), +!!activityMetadata[key].lastCompletedOn];
    }) 
  }
}

export default new Generator(createArrayCsvWriter({
  path: filepath,
  header: ['Activity UUID', 'Module', 'Part', 'Series', 'Tasks', 'Completion'],
}));