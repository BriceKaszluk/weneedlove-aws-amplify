"use client";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { TextField, Text, Button, Alert } from "@aws-amplify/ui-react";
import { handleUpdateUserAttribute, handleDeleteUser } from "./userManager";

Amplify.configure(config);

interface UserAttributes {
  email: string;
  email_verified: boolean;
  nickname: string;
  // Ajoutez ici d'autres attributs attendus
}

const initialState: UserAttributes = {
  email: "",
  email_verified: false,
  nickname: "",
  // Initialiser les autres attributs si nécessaire
};

export default function Profil() {
  const [initialUserAttributes, setInitialUserAttributes] =
    useState<UserAttributes>(initialState);
  const [userAttributes, setUserAttributes] =
    useState<UserAttributes>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmUpdate, setConfirmUpdate] = useState(false);
  const [tryDeleteAccount, setTryDeleteAccount] = useState(false);

  async function handleFetchUserAttributes() {
    setIsLoading(true);
    setError("");

    try {
      const fetchedAttributes = await fetchUserAttributes();

      const transformedAttributes: UserAttributes = {
        email: fetchedAttributes.email || "",
        email_verified:
          fetchedAttributes.email_verified === ("true" || "false"),
        nickname: fetchedAttributes.nickname || "",
        // Transformez les autres attributs si nécessaire
      };

      setUserAttributes(transformedAttributes);
      setInitialUserAttributes(transformedAttributes);
    } catch (error) {
      console.error(error);
      setError(
        "Une erreur est survenue lors de la récupération des attributs."
      );
    } finally {
      setIsLoading(false);
    }
  }

  const updateNickname = async () => {
    setIsLoading(true);
    setError(""); // Réinitialiser les messages d'erreur précédents

    try {
      const res = await handleUpdateUserAttribute(
        "nickname",
        userAttributes.nickname
      );
      console.log("res", res);
      if (res.success) {
        setConfirmUpdate(true);
        handleFetchUserAttributes();
      } else {
        setError("Une erreur est survenue lors de la mise à jour du surnom.");
      }
    } catch (error) {
      console.error(error);
      setError("Une erreur est survenue lors de la mise à jour du surnom.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchUserAttributes();
  }, []);

  return (
    <AuthenticatedLayout>
      <h2>Protected Page Content</h2>
      {Object.keys(userAttributes).length > 0 && (
        <>
          <TextField
            isDisabled={true}
            placeholder="Email"
            label="Email"
            errorMessage="There is an error"
            value={userAttributes?.email}
            onChange={(e) =>
              setUserAttributes({ ...userAttributes, email: e.target.value })
            }
          />
          {userAttributes.email_verified ? (
            <Text
              as="p"
              lineHeight="1.5em"
              fontWeight={400}
              fontSize="1em"
              fontStyle="normal"
              textDecoration="none"
              width="30vw"
            >
              Vérifiée
            </Text>
          ) : (
            <Text
              as="p"
              lineHeight="1.5em"
              fontWeight={400}
              fontSize="1em"
              fontStyle="normal"
              textDecoration="none"
              width="30vw"
            >
              Non vérifiée (consultez votre boîte mail)
            </Text>
          )}
          <TextField
            isDisabled={isLoading ? true : false}
            placeholder="Pseudo"
            label="Pseudo"
            errorMessage="There is an error"
            value={userAttributes?.nickname}
            color="white"
            onChange={(e) =>
              setUserAttributes({ ...userAttributes, nickname: e.target.value })
            }
          />
          {/* Contenu de la page protégée */}
        </>
      )}
      <Button
        colorTheme={
          initialUserAttributes !== userAttributes ? "success" : "overlay"
        }
        variation="primary"
        type="submit"
        loadingText="Chargement"
        isDisabled={initialUserAttributes !== userAttributes ? false : true}
        onClick={() => updateNickname()}
      >
        Enregistrer
      </Button>
      {confirmUpdate && (
        <Text
          as="p"
          lineHeight="1.5em"
          fontWeight={400}
          fontSize="1em"
          fontStyle="normal"
          textDecoration="none"
          width="30vw"
        >
          Votre pseudo a bien été modifié
        </Text>
      )}
      {error && (
        <Text
          as="p"
          lineHeight="1.5em"
          fontWeight={400}
          fontSize="1em"
          fontStyle="normal"
          textDecoration="none"
          width="30vw"
        >
          {error}
        </Text>
      )}
      <Button
        variation="primary"
        colorTheme="error"
        loadingText=""
        onClick={() => setTryDeleteAccount(true)}
      >
        Supprimer mon compte
      </Button>
      {tryDeleteAccount && (
        <Alert
          variation="warning"
          isDismissible={false}
          hasIcon={true}
          heading="C'est irreversible!"
        >
          Confirmer supprimera votre compte et toutes les données associées
          <Button
            variation="primary"
            colorTheme="error"
            loadingText=""
            onClick={() => {
              setTryDeleteAccount(false);
              handleDeleteUser();
            }}
          >
            Confirmer la suppression
          </Button>
        </Alert>
      )}
    </AuthenticatedLayout>
  );
}
