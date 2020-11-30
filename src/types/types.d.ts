type UserActivityMetadata = {
  [key in string]: { 
    lastCompletedOn: string;
  }
}

type APIKeys = "description" | "progress";

type APIEndpoints = {
  [key in APIKeys]: string
}

type APIGetRequests = {
  [key in Keys]: Function;
}

type Media = {
  duration: number
  speaker: string
  mediaUrl: string
  mediaPictureUrl: string
}

type Task = {
  type: string
  title: string
  label?: string
  description?: string
  uuid?: string
  scoringId?: string
  category?: string
  pages: unknown[]
  steps?: unknown[]
  media?: Media
  allowBackButton?: boolean
  titleOverride?: string
}

type Activity = {
  uuid: string
  labVisitBackgroundImage: string
  titleOverride?: string
  type?: string
  tasks: Task[]
}

type Series = {
  title: string
  labVisitIcon: string
  activities: Activity[]
}

type Part = {
  title: string
  series: Series[]
}

type Module = {
  title: string
  icon: string
  contentType: string
  parts: Part[]
}

type APIDescriptionReturn = {
  speakers: any
  title: string
  dailyReminderText: string
  activitySkipTargets: any[]
  modules: Module[],
  awarenessIconUrl: string,
  connectionIconUrl: string,
  insightIconUrl: string,
  purposeIconUrl: string,
}

type APIProgressReturn = {
  activityMetadata: UserActivityMetadata
  cohortName: string
  mostRecentlyCompletedActivityId: string
}

type FormattedData = Map<string, FormattedDataObj>;

type FormattedDataObj = {
  moduleTitle?: string
  activityType: "task" | "activity",
  types: Set<string[]>
  partTitle: string
  seriesTitle: string
  taskTitle: string
}

type GeneratorKeys = "csv";

type GeneratorOptions = {
  [key in Keys]: Function
}

type CSVInput = {
  filename: string
  data: FormattedData
  activityMetadata: UserActivityMetadata
}

type CSVLine = [
  key: string,
  module: string,
  partTitle: string,
  seriesTitle: string,
  types: string[][],
  completed: number,
]

type CSVOutput = CSVLine[]

type FormattedModule = {
  moduleTitle: string,
  activity: FormattedData,
}

type FormatActivities = {
  activity: Activity
  partTitle: string,
  seriesTitle: string,
}
