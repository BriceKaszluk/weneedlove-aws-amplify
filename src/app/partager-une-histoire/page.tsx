"use client";
import { useState } from "react";
import {
  TextField,
  TextAreaField,
  Text,
  Button,
  Alert,
} from "@aws-amplify/ui-react";
import { addStory } from "./graphQueries";

import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

export default function ShareStory() {
  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");
  const [shareSuccess, setShareSuccess] = useState<boolean | string>();
  const [isLoading, setIsLoading] = useState(false);

  let message;
  if (shareSuccess === "success") {
    message = (
      <Alert
        variation="success"
        isDismissible={true}
        hasIcon={true}
        heading="Félicitations!"
        onDismiss={() => {
          setShareSuccess("");
        }}
      >
        Ton histoire a bien été partagée
      </Alert>
    );
  } else if (
    typeof shareSuccess === "string" &&
    shareSuccess.startsWith("error:")
  ) {
    message = (
      <Alert
        variation="success"
        isDismissible={true}
        hasIcon={true}
        heading="Erreur"
        onDismiss={() => {
          setShareSuccess("");
        }}
      >
        {shareSuccess.substring(6)}
      </Alert>
    );
  }

  const shareStory = async () => {
    setIsLoading(true);
    const result = await addStory(storyTitle, storyContent);
    setShareSuccess(result);
    setStoryTitle("");
    setStoryContent("");
    setIsLoading(false)
  };

  return (
    <AuthenticatedLayout>
      <h1>Partager une histoire</h1>
      <TextField
        descriptiveText="Un titre court pour ton histoire"
        placeholder="Baggins"
        label="Last name"
        errorMessage="There is an error"
        isDisabled = {isLoading ? true : false}
        onChange={(e) => {
          setStoryTitle(e.target.value);
        }}
      />
      <TextAreaField
        descriptiveText="Rédiges ton histoire ici"
        label=""
        name="last_name"
        placeholder="Baggins"
        isDisabled = {isLoading ? true : false}
        rows={3}
        onChange={(e) => {
          setStoryContent(e.target.value);
        }}
      />
      {message}
      <Button
        variation="primary"
        colorTheme="success"
        isDisabled = {isLoading ? true : false}
        loadingText=""
        onClick={() => shareStory()}
      >
        Partager
      </Button>
      
    </AuthenticatedLayout>
  );
}
