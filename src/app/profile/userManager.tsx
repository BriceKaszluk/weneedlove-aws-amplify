import { updateUserAttribute } from "aws-amplify/auth";
import { deleteUser } from "aws-amplify/auth";

interface UpdateUserAttributeResult {
  success: boolean;
  message: string;
}

export async function handleUpdateUserAttribute(
  attributeKey: string,
  value: string
): Promise<UpdateUserAttributeResult> {
  try {
    await updateUserAttribute({
      userAttribute: {
        attributeKey,
        value,
      },
    });
    return { success: true, message: "Votre pseudo a bien été modifié." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Votre pseudo n'a pas pu être modifié." };
  }
}

export async function handleDeleteUser() {
  try {
    await deleteUser();
  } catch (error) {
    console.log(error);
  }
}
