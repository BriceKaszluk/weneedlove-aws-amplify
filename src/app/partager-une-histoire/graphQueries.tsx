'use server';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import * as mutations from '@/graphql/mutations';
import { cookies } from 'next/headers';
import config from '@/amplifyconfiguration.json';

const client = generateServerClientUsingCookies({
  config,
  cookies
});

interface StoryFormData {
  title: string;
  content: string;
}

export const addStory = async (formData: FormData) => {

  const storyDetails: StoryFormData  = {
    title: formData.get('title')?.toString() || "",
    content: formData.get('content')?.toString() || ""
  };

  try {
    const response = await client.graphql({
      query: mutations.createStory,
      variables: { input: storyDetails }
    });

    if (response.data && (!response.errors || response.errors.length === 0)) {
      console.log("Success:", response.data);
      return "success";
    } else if (response.errors) {
      console.error("Error:", response.errors);
      return `error: ${response.errors.map(error => error.message).join(', ')}`;
    } else {
      return "error: Erreur inconnue";
    }
  } catch (error) {
    console.error("Error lors de l'exécution de la requête:", error);
    if (error instanceof Error) {
      return `error: ${error.message}`;
    }
    return "error: Erreur de requête inconnue";
  }
};

