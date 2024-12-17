import * as core from '@actions/core';
import * as rm from 'typed-rest-client/RestClient';

const apiToken = core.getInput('api_token');
const discoveryId = core.getInput('discovery_id');
const projectId = core.getInput('project_id');
const hostname = core.getInput('hostname');

const baseUrl = hostname ? `https://${hostname}` : 'https://app.brightsec.com';
const restc = new rm.RestClient('GitHub Actions', baseUrl);

async function stopDiscovery(uuid: string) {
  try {
    const options = {
      additionalHeaders: { Authorization: `Api-Key ${apiToken}` }
    };
    const payload = {
      action: 'stop'
    };
    const restRes = await restc.update(
      `api/v2/projects/${projectId}/discoveries/${uuid}`,
      payload,
      options
    );
    core.info(`Was succesfully stopped. Code ${restRes.statusCode}.`);
  } catch (err: any) {
    core.setFailed(`Failed (${err.statusCode}) ${err.message}`);
  }
}

stopDiscovery(discoveryId);
