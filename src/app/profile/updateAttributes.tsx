import {
  updateUserAttribute,
  type UpdateUserAttributeOutput
} from 'aws-amplify/auth';

async function handleUpdateUserAttribute(attributeKey: string, value: string) {
  try {
    const output = await updateUserAttribute({
      userAttribute: {
        attributeKey,
        value
      }
    });
    handleUpdateUserAttributeNextSteps(output);
  } catch (error) {
    console.log(error);
  }
}

function handleUpdateUserAttributeNextSteps(output: UpdateUserAttributeOutput) {
  const { nextStep } = output;

  switch (nextStep.updateAttributeStep) {
    case 'CONFIRM_ATTRIBUTE_WITH_CODE':
      const codeDeliveryDetails = nextStep.codeDeliveryDetails;
      console.log(
        `Confirmation code was sent to ${codeDeliveryDetails?.deliveryMedium}.`
      );
      // Collect the confirmation code from the user and pass to confirmUserAttribute.
      break;
    case 'DONE':
      console.log(`attribute was successfully updated.`);
      break;
  }
}