"use client";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { TextField, Text, Button, Alert } from "@aws-amplify/ui-react";
import { handleUpdateUserAttribute } from "./userManager";
import { AccountSettings } from "@aws-amplify/ui-react";

Amplify.configure(config);

interface UserAttributes {
  email: string;
  email_verified: boolean;
  nickname: string;
}

const initialState: UserAttributes = {
  email: "",
  email_verified: false,
  nickname: "",
};

export default function Profil() {
  const [initialUserAttributes, setInitialUserAttributes] =
    useState<UserAttributes>(initialState);
  const [userAttributes, setUserAttributes] =
    useState<UserAttributes>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmPseudoUpdate, setconfirmPseudoUpdate] = useState(false);
  const [confirmPasswordUpdate, setconfirmPasswordUpdate] = useState("");
  const [showModifyPassword, setShowModifyPassword] = useState(false);

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
      if (res.success) {
        setconfirmPseudoUpdate(true);
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
      {confirmPseudoUpdate && (
        <Alert
          variation="success"
          isDismissible={true}
          hasIcon={true}
          heading="Confirmation"
          onDismiss={() => {setconfirmPseudoUpdate(false)}}
        >
          Votre pseudo a bien été modifié
        </Alert>
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
        colorTheme="overlay"
        type="submit"
        loadingText="Chargement"
        onClick={() => setShowModifyPassword(!showModifyPassword)}
      >
        Modifier mon mot de passe
      </Button>
      {
        showModifyPassword && 
        <AccountSettings.ChangePassword onSuccess={() => {setconfirmPasswordUpdate("success"); setShowModifyPassword(false)}} onError={() => {setconfirmPasswordUpdate("error"); setShowModifyPassword(false)}} />
      }
            {confirmPasswordUpdate && (
        <Alert
          variation={confirmPasswordUpdate === "success" ? "success" : "error"}
          isDismissible={true}
          hasIcon={true}
          heading={confirmPasswordUpdate === "success" ? "Confirmation" : "Erreur"}
          onDismiss={() => {setconfirmPasswordUpdate(""); setShowModifyPassword(false)}}
        >
          Votre mot de passe a bien été modifié
        </Alert>
      )}
      <AccountSettings.DeleteUser />
    </AuthenticatedLayout>
  );
}
