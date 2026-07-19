import { keepAliveConfig as config } from '@/config/keep-alive-config.js';

export const dynamic = 'force-dynamic'; // defaults to auto

const fetchOtherEndpoints = async () => {
  if (config?.otherEndpoints && config.otherEndpoints.length > 0) {
    const fetchPromises = config.otherEndpoints.map(async (endpoint) => {
      const endpointResults = await fetch(endpoint, { cache: 'no-store' });
      const passOrFail = endpointResults?.status === 200 ? 'Passed' : 'Failed';
      return `${endpoint} - ${passOrFail}`;
    });

    const fetchResults = await Promise.all(fetchPromises);
    return fetchResults;
  }

  return [];
};

export async function GET() {
  let responseMessage = 'Neon-backed app API is awake.\n\n';
  let successfulResponses = true;

  if (config?.otherEndpoints && config.otherEndpoints.length > 0) {
    const fetchResults = await fetchOtherEndpoints();
    responseMessage += `\n\nOther Endpoint Results:\n${fetchResults.join('\n')}`;
  }

  return new Response(responseMessage, {
    status: successfulResponses ? 200 : 400,
  });
}
