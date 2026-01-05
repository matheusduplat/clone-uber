import CustomButton from "@/components/CustomButton";
import { useStripe } from "@stripe/stripe-react-native";
import { useEffect, useState } from "react";

export function Payment() {
  const [publishableKey, setPublishableKey] = useState("");
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const initializePaymentSheet = async () => {
    const { error } = await initPaymentSheet({
      merchantDisplayName: "Example, Inc.",
      intentConfiguration: {
        mode: {
          amount: 1099,
          currencyCode: "BRL",
        },
      },
    });
    if (!error) {
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);
  const openPaymentSheet = async () => {};
  return (
    <>
      <CustomButton
        title="Confirmar corrida"
        styleContainer="my-10"
        onPress={openPaymentSheet}
      />
    </>
  );
}
