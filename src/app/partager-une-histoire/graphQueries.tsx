import { generateClient } from 'aws-amplify/api';
import * as mutations from '@/graphql/mutations';

const client = generateClient();

export const addStory = async (title: string, content: string) => {
  const storyDetails = {
    title,
    content
  };
  
  const newStory = await client.graphql({
    query: mutations.createStory,
    variables: { input: storyDetails }
  });

  console.log(newStory)
}
