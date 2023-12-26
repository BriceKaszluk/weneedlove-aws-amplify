"use client";
import { useState } from 'react';
import { TextField, TextAreaField, Text, Button } from "@aws-amplify/ui-react";
import { addStory } from "./graphQueries";

import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

export default function ShareStory() {

  const [storyTitle, setStoryTitle] = useState("");
  const [storyContent, setStoryContent] = useState("");

  return (
    <AuthenticatedLayout>
      <h1>Partager une histoire</h1>
      <TextField
        descriptiveText="Un titre court pour ton histoire"
        placeholder="Baggins"
        label="Last name"
        errorMessage="There is an error"
        onChange={(e) => {setStoryTitle(e.target.value)}}
      />
      <TextAreaField
        descriptiveText="Rédiges ton histoire ici"
        label=""
        name="last_name"
        placeholder="Baggins"
        rows={3}
        onChange={(e) => {setStoryContent(e.target.value)}}
      />
      <Button
        variation="primary"
        colorTheme="success"
        loadingText=""
        onClick={() => addStory(storyTitle, storyContent)}
      >
        Partager
      </Button>
    </AuthenticatedLayout>
  );
}
