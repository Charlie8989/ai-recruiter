import { createClient } from '@/utils/supabase/server.js';
import { keepAliveConfig as config } from '@/config/keep-alive-config.js';
import { determineAction, generateRandomString } from './helper.js';

export const dynamic = 'force-dynamic'; // defaults to auto

const querySupabase = async (supabase, randomStringLength = 12) => {
  const currentRandomString = generateRandomString(randomStringLength);

  const { data, error } = await supabase
    .from(config.table)
    .select('*')
    .eq(config.column, currentRandomString);

  const messageInfo = `Results for retrieving\n'${currentRandomString}' from '${config.table}' at column '${config.column}'`;

  if (error) {
    const errorInfo = `${messageInfo}: ${error.message}`;
    if (config.consoleLogOnError) console.log(errorInfo);
    return {
      successful: false,
      message: errorInfo,
    };
  }

  return {
    successful: true,
    message: `${messageInfo}: ${JSON.stringify(data)}`,
  };
};

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
  const supabase = createClient();

  let responseMessage = '';
  let successfulResponses = true;

  if (!config?.disableRandomStringQuery) {
    const querySupabaseResponse = await querySupabase(supabase);
    successfulResponses = successfulResponses && querySupabaseResponse.successful;
    responseMessage += querySupabaseResponse.message + '\n\n';
  }

  if (config?.allowInsertionAndDeletion) {
    const insertOrDeleteResults = await determineAction(supabase);
    successfulResponses = successfulResponses && insertOrDeleteResults.successful;
    responseMessage += insertOrDeleteResults.message + '\n\n';
  }

  if (config?.otherEndpoints && config.otherEndpoints.length > 0) {
    const fetchResults = await fetchOtherEndpoints();
    responseMessage += `\n\nOther Endpoint Results:\n${fetchResults.join('\n')}`;
  }

  return new Response(responseMessage, {
    status: successfulResponses ? 200 : 400,
  });
}
