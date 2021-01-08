import RC from '../utils/rc';
import axios from 'axios';
import logger from '../utils/logger';

const rc = RC.getInstance()

function isGithubRegistry(registry:string):boolean {
  // https://www.npmjs.com/package/download-git-repo
  return !registry.includes(':');
}

/**
 * 获取github组织下的repo列表
 * @param orgName 
 * https://docs.github.com/en/free-pro-team@latest/rest/reference/repos
 */
async function getGithubRepos(orgName:string) {
  const api = `https://api.github.com/orgs/${orgName}/repos`;
  const {data: repos} = await axios.get(api, {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  });
  return repos.map(item => ({
    name: item.name,
    full_name: item.full_name,
  }))
}
export default async function list() {
  const registry = rc.getRegistry();
  if (isGithubRegistry(registry)) {
    try {
      const repos = await getGithubRepos(registry);
      console.log('Available templates:');
      console.log(repos.map(item => item.name).join('\n'));
    } catch (e) {
      logger.fatal('fail to fetch repo list', e)
    }

  } else {
    console.log('only github registry support list command');
    process.exit();
  }
}