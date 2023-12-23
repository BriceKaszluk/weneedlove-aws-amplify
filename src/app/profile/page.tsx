"use client";
import { useEffect, useState } from "react";
import { fetchUserAttributes } from "aws-amplify/auth";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import { Amplify } from "aws-amplify";
import config from "@/amplifyconfiguration.json";
import { TextField, Text } from "@aws-amplify/ui-react";

Amplify.configure(config);

interface UserAttributes {
  email?: string;
  email_verified?: boolean;
  nickname?: string;
  // Ajoutez ici d'autres attributs attendus
}


export default function profil() {
  const [userAttributes, setUserAttributes] = useState<UserAttributes>({});

  async function handleFetchUserAttributes() {
    try {
      const userAttributes = await fetchUserAttributes();
      setUserAttributes(userAttributes as UserAttributes);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleFetchUserAttributes();
  }, []);

  console.log(userAttributes);

  return (
    <AuthenticatedLayout>
      <h2>Protected Page Content</h2>
      {Object.keys(userAttributes).length > 0 && (
        <>
          <TextField
            placeholder="Email"
            label="Email"
            errorMessage="There is an error"
            value={userAttributes?.email}
            onChange={(e) => setUserAttributes({...userAttributes, email: e.target.value} )}
          />
          {
            userAttributes.email_verified ?
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
          :
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
          }
          <TextField
            placeholder="Pseudo"
            label="Pseudo"
            errorMessage="There is an error"
            value={userAttributes?.nickname}
            color="white"
            onChange={(e) => setUserAttributes({...userAttributes, nickname: e.target.value} )}
          />
          {/* Contenu de la page protégée */}
        </>
      )}
    </AuthenticatedLayout>
  );
}
