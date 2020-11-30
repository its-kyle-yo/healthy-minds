class Parser {
  data: any
  activityIDs: FormattedData

  constructor(data: any) {
    this.data = data;
    this.activityIDs = new Map();
  }

  format(): FormattedDataObj[]  {
    const formattedData = this.data.map(this.formatModules);
    return formattedData;
  }

  private formatModules = (module: any, moduleIndex: number): FormattedModule => {
    this.activityIDs = new Map();
    const moduleTitle = this.formatTitle(module.title, moduleIndex);
    module.parts.forEach(this.formatParts)
    
    return {
      moduleTitle,
      activity: this.activityIDs
    }
  }

  private formatParts = (part: any, partIndex: number): void => { 
    const partTitle = this.formatTitle(part.title, partIndex);
    part.series.forEach((series: any, seriesIndex: number) => this.formatSeries({series, seriesIndex, partIndex, partTitle}));
  }
  
  private formatSeries = ({series, seriesIndex, partTitle}: any): void => {
    const seriesTitle = this.formatTitle(series.title, seriesIndex);
    series.activities.forEach((activity: any, index: number) => this.formatActivities({ activity, partTitle, seriesTitle}))
  }

  private formatActivities = ({ activity, partTitle, seriesTitle}: FormatActivities): void => {
    const { uuid, tasks } = activity;
    let activityKey = uuid;
    tasks?.forEach((task: Task) => {
      activityKey = task?.uuid ?? activityKey;

      let currentTask: FormattedDataObj = {
        types: new Set(),
        activityType: !!task.uuid ? 'task' : 'activity',
        taskTitle: task.title || task.titleOverride || '',
        partTitle,
        seriesTitle,
      };

      if (this.activityIDs.has(activityKey)) {
        currentTask = this.activityIDs.get(activityKey)!;
      }

      if (!!task.type) {
        currentTask.types?.add([task.type]);
      }

      if(!!activity.type) {
        currentTask.types?.add([activity.type]);
      }

      this.activityIDs.set(activityKey, currentTask);
    });

  }
  
  private formatTitle(title: string, index: number): string {
    return title.includes(' - ') ? title : `${index + 1} - ${title}`;
  }

  find(searchStrings: string[], modules: any): FormattedData {
    const foundRecords = new Map();

    searchStrings.forEach((key: string) => {
      modules.forEach((module: FormattedModule) => {
        if (module.activity.has(key)) {
          foundRecords.set(key, {module: module.moduleTitle, ...(module.activity.get(key))});
        } 
      })
    });

    return foundRecords;
  }
}

export default Parser;