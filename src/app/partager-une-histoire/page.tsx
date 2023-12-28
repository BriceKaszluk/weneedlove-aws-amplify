"use client";
import { useState, useRef } from "react";
import { TextField, TextAreaField, Button, Alert } from "@aws-amplify/ui-react";
import { addStory } from "./graphQueries";

import AuthenticatedLayout from "../layouts/AuthenticatedLayout";

export default function ShareStory() {
  const [shareSuccess, setShareSuccess] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

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
  } else {
    message = (
      <Alert
        variation="error"
        isDismissible={true}
        hasIcon={true}
        heading="Erreur"
        onDismiss={() => {
          setShareSuccess("");
        }}
      >
        {shareSuccess?.substring(6)}
      </Alert>
    );
  }

  const shareStory = async (formData: FormData) => {
    console.log("formData", formData)
    setIsLoading(true);
    const result = await addStory(formData);
    setShareSuccess(result);
    setIsLoading(false);
    formRef.current?.reset();
  };

  return (
    <AuthenticatedLayout>
      <h1>Partager une histoire</h1>
      <form action={shareStory} ref={formRef}>
        <TextField
          descriptiveText="Un titre court pour ton histoire"
          placeholder="Baggins"
          label="title"
          name="title"
          errorMessage="There is an error"
          isDisabled={isLoading ? true : false}
        />
        <TextAreaField
          descriptiveText="Rédiges ton histoire ici"
          label="Ton histoire"
          name="content"
          placeholder="Ton histoire"
          isDisabled={isLoading ? true : false}
          rows={8}
        />
        {shareSuccess && message}
        <Button
          variation="primary"
          colorTheme="success"
          isDisabled={isLoading ? true : false}
          loadingText=""
          type="submit"
        >
          Partager
        </Button>
      </form>
    </AuthenticatedLayout>
  );
}
