import API from './lib/api';
import Parser from './lib/parser';
import Generator from './lib/generator';

const start = async () => {
  let { modules } = await API.get().description();
  let { activityMetadata }: UserActivityMetadata = await API.get().progress();

  const parser: Parser = new Parser(modules);
  const formattedModules = parser.format();
  const data = parser.find(Object.keys(activityMetadata), formattedModules);

  Generator.create().csv({ data, activityMetadata });  
}

start()